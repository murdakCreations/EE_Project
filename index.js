let addImgBtn = document.getElementById("addImg");
let modalForm = document.getElementById("addImgModal");
addImgBtn.addEventListener('click', () => {
    // display modal
    modalForm.style.display = 'flex'; 
});

let saveBtn = document.getElementById("saveImg");
saveBtn.addEventListener('click', function(){
    var fileName = document.getElementById('imgFile').files[0];
    var btnText = document.getElementById('btnText');
    // save img to local storage

    const reader = new FileReader();
    reader.addEventListener('load', ()=>{
        imgSRC = reader.result;
        // create background image
        addImgBtn.style.backgroundImage = 'url('+imgSRC+')';
        addImgBtn.style.width = '400px';
        addImgBtn.style.height = '400px';
        addImgBtn.style.backgroundSize = '400px 400px';
        modalForm.style.display = 'none';
        btnText.style.display = 'none';
    });
    reader.readAsDataURL(fileName);
});

let closeBtn = document.querySelector('#closeModal');
closeBtn.addEventListener('click', ()=>{
    modalForm.style.display = 'none';
});

let addDevBtn = document.getElementById('addDevice');
let addDevModal = document.getElementById("addDev");
addDevBtn.addEventListener('click', () => {
    addDevModal.style.display = 'flex';
});

let closeDevBtn = document.querySelector('#closeDevModal');
closeDevBtn.addEventListener('click', ()=>{
    addDevModal.style.display = 'none';
});

// when save is clicked, save input values
let saveDevBtn = document.getElementById("saveDevModal");
let inputID = ['devId', 'devLoc','life','dateInstall','stat','inspStat'];
saveDevBtn.addEventListener('click', ()=>{
    for (var indx = 0; indx < inputID.length; indx++){
        inputVal = document.getElementById(inputID[indx]).value;
        localStorage.setItem(inputID[indx], inputVal);
    }
    // close modal
    addDevModal.style.display = 'none';
    
    // clear input values
    for (var indx = 0; indx < inputID.length; indx++){
        inputVal = document.getElementById(inputID[indx]);
        inputVal.value = '';
    }

    // display localstorage item to table
    // add table row
    var mainTbl = document.getElementById('devTbl');
    tblRow = document.getElementsByTagName('tr');
    // create table data
    // data from local storage
    row = mainTbl.insertRow(tblRow.length);
    
    for (var indx = 0; indx < inputID.length; indx++){
        row.insertCell(indx).innerHTML = localStorage.getItem(inputID[indx]);        
    }
    
    //tblRow.appendChild(tblData);
    


    // get row index of last table row
    
    /*for (indx = 0; indx < tblRow.length; indx++) {
        console.log("current row index: " + tblRow[indx].rowIndex);
    }*/
    /*for (var indx = 0; indx < inputID.length; indx++){
        // create table data
        tblData = document.createElement('td');
        // data from local storage
        localData = localStorage.getItem(inputID[indx]);
        tblData.value = localData;
        tblRow.appendChild(tblData);
    }*/
    
});

// retrieve localstorage item
// localStorage.getItem(inputID[0])
