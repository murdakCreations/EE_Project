const file = document.querySelector('#imgFile')
const btn = document.querySelector('#subBtn')
btn.addEventListener('click', () => {
    console.log('hello')
    var imgSRC
    const reader = new FileReader()
    reader.addEventListener('load', ()=>{
        imgSRC = reader.result
        console.log(imgSRC)
    });
    reader.readAsDataURL(file.files[0])

    fetch('/img', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            imgFile: imgSRC
        })
    })
        .then(res => {
            if(res.ok) return res.json()
        })
        .catch(error => console.error(error))
})