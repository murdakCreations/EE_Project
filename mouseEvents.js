function add() {
    const areaOfAct = document.getElementById("floorPlanArea");
    let iX, iY, fX, fY;
    areaOfAct.addEventListener("mousedown", function(e){
        iX = e.pageX;
        iY = e.pageY;
        //console.log("initial position: " + e.pageX + "," + e.pageY);
    });

    areaOfAct.addEventListener("mouseup", function(e){
        fX = e.pageX;
        fY = e.pageY;
        let width = fX - iX;
        let height = fY - iY;
        const newElement = document.createElement("button");
        newElement.innerHTML="<img style='width:100%;height:100%;'src='free-building-icon-1062-thumb.png'>";
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
    });
}
