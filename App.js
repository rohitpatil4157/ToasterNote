console.log('Hello');
showNote();
clipBoard();

let Music = new Audio('./Popup.mp3')
let addBtn = document.querySelector('#addBtn');



addBtn.addEventListener('click', () => {
    Music.play()
    let notes = localStorage.getItem('notes');
    let AddXt = document.querySelector('#AddXt');
    let Times = localStorage.getItem('Times');
    let GT = getTime();

    let TimesObj;
    if (Times == null) {
        TimesObj = []
    }
    else {
        TimesObj = JSON.parse(Times)
    }
    TimesObj.push(GT);
    localStorage.setItem('Times', JSON.stringify(TimesObj));


    let notesObj;
    if (notes === null || AddXt == "") {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(AddXt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    AddXt.value = ""
    showNote();
    Music.play();
    clipBoard();


})

function clipBoard(){
    let Notes = document.querySelectorAll('.notes');
    let notesTxt = document.querySelectorAll('.notesTxt');
    let copyBtn = document.querySelectorAll('.material-symbols-outlined')
    
    Array.from(Notes).forEach((e,index)=>{
        Notes[index].addEventListener('dblclick', ()=>{

            copyBtn[index].classList.toggle('goUp')
            navigator.clipboard.writeText(notesTxt[index].innerText);


            setTimeout(() => {
                copyBtn[index].classList.remove('goUp');
            }, 1200)
        })
    })

}

// setInterval(clipBoard, 2000);


function showNote() {
    let notes = localStorage.getItem('notes');
    let AddXt = document.querySelector('#AddXt')
    let Times = localStorage.getItem('Times');

    let TimesObj;
    if (Times == null) {
        TimesObj = []
    }
    else {
        TimesObj = JSON.parse(Times)
    }

    let notesObj;
    if (notes === null && AddXt.value == "") {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = '';

    notesObj.forEach((element, index) => {


        html += `<div class="notes">
        <h2>Note ${index + 1}</h2>
        <section class="notesTxt">
            <pre>${element}</pre>
        </section>
        <button id="${index}" onclick="deleteNote(this.id)"><i class="fa-solid fa-xmark"></i></button>
        <span class="time">${TimesObj[index]}</span>
        <p><span class="material-symbols-outlined">content_copy</span></p>
    </div>`

    });

    let noteCard = document.querySelector('.container');
    noteCard.innerHTML = html

}





function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    let Times = localStorage.getItem('Times');

    let TimesObj;
    if (Times == null) {
        TimesObj = []
    }
    else {
        TimesObj = JSON.parse(Times)
    }

    let notesObj;
    if (notes === null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    TimesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('Times', JSON.stringify(TimesObj));

    showNote()
}


function getTime() {
    let Times = localStorage.getItem('Times');


    let date = new Date();
    let dateForum = `${date.toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })} | ${date.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric' })}`;

    return dateForum

    // let TimesObj;

}









// Notes.addEventListener('dblclick', () => {
//     let notesTxt = document.querySelector('.notesTxt');

//     copyBtn.classList.add('goUp');

//     navigator.clipboard.writeText(notesTxt.innerText);
    
//     setTimeout(() => {
//         copyBtn.classList.remove('goUp');
//     }, 2000)
// })
