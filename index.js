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
saveDevBtn.addEventListener('click', ()=>{
    let inputID = ['devId', 'devLoc','life','dateInstall','stat','inspStat'];
    for (var indx = 0; indx < inputID.length; indx++){
        inputVal = document.getElementById(inputID[indx]).value;
        localStorage.setItem(inputID[indx], inputVal);
    }
});