let addSheetBtn = document.querySelector(".sheet-add-icon");
let activeSheetColor = "#8395a7";
let sheetFolderCont = document.querySelector(".sheets-folder-cont");


//TO add new SHeets
addSheetBtn.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", 'sheet-folder');


    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML = `<div class="sheet-content">
                            Sheet ${allSheetFolders.length+1}
                        </div>`;
    sheetFolderCont.appendChild(sheet);
    sheet.scrollIntoView();
    createSheetDb();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown", (e)=>{
        if(e.button !== 2){
            return;
        }
        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length === 1){
            alert("You need to have ! sheet");
            return;
        }

        let response = confirm("Your sheet will be removed permanently. Do you wanna proceed?");
        if(!response){
            return;
        }

        let sheetIdx = Number(sheet.getAttribute("id"));
        
        //Db removal
        collectedSheetsdb.splice(sheetIdx,1);
        collectedGraphComponent.splice(sheetIdx,1);

        handleSheetUIRmoval(sheet)

        //by default bring sheet 1 to active
        sheetdB = collectedSheetsdb[0];
        graphComponentMatrix = collectedGraphComponent[0];
        handleSheetProps();

    })
}

function handleSheetUIRmoval(sheet){
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].setAttribute("id",i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerText = `Sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor = "transparent";
    }

    allSheetFolders[0].style.backgroundColor = "#8395a7";
}


function handleSheetUI(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "#8395a7";
}

function handleSheetDb(sheetIdx) {
    sheetdB = collectedSheetsdb[sheetIdx];
    graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handleSheetProps() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.querySelector(`.cell[rid ="${i}"][cid = "${j}"]`);
            cell.click();
        }
    }
    //by default click on firstCell via DOM
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function handleSheetActiveness(sheet) {
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDb(sheetIdx);
        handleSheetProps();
        handleSheetUI(sheet)

    });
}

function createSheetDb() {
    let sheetdB = [];
    for (let i = 0; i < rows; i++) {
        let sheetRow = [];
        for (let j = 0; j < cols; j++) {
            let cellProp = {
                bold: false,
                italics: false,
                underline: false,
                alignment: "left",
                fontFamily: "monospace",
                fontSize: 14,
                fontColor: "#000000",
                BGcolor: "#ecf0f1",
                value: "",
                formula: "",
                children: []
            };
            sheetRow.push(cellProp);
        }
        sheetdB.push(sheetRow);
    }
    collectedSheetsdb.push(sheetdB);

}

//SO THAT EACH SHEET GRAPH COMPONENT  IS ISOLATED
function createGraphComponentMatrix() {
    let graphComponentMatrix = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            //more than one child relation(dependency)
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }
    collectedGraphComponent.push(graphComponentMatrix)
}