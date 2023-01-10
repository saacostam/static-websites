class Roomba{
    constructor(x, y, radious, enviroment){
        this.x = x;
        this.y = y;
        this.r = radious;
        this.env = enviroment;

        this.velocity = 10;

        this.strategy = 'Random';
        this.strategyMapping = {
            'HeatMap' : this.getDeltaVectorWithHeatMap.bind(this),
            'Random' : this.getDeltaVectorRandomly.bind(this),
            'BFS' : this.getDeltaVectorWithBFS.bind(this),
        }

        this.setup();
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    setup(){
        this.heatMap = this.createHeatMap();
        this.BFS_objective = null;
    }

    setStrategy(newStrategyValue){
        this.strategy = newStrategyValue;
    }

    createHeatMap(){
        let grid = [];

        for (let y = 0; y < HEIGHT; y += SQUARE_HEIGHT){
            let row = [];
            for (let x = 0; x < WIDTH; x += SQUARE_WIDTH){
                row.push(0);
            }

            grid.push( row );
        }

        return grid;
    }

    updateHeatMap(){
        let i, j;    

        i = Math.floor( this.x / SQUARE_WIDTH );
        j = Math.floor( this.y / SQUARE_HEIGHT);
        if ( this.isValid({ x:i, y:j }) ) this.heatMap[j][i] += 1;

        // Peripherical
        i = Math.floor(( this.x + this.r)/ SQUARE_WIDTH );
        j = Math.floor(( this.y + this.r)/ SQUARE_HEIGHT );
        if ( this.isValid({ x:i, y:j }) ) this.heatMap[j][i] += 1;

        i = Math.floor(( this.x + this.r)/ SQUARE_WIDTH );
        j = Math.floor(( this.y - this.r)/ SQUARE_HEIGHT );
        if ( this.isValid({ x:i, y:j }) ) this.heatMap[j][i] += 1;

        i = Math.floor(( this.x - this.r)/ SQUARE_WIDTH );
        j = Math.floor(( this.y - this.r)/ SQUARE_HEIGHT );
        if ( this.isValid({ x:i, y:j }) ) this.heatMap[j][i] += 1;

        i = Math.floor(( this.x - this.r)/ SQUARE_WIDTH );
        j = Math.floor(( this.y + this.r)/ SQUARE_HEIGHT );
        if ( this.isValid({ x:i, y:j }) ) this.heatMap[j][i] += 1;
    }

    calculateHeatMapObjective(){
        let min = { value:100000, pos:[]}
        for (let j = 0; j < this.heatMap.length; j++){
            for (let i = 0; i < this.heatMap[j].length; i++){
                if (this.heatMap[j][i] < min.value){
                    min.value = this.heatMap[j][i];
                    min.pos = [{i, j}];
                }else if (this.heatMap[j][i] == min.value){
                    min.pos.push( {i, j} );
                }
            }
        }

        let target = { pos:null, val:1000000 };
        min.pos.forEach(
            squarePos => {
                const squareX = squarePos.i*SQUARE_WIDTH;
                const squareY = squarePos.j*SQUARE_HEIGHT;
                const distance = distanceBetweenPoints( squareX, this.x, squareY, this.y );

                if (distance < target.val){
                    target.val = distance;
                    target.pos = { i:squarePos.i, j:squarePos.j };
                }
            }
        )

        return target;
    }

    update(){
        this.testBorders();
        this.updateHeatMap();
        this.updatePosition();
    }

    getDeltaVectorWithHeatMap(){
        const target = this.calculateHeatMapObjective().pos;
        const targetX = target.i*SQUARE_WIDTH;
        const targetY = target.j*SQUARE_HEIGHT;
        
        let deltaVector = {
            x : targetX - this.x,
            y : targetY - this.y,
        }
    
        return deltaVector;
    }

    getDeltaVectorRandomly(){
        let deltaVector = {
            x : (Math.random()*2)-1,
            y : (Math.random()*2)-1,
        }

        return deltaVector;
    }

    getDeltaVectorWithBFS(){
        if (this.BFS_objective === null || !this.BFS_objective.isVisible){
            this.BFS_objective = this.BFS();
        }

        const target = this.BFS_objective;

        if (target === null){
            // If no objective was found
            // then dont move (delta = 0)
            return {x : 0, y:0}
        }

        const targetX = target.x;
        const targetY = target.y;

        let deltaVector = {
            x : targetX - this.x,
            y : targetY - this.y,
        }

        return deltaVector;
    }

    BFS(){
        let i, j;    

        i = Math.floor( this.x / SQUARE_WIDTH );
        j = Math.floor( this.y / SQUARE_HEIGHT);

        // DFS : Stack
        let target = null;
        let frontier = [{x:i, y:j}];
        let visitedDFS = new Set(); 

        while (frontier.length > 0){
            if (target !== null) break;

            const current = frontier.splice(0, 1)[0]; // pop first element

            const neighbors = this.getNeighborCoordinates( current );
            
            for (let i = 0; i < neighbors.length; i++){
                const neighbor = neighbors[i];
                const neighborHasNotBeenVisited = !visitedDFS.has( `${neighbor.x}-${neighbor.y}` );

                visitedDFS.add( `${neighbor.x}-${neighbor.y}` );
                
                if ( this.isValid( neighbor ) && neighborHasNotBeenVisited){
                    const {x, y} = neighbor;
                    const currentCell = SCENE[y][x];

                    if (currentCell.isVisible){
                        target = currentCell;
                        break;
                    }

                    frontier.push( neighbor );
                }
            }
        }

        return target;
    }

    getNeighborCoordinates(pos){
        const {x, y} = pos;
        return [
            {x:x+1, y:y+1}, 
            {x:x-1, y:y+1},
            {x:x-1, y:y-1},
            {x:x+1, y:y-1},
        ]
    }

    isValid(pos){
        const {x, y} = pos;
        return (0 <= x && x < SCENE[0].length) && (0 <= y && y < SCENE.length)
    }
    
    updatePosition(){
        let deltaVector = this.strategyMapping[ this.strategy ]();

        if (deltaVector.x != 0 && deltaVector.y != 0){
            deltaVector = normalizeVector( deltaVector );
        }else{
            deltaVector = {x:1, y:0};
        }

        this.x += deltaVector.x*this.velocity;
        this.y += deltaVector.y*this.velocity;
    }

    testBorders(){
        if (this.x-this.r < 0){
            this.x = this.r;
        }else if (this.x+this.r > this.env.width){
            this.x = this.env.width - this.r;
        }

        if (this.y-this.r < 0){
            this.y = this.r;
        }else if (this.y+this.r > this.env.height){
            this.y = this.env.height - this.r;
        }
    }

    draw(){
        fill( 'lightGray' );
        circle(this.x, this.y, this.r*2);
    }
}