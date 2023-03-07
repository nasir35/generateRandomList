let addedElements = document.getElementById('added-elements');
let pickedElements = document.getElementById('picked-elements');
var inputVal = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const shuffleBtn = document.getElementById('shuffle-btn');
const form = document.getElementById('form');
const downloadBtn = document.getElementById('download-btn');

let elements = [];
addedElements.innerText = elements.length>0? elements : '{}';

const addElement = () => {
    if(inputVal.value.length){
        if(elements.indexOf(inputVal.value)===-1){
            let element = inputVal.value;
            elements = [...elements, element];
            addedElements.innerText = elements;
            inputVal.value = "";
        }
        else{
            window.alert('Item already exist!');
        }
    }
}

addBtn.addEventListener("click", () => addElement());

const choice = document.getElementById('choice');
const inp1 = document.getElementById("inp1");
choice.addEventListener("change", () => {
    if(choice.value === "individual"){
        inp1.disabled = false;
    }
    else{
        inp1.disabled = true;
    }
});
let pickedItems= [];
let count = 0;
const shuffle = () => {
    if(elements.length){
        let index = Math.floor(Math.random()*elements.length);
        let pickedItem = elements[index];
        pickedItems = [...pickedItems, pickedItem];
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${++count}</td>
            <td>${pickedItem}</td>
        `
        pickedElements.appendChild(newRow);
        elements.splice(index, 1);
        addedElements.innerText = elements.length ? elements : '{}';
    }
}

shuffleBtn.addEventListener("click", ()=>shuffle());

const download = () => {
    const newWin = window.open('');
    const newHtml = document.createElement('html');
    newHtml.innerHTML = `
    <head>
        <title>Randomly picked List</title>
        <style>
        .list-container{
            display: flex;
            align-items: center;
            width: 50%;
            flex-direction: column;
            margin: 0 auto;
            min-height: 90vh;
        }
        .title{
            margin: 25px 0;
            font-size: 1.8rem;
            color: coral;
        }
        table, th, td{
            border: 1px solid rgb(118, 117, 117);
          }
          table{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            border-collapse: collapse;
          }
          th{
            background-color: lightblue;
          }
          th, td{
            width: 200px;
            text-align: center;
            padding: 5px 10px;
          }
          th > input{
            font-weight: 600;
            background-color: lightblue;
            width: 100%;
            text-align: center;
            outline: none;
            border: none;
          }
          #choice{
            display: none;
          }
        </style>
    </head>
    <body>
        <div class="list-container">
            <h2 class="title">Randomly Picked List!</h2>  
            ${pickedElements.outerHTML}
        </div>
        <div style ="display : flex; justify-content: center">
            <p style="inline-block;  color:#aaa">Designed and developed by Nasir &copy; 2023-2024</p>
        </div>
        <script src="script.js"></script>
    </body>
    `
    newWin.document.write(newHtml.outerHTML);
    newWin.print();
}
downloadBtn.addEventListener('click', () => download());