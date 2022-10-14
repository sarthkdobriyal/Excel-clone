//Using ctrl+click to select range

//ctrl key pressed or not e.ctrlKey contains true if ctrl key is pressed otherwise false
let ctrlKey;
document.addEventListener("keydown",(e)=>{
    ctrlKey = e.ctrlKey;
})
document.addEventListener("keyup",(e)=>{
    ctrlKey = e.ctrlKey;
})


let copyBtn = document.querySelector(".copy")
let cutBtn = document.querySelector(".cut")
let pasteBtn = document.querySelector(".paste")

for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector(`.cell[rid ="${i}"][cid = "${j}"]`);
        handleSelectedCells(cell);
    }
}
let rangeStorage = [];
function handleSelectedCells(cell){
    cell.addEventListener("click",(e)=>{
        //select cells range work
        if(!ctrlKey){
            return;
        }
        if(rangeStorage.length >= 2 ){
            defaultSelectedCellsUI();
            rangeStorage= [];
        }

        //UI change
        cell.style.border = "3px solid #00b894"



        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangeStorage.push([rid,cid]);


    })
}

function defaultSelectedCellsUI(){
    for(let i=0;i<rangeStorage.length;i++){
        let selectedCell = document.querySelector(`.cell[rid ="${rangeStorage[i][0]}"][cid = "${rangeStorage[i][1]}"]`);
        selectedCell.style.border = "1px solid #dfe4ea"

    }
}


//copy
let copyData = [];
copyBtn.addEventListener("click", (e)=>{

    if(rangeStorage.length<2) {alert("Please select a Range"); return;};
    copyData = []; 
    for(let i=rangeStorage[0][0];i<=rangeStorage[1][0];i++){
        let copyRow = [];
        for(let j=rangeStorage[0][1];j<=rangeStorage[1][1];j++){
            let cellProp = sheetdB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }

    console.log(copyData);
    defaultSelectedCellsUI();
});

//paste
pasteBtn.addEventListener("click",(e)=>{

    if(rangeStorage.length<2) {alert("Please select a Range"); return;};
    //Target
    let [Tsr,Tsc] = decodeAddress(addressBar.value);
    //Difference
    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    for(let i=Tsr, r=0;i<=Tsr+rowDiff;i++, r++){
        for(let j=Tsc, c= 0;j<=Tsc+colDiff;j++, c++){
            let cell = document.querySelector(`.cell[rid ="${i}"][cid = "${j}"]`);
            if(!cell) continue;
            
            //DB change and UI change
            let data = copyData[r][c];
            let cellProp = sheetdB[i][j];


            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.BGcolor = data.BGcolor;
            cellProp.alignment = data.alignment;

            //UI
            cell.click();

        }
    }
})

//cut

cutBtn.addEventListener("click",(e)=>{
    if(rangeStorage.length<2) {alert("Please select a Range"); return;};

    for(let i=rangeStorage[0][0];i<=rangeStorage[1][0];i++){
        for(let j=rangeStorage[0][1];j<=rangeStorage[1][1];j++){

            //DB
            let cellProp = sheetdB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = 14;
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.BGcolor = "#ecf0f1";
            cellProp.alignment = "left";

            //UI
            let cell = document.querySelector(`.cell[rid ="${i}"][cid = "${j}"]`);
            cell.click();

        }
    }

    defaultSelectedCellsUI();

})

