function distanceBetweenPoints(x1, x2, y1, y2){
    const sm = {
        x : x2-x1,
        y : y2-y1,
    }

    const l = Math.sqrt( 
        Math.pow( sm.x, 2 ) + Math.pow( sm.y, 2 )
    )

    return l;
}

function normalizeVector(deltaVector){
    const deltaVectorNorm = distanceBetweenPoints( deltaVector.x, 0, deltaVector.y, 0 );
    deltaVector.x /= deltaVectorNorm;
    deltaVector.y /= deltaVectorNorm;

    return deltaVector;
}