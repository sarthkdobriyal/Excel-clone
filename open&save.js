let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".upload");

//Download 
downloadBtn.addEventListener("click",(e)=>{
  let data =  JSON.stringify([sheetdB, graphComponentMatrix]);
  let file = new Blob([data],{type: "application/json"});

  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "SheetData.json";
  a.click();
})


//Upload
openBtn.addEventListener("click",(e)=>{
    //opens file explorer
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];
        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let sheetData = JSON.parse(fr.result);

            //Basic sheet creation with default data
            addSheetBtn.click();

            //sheetdB , graphComp, 
            sheetdB = sheetData[0];
            graphComponentMatrix = sheetData[1];

            collectedSheetsdb[collectedSheetsdb.length -1] = sheetdB;
            collectedGraphComponent[collectedGraphComponent.length-1] = graphComponentMatrix;
            handleSheetProps();

        })
    })

})