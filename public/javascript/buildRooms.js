const addRoomBtn = document.querySelector('#addRoom')
const modal = document.querySelector('.modalForm')
addRoomBtn.addEventListener('click', () => {
    modal.style.display = 'flex'
})

const closeBtn = document.querySelector('#close')
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
})

function hovered(id) {
    document.querySelector("#" + id).style.backgroundColor = 'grey'
    document.querySelector("#" + id + " .roomBtns").style.display = 'flex'
}

function left(id) {
    document.querySelector("#" + id).style.backgroundColor = 'white'
    document.querySelector("#" + id + " .roomBtns").style.display = 'none'
}

const roomNameVal = document.querySelector('#roomName')
const roomIDVal = document.querySelector('#roomID')

roomNameVal.addEventListener('change', () => {
    id = roomNameVal.value.replace(/\s/g, "")
    roomIDVal.value = id
})