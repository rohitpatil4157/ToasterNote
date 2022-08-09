console.log('Hello');

showNote();
clipBoard();

let Music = new Audio('./Popup.mp3');
let Whoosh = new Audio('./Wooosh3.mp3');
let addBtn = document.querySelector('#addBtn');
let Video = document.querySelector('.Video').children[0];



class f1noter {
    constructor(name) {
        this.name = name;
    }
    notify(text) {
        let warningBox = document.querySelector('.warning');
        warningBox.children[1].innerText = text
        warningBox.classList.add('warningX')

        setTimeout(() => {
            warningBox.classList.remove('warningX')
        }, 1500)
    }
}

let f1 = new f1noter();
// console.log(f1.notify('tere Wadil'))
// function 



addBtn.addEventListener('click', () => {
    let notes = localStorage.getItem('notes');
    let AddXt = document.querySelector('#AddXt');

    if (AddXt.value) {
        Video.play()
        Music.play()

        let notesObj;
        if (notes === null || AddXt == "") {
            notesObj = []
        }
        else {
            notesObj = JSON.parse(notes);
        }

        //Wrap your whole data in One single Object Literal :))
        let MyObj = {
            text: AddXt.value,
            time: getTime(),
        }

        notesObj.push(MyObj);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        AddXt.value = ""
        showNote();
        clipBoard()

        return;  // Guard Clause saves us from writing else below
    }

    Video.pause()
    f1.notify("Empty Notes aren't allowed :)")

})


function clipBoard() {
    let Notes = document.querySelectorAll('.notes');
    let notesTxt = document.querySelectorAll('.notesTxt');
    let copyBtn = document.querySelectorAll('.material-symbols-outlined')

    Array.from(Notes).forEach((e, index) => {
        Notes[index].addEventListener('dblclick', () => {
            let copiedText = notesTxt[index].innerText;

            copyBtn[index].classList.toggle('goUp');
            navigator.clipboard.writeText(copiedText);
            navigator.vibrate([0, 50, 90])

            setTimeout(() => {
                copyBtn[index].classList.remove('goUp');
            }, 1200)
        })

    })

}


function showNote() {
    let notes = localStorage.getItem('notes');
    let AddXt = document.querySelector('#AddXt')

    let notesObj;
    if (notes === null && AddXt.value == "") {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach((element, index) => {
        let elemText = element.text;
        if (elemText.includes('<') || elemText.includes('>')) {
            elemText = elemText.replaceAll('<', '&lt;');
            elemText = elemText.replaceAll('>', '&gt;')
        }

        // // <h2>Note </h2>
        // <button id="${index}" onclick="deleteNote(this.id)"><i class="fa-solid fa-xmark"></i></button>
        // <span class="time">${element.time}</span>
        html += `<div class="notes">
                    <div class="titleCircle">
                        <p>${index + 1}</p>
                    </div>
                    
                    <section class="notesTxt">
                        <pre>${elemText}</pre>
                    </section>
                    <button id="${index}" onclick="deleteNote(this.id)"><i class="fa-solid fa-xmark"></i></button>
                    <span class="time">${element.time}</span>
                    <p><span class="material-symbols-outlined ">content_copy</span></p>
                </div>`

    });

    let Container = document.querySelector('.container');
    Container.innerHTML = html

}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');

    let notesObj;
    if (notes === null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }
    f1.notify(`Your Note Has been deleted`);
    navigator.vibrate(90)
    Whoosh.play()
    let setVal = setTimeout(() => {
        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        showNote()
        clipBoard();

    }, 100)
    // document.addEventListener('dblclick', () => {
    //     clearTimeout(setVal)
    //     f1.notify('Cancelled')
    // })

}


function getTime() {

    let date = new Date();
    let dateForum = `${date.toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })} | ${date.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric' })}`;

    return dateForum;

}
