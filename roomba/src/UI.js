class DataBinding{
    constructor(value, bindedElementsQuerySelectors){
        this.value = value;
        this.bindedElementsQuerySelectors = bindedElementsQuerySelectors || [];
        this.updateView();
    }

    addNewQuerySelector(newQuerySelector){
        this.bindedElementsQuerySelectors.push( newQuerySelector );
        this.updateView();
    }

    setState(newValue){
        this.value = newValue;
        this.updateView();
    }

    updateView(){
        this.bindedElementsQuerySelectors.forEach(
            querySelector => {
                const htmlElements = document.querySelectorAll(querySelector);
                htmlElements.forEach(
                    element => {
                        element.innerHTML = this.value;
                    }
                )
            }
        )
    }
}

const randomDesc = `<h3>Random Setting</h3>
                    <p>The movement of the Roomba is completely random.</p>`

const heatMapDesc =`<h3>HeatMap Setting</h3>
                    <p>A 2D matrix keeps track of the amount of time the roomba stays at every position. Based on that data, the Roomba prioritizes the least visited areas.</p>`

const BFSDesc =`<h3>BFS Setting</h3>
                <p>The space is explored using a Breadth First Search (DFS) algorithm.</p>`

const info = new DataBinding(randomDesc, ['#info']);

const infoMapping = {
    'Random' : randomDesc,
    'HeatMap' : heatMapDesc,
    'BFS' : BFSDesc,
}

const select = document.getElementById('mode');

select.addEventListener('change', (e)=>{
    const newMode = e.target.value;
    buildSand();
    ROOMBA.setPosition(WIDTH/2, HEIGHT/2);
    ROOMBA.setup();
    ROOMBA.setStrategy(newMode);
    info.setState( infoMapping[newMode] );
});