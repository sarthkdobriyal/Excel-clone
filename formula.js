for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector(`.cell[rid ="${i}"][cid = "${j}"]`);
        cell.addEventListener("blur",(e)=>{
            let address = addressBar.value;
            let [activeCell, cellProp]  = getActiveCell(address);
            let enteredData = activeCell.innerText;
            if(enteredData != cellProp.value ){
                cellProp.value = enteredData;
                //if modifiess remove P_C relation => formula empty => update children with new Hardcoded value
                removeChildFromParent(cellProp.formula);
                cellProp.formula = "";
                updateChildCells(address);
                return;
            }
            cellProp.value = enteredData;
        });
    }
}


//TO establish parent child relationship
function addChildToParent(formula){
    let childAddress = addressBar.value
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue<=90){
            let [parentCell,parentCellProp] = getActiveCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}



function removeChildFromParent(formula){
    let childAddress = addressBar.value
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue<=90){
            let [parentCell,parentCellProp] = getActiveCell(encodedFormula[i]);

            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx,1); //removing that childAddress
        }
    }
}


//Evaluating the formula
let formulaBar = document.querySelector(".formula");
formulaBar.addEventListener("keydown", async (e)=>{
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && formulaBar.value){
        let [cell, cellProp] = getActiveCell(addressBar.value);
        
        //if change in formula break old P-C relation, addNew P-C relation
        if(inputFormula !== cellProp.formula){
            removeChildFromParent(cellProp.formula);
        }


        addChildToGraph(inputFormula,addressBar.value);

        //check formula cyclic or not then only evaluate
        let cycleResponse = isGraphCyclic(graphComponentMatrix); //contains the cell address to trace cycle path

        if(cycleResponse){
            let con = window.confirm("Your Formula is Cyclic!! Do you want to Trace your Path?");
            while(con === true){
                //keep on tracking until user is satisfied
                await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse); // i want to complete full iteration of color tracking
                con = window.confirm("Do you want to Trace your path again?");
            }
            //break the relation if cyclic cause not required
            removeChildFromGraph(inputFormula,addressBar.value);
            return;
        }

        let evaluatedValue = evaluateFormula(inputFormula);
        setUiAndCellProp(evaluatedValue,inputFormula, addressBar.value); // to update ui and cell prop
        addChildToParent(inputFormula);
        updateChildCells(addressBar.value)
    }
});

//To add to graph component
function addChildToGraph(formula, childAddress){
    //Formula => Parent address -> decode ; childAddress -> decode => add to parent  THEN  : put in graphMatrix
    let [crid,ccid] = decodeAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue<=90){
            let [prid, pcid] = decodeAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].push([crid,ccid]);
        } 
    }
}

//To remove the relation created from graph component
function removeChildFromGraph(formula, childAddress){
    let [crid,ccid] = decodeAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue<=90){
            let [prid, pcid] = decodeAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop(); //removes last item inserted
        } 
    }
}

//Recursive function to update all the child cells dependent on the all the children of the current cell whose formula has changed
function updateChildCells(parentAddress){
    let [parentCell, parentCellProps] = getActiveCell(parentAddress);
    let children = parentCellProps.children;

    for(let i=0;i,children.length;i++){
        let childAddress = children[i];
        let [childCell, childCellProp] = getActiveCell(childAddress);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula);
        setUiAndCellProp(evaluatedValue,childFormula,childAddress);
        updateChildCells(childAddress);
    }
}


//Decoding the formula and getting value from depended cell and returning result
function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue<=90){
            let [cell,cellProp] = getActiveCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula); //apne aap hi evaluate krke return krdegaa
}


//TO update the UI and upate DB
function setUiAndCellProp(evaluatedValue,formula , address){
    let [cell, cellProp] = getActiveCell(address);
    cell.innerText = evaluatedValue; //ui update
    cellProp.value = evaluatedValue; //db update
    cellProp.formula = formula; //db update

}