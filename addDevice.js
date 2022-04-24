function addImg(modalId){
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

let saveBtn = document.getElementById("saveImg");
saveBtn.addEventListener('click', function(){
    var fileName = document.getElementById('imgFile').files[0].name;
    var modal = document.getElementById('modalForm');
    modal.style.display = "none";

    // create new image
    const newElement = document.createElement("img");
    const areaOfAct = document.getElementById('imgArea');
    newElement.src = fileName;
    newElement.style.width='100px';
    newElement.style.height='100px';
    areaOfAct.appendChild(newElement);
});