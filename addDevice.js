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
        // create background image
        const areaOfAct = document.getElementById('imgArea');
        areaOfAct.style.backgroundImage = 'url('+imgSRC+')';
        areaOfAct.style.width = '200px';
        areaOfAct.style.height = '200px';
        areaOfAct.style.backgroundSize = '200px 200px';
    });
    reader.readAsDataURL(fileName);
});

function createBtn(id) {
    const areaOfAct = document.getElementById('imgArea');
    let iX, iY, fX, fY;
    areaOfAct.addEventListener("mousedown", function(e){
        iX = e.pageX;
        iY = e.pageY;
    });

    areaOfAct.addEventListener("mouseup", function(e){
        fX = e.pageX;
        fY = e.pageY;
        let width = fX - iX;
        let height = fY - iY;
        const newElement = document.createElement("button");
        newElement.innerHTML="<img style='width:100%;height:100%;'src='"+id+".png'>";
        newElement.style.overflow='hidden';
        //newElement.style.backgroundColor='black';
        newElement.style.position='absolute';
        newElement.style.left=iX+'px';
        newElement.style.top=iY+'px';
        newElement.style.width=width+'px';
        newElement.style.height=height+'px';
        newElement.style.backgroundSize='cover'
        //newElement.style.backgroundRepeat='no-repeat';
        newElement.style.padding='0';
        areaOfAct.appendChild(newElement);
        //console.log("final position: " + e.pageX + "," + e.pageY);
        if (newElement) {
            setTimeout(createInfo,1000);
        }
    });
    
}

function createInfo(){
    const areaOfAct = document.getElementById('imgArea');
    areaOfAct.style.display='none';
    const parentDiv = document.getElementById('modalDevInfo');
    let lbls = ['Device Name', 'Life Span'];

    const newElementLbl = document.createElement("label");
    const newElementInput = document.createElement("input");
    const newElementBtn = document.createElement("button");
    newElementLbl.innerHTML = lbls[0];
    newElementBtn.innerHTML = "next";
    parentDiv.appendChild(newElementLbl);
    parentDiv.appendChild(newElementInput);
    parentDiv.appendChild(newElementBtn);

    newElementBtn.addEventListener('click', function(){
        newElementLbl.innerHTML = lbls[1];
        newElementBtn.innerHTML = "save";
        newElementBtn.addEventListener('click', function(){
            parentDiv.style.display = 'none';
            // back to dashboard
        });
    });
}