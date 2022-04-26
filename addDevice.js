function addImg(modalId){
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

let saveBtn = document.getElementById("saveImg");
saveBtn.addEventListener('click', function(){
    var fileName = document.getElementById('imgFile').files[0];
    var modal = document.getElementById('modalForm');
    modal.style.display = "none";

    // save img to local storage

    const reader = new FileReader();
    reader.addEventListener('load', ()=>{
        imgSRC = reader.result;
        // create new image
        const newElement = document.createElement("img");
        const areaOfAct = document.getElementById('imgArea');
        newElement.src = imgSRC;
        newElement.style.width='1001px';
        newElement.style.height='auto';
        areaOfAct.appendChild(newElement);
    });
    reader.readAsDataURL(fileName);
});