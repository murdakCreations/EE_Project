const addFloorBtn = document.querySelector('#addFloor')
const modal = document.querySelector('.modalForm')
addFloorBtn.addEventListener('click', () => {
    modal.style.display = 'flex'
})

const closeBtn = document.querySelector('#close')
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
})

function hovered(id) {
    document.querySelector("#" + id).style.backgroundColor = 'grey'
    document.querySelector("#" + id + " .floorBtns").style.display = 'flex'
}

function left(id) {
    document.querySelector("#" + id).style.backgroundColor = 'white'
    document.querySelector("#" + id + " .floorBtns").style.display = 'none'
}

const floorNameVal = document.querySelector('#floorName')
const floorIDVal = document.querySelector('#floorID')

floorNameVal.addEventListener('change', () => {
    id = floorNameVal.value.replace(/\s/g, "")
    floorIDVal.value = id
})


function currFloor(floor) {
    console.log(floor)
    floorIDVal.value = floor
    if (floorIDVal.value == floor) location ='/room'
}