let addImgBtn = document.getElementById("addImg");
let modalForm = document.getElementById("addImgModal");
addImgBtn.addEventListener('click', () => {
    // display modal
    modalForm.style.display = 'flex';
});

let saveBtn = document.getElementById("saveImg");
saveBtn.addEventListener('click', function(){
    var fileName = document.getElementById('imgFile');
    var btnText = document.getElementById('btnText');
    // save img to local storage
    console.log('input type ' + typeof(fileName.value))
    const reader = new FileReader();
    reader.addEventListener('load', _ =>{
        imgSRC = reader.result;
        // create background image
        addImgBtn.style.backgroundImage = 'url('+imgSRC+')';
        addImgBtn.style.width = '400px';
        addImgBtn.style.height = '400px';
        addImgBtn.style.backgroundSize = '400px 400px';
        modalForm.style.display = 'none';
        btnText.style.display = 'none';
        //console.log(imgSRC)
        let data = JSON.stringify({
            img: imgSRC
        })
        console.log('json type ' + typeof(data))
        fetch('/img', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: data
        })
            .then(res => {
                if(res.ok) return res.json()
                ///alert('post')
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => console.error(error))
    });
    reader.readAsDataURL(fileName.files[0]);
    
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
let inputID = ['devId', 'devLoc','devTyp','life','meter','dateInstall','stat','inspStat'];
//console.log(inputID.length);
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
    row.insertCell(inputID.length).innerHTML = '<a href="">Edit</a><a href="">Delete</a>';
    
    
});

// retrieve localstorage item
// localStorage.getItem(inputID[0])
function editRow(id){
    addDevBtn.click()
}

function deleteRow(id){
    //alert(id)
    fetch('/device', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            devId: id
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
        .catch(error => console.error(error))
}
