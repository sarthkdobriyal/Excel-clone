
let collectedGraphComponent = [];

//Storage > 2D matrix (Basic needed)
// let graphComponentMatrix = [];

// for(let i=0;i<rows;i++){
//      let row = [];
//      for(let j=0;j<cols;j++){
//          //more than one child relation(dependency) so array
//          row.push([]);
//      }
//      graphComponentMatrix.push(row);
//  }

//True: cycle => False:Not cyclic
function isGraphCyclic(graphComponentMatrix) {
    //dependency -> visited , dfsVisited (2D array);
    let visited = [];
    let dfsVisited = [];

    //2D arrray required
    for(let i=0;i<rows;i++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j=0;j<cols;j++){
            visitedRow.push(false); //false by default
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    //Check for cycle
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(visited[i][j] === false){
               let isCyclic =  dfsCyclic(graphComponentMatrix, i , j , visited,dfsVisited);
               if(isCyclic){
                   return [i,j]; //Returning the cell address so that it could be traced
               }
            }
        }
    }
    return null;

}

//start -> vis[i][j] = true && dfsvisited[i][j] = true;
//end -> dfsVisited = false;
//If vis[i][j]==true --> already explored path
//Cycle Condition -> if vis and dfsVis both are true
//algo --> vis & dfsVis = true --> for all unvisted children  --> check if cycle --> if not call func for unvisited children --> dfsVis =false --> 
function dfsCyclic(graphComponentMatrix, i , j, visited, dfsVisited){
    visited[i][j] = true;
    dfsVisited[i][j] = true;

    //A1 =>  [ [0,1],[0,2] ]
    for(let children = 0 ; children < graphComponentMatrix[i][j].length;children++){
        let [crid, ccid] =graphComponentMatrix[i][j][children];
        if(visited[crid][ccid] === true && dfsVisited[crid][ccid] === true){
            return true;
        }
        else if(visited[crid][ccid] == false){
            let response = dfsCyclic(graphComponentMatrix,crid,ccid,visited,dfsVisited);
            if(response === true){
                return true; //Found cycle return immediately
            }
        }
    }

    dfsVisited[i][j] = false;
    return false;
}