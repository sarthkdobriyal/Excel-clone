//Structuring storage of each cell
let collectedSheetsdb = []; // containing all sheets
let sheetdB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
    handleSheetProps();
}
//  for(let i=0;i< rows;i++){
//      let sheetRow = [];
// for(let j=0;j<cols;j++){
//          let cellProp = {
//              bold: false,
//              italics: false,
//              underline: false,
//             alignment: "left",
//             fontFamily: "monospace",
//              fontSize: 14,
//              fontColor: "#000000",
//              BGcolor: "#ecf0f1" ,
//              value: "",
//              formula:"",
//              children: []
//          };
//          sheetRow.push(cellProp);
//      }
//      sheetdB.push(sheetRow);
//  }

//selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".background-color-prop");
let alignment = document.querySelectorAll(".alignment");
// let formulaBar = document.querySelector(".formula");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

//TO change ui change in toolbox
let activeColorProp = "#747d8c";
let inactiveColorProp = "#dcdde1"


//Application of Two-Way binding
//Attach property listeners
bold.addEventListener("click", (e)=>{
    let [cell,cellProp] = getActiveCell(addressBar.value);

    //Modification
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight= cellProp.bold?"bolder":"normal"; // ui change
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; //toolbox ui change
});

italic.addEventListener("click", (e)=>{
    let [cell,cellProp] = getActiveCell(addressBar.value);

    //Modification
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle= cellProp.italic?"italic":"normal"; // ui change
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
});

underline.addEventListener("click", (e)=>{
    let [cell,cellProp] = getActiveCell(addressBar.value);

    //Modification
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration= cellProp.underline?"underline":"none"; // ui change
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
});

fontSize.addEventListener("change",(e)=>{
    let [cell,cellProp] = getActiveCell(addressBar.value);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change",(e)=>{
    let [cell,cellProp] = getActiveCell(addressBar.value);

    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change",(e)=>{
    let [cell,cellProp] = getActiveCell(addressBar.value);
    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
});

BGcolor.addEventListener("change",(e)=>{
    let [cell,cellProp] = getActiveCell(addressBar.value);
    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
});

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e)=>{
        let [cell,cellProp] = getActiveCell(addressBar.value);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue //data change
        cell.style.textAlign = cellProp.alignment; //ui change (1)
        
        switch(alignValue){ //ui change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp
                break;
        }

    })
});

let allCells = document.querySelectorAll(".cell");

for(let i=0;i<allCells.length;i++){
    addListenerToAttachCellProperties(allCells[i]);
}

//Function to display properties of only current cell
function addListenerToAttachCellProperties(cell){
    cell.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [rid,cid]=decodeAddress(address);
        let cellProp = sheetdB[rid][cid];

        //Apply cell properties
        cell.style.fontWeight= cellProp.bold?"bolder":"normal"; // ui change
        cell.style.fontStyle= cellProp.italic?"italic":"normal"; // ui change
        cell.style.textDecoration= cellProp.underline?"underline":"none"; // ui change
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;
        cell.value = cellProp.formula;

        // console.log(cellProp);

        //apply properties container ui
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontFamily.value = cellProp.fontFamily;
        fontSize.value = cellProp.fontSize;
        switch(cellProp.alignment){ 
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp
                break;
        }
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    });
}


//returns cell from ui and DB
function getActiveCell(address){
    let [rid,cid] = decodeAddress(address);
    //Access cell and storage
    let cell = document.querySelector(`.cell[rid ="${rid}"][cid = "${cid}"]`);
    let cellProp = sheetdB[rid][cid];
    return [cell, cellProp];
}

///separates rid and cid from cell address
function decodeAddress(address){
    //address = "A1"
    let rid = Number(address.slice(1)) - 1;
    let cid = Number(address.charCodeAt(0)) - 65; 
    return [rid,cid];

}

