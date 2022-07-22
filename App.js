console.log('Hello');
showNote();
clipBoard();


let Music = new Audio('./Popup.mp3');
let Whoosh = new Audio('./Wooosh3.mp3');
let addBtn = document.querySelector('#addBtn');
let Video = document.querySelector('.Video').children[0];



function speakBro(){
    let voices, speech;
    speech = new SpeechSynthesisUtterance();

    let notesTxt = document.querySelectorAll('.notesTxt');

    Array.from(notesTxt).forEach((e,index)=>{
        let soundBtn = document.querySelectorAll('.sound'); // =>

        soundBtn[index].addEventListener('click', ()=>{
            soundBtn[index].classList.add('bgShine')
            speech.text = notesTxt[index].innerText;
            // console.log(speech.text)
            
            window.speechSynthesis.addEventListener('voiceschanged', () => {
                voices = window.speechSynthesis.getVoices();
                speech.voice = voices[12];
                window.speechSynthesis.speak(speech);
                // console.log(e.name, ': ', index)
            });

            setTimeout(()=>{
                soundBtn[index].classList.remove('bgShine');
                
            },2000)
        })
    })
}

// speakBro()
// setInterval(speakBro, 100);

function warn(text){
    let warningBox = document.querySelector('.warning');
    warningBox.children[1].innerText = text
    warningBox.classList.add('warningX')
    
    setTimeout(()=>{
        warningBox.classList.remove('warningX')
    }, 1500)
}

addBtn.addEventListener('click', () => {
    
    
    let notes = localStorage.getItem('notes');
    let AddXt = document.querySelector('#AddXt');
    let Times = localStorage.getItem('Times');
    if(AddXt.value !== ""){

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
        Video.play()
        Music.play()
        if(AddXt.value !== "" ){
            
        }
        notesObj.push(AddXt.value);
        localStorage.setItem('notes', JSON.stringify(notesObj))
        AddXt.value = ""
        showNote();
        clipBoard()
    }
    else{
        // Empty notes aren't allowed
        Video.pause()
       warn("Empty Notes aren't allowed :)")
    }

})


function clipBoard(){
    let Notes = document.querySelectorAll('.notes');
    let notesTxt = document.querySelectorAll('.notesTxt');
    let copyBtn = document.querySelectorAll('.material-symbols-outlined')
    
    Array.from(Notes).forEach((e,index)=>{
        
        Notes[index].addEventListener('dblclick', ()=>{

            copyBtn[index+1].classList.toggle('goUp');
            navigator.clipboard.writeText(notesTxt[index].innerText);
            navigator.vibrate([0, 200, 100])
        
            setTimeout(() => {
                copyBtn[index+1].classList.remove('goUp');
                
            }, 1200)
        })

    })

}



// setInterval(clipBoard, 5000);


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
    // warn(`${notesObj[index]} Has been deleted`);
    warn(`Your Note Has been deleted`);
    navigator.vibrate(90)
    Whoosh.play()
    notesObj.splice(index, 1);
    TimesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('Times', JSON.stringify(TimesObj));

    showNote()
    clipBoard();

}


function getTime() {
    let Times = localStorage.getItem('Times');


    let date = new Date();
    let dateForum = `${date.toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })} | ${date.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric' })}`;

    return dateForum

    // let TimesObj;

}



    






// function speakNote(text){
//     let speech = new SpeechSynthesisUtterance();

//     speech.text = text;
//     speech.lang = 'en-US';
//     speech.rate = 1;
    
//     let voices = [];
//     voices = window.speechSynthesis.getVoices();
//     console.log(voices)
//     speech.voice = voices[1]

//     window.speechSynthesis.speak(speech);
    
// }


// Notes.addEventListener('dblclick', () => {
//     let notesTxt = document.querySelector('.notesTxt');

//     copyBtn.classList.add('goUp');

//     navigator.clipboard.writeText(notesTxt.innerText);
    
//     setTimeout(() => {
//         copyBtn.classList.remove('goUp');
//     }, 2000)
// })
