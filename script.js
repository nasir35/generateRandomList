let addedElements = document.getElementById('added-elements');
let pickedElements = document.getElementById('picked-elements');
var inputVal = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const shuffleBtn = document.getElementById('shuffle-btn');
const form = document.getElementById('form');
const downloadBtn = document.getElementById('download-btn');

let elements = [];
addedElements.innerText = elements.length>0? elements : '{}';


const require = document.getElementById('require');
const allForms = document.querySelectorAll('form input[type="text"]');
allForms.forEach(inp => {
    inp.addEventListener('change', ()=>{
        inp.classList.remove('invalid');
    })
})
const addElement = () => {
    if(inputVal.value.length){
        if(elements.indexOf(inputVal.value)===-1 && pickedItems.indexOf(inputVal.value) === -1){
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
const inp2 = document.getElementById("picked-item");
choice.addEventListener("change", () => {
    if(choice.value === "individual"){
        inp1.disabled = false;
        inp1.placeholder = 'Picked for..';
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
            <td>${choice.value === 'count' ? ++count : inp1.value}</td>
            <td>${pickedItem}</td>
        `
        pickedElements.appendChild(newRow);
        elements.splice(index, 1);
        addedElements.innerText = elements.length ? elements : '{}';
        inp1.value = '';
        if(count!=0){
            inp2.disabled = true;
            choice.disabled = true;
        }
    }
}

choice.addEventListener("change", () => {
    if(choice.value =='count'){
        document.getElementById('th1').innerText = 'SL No';
    }
    else{
        document.getElementById('th1').innerText = 'Responsiblities';
    }
})
document.getElementById('th1').innerText = 'SL No';
document.getElementById('th2').innerText = inp2.placeholder;

inp2.addEventListener('change', () => {
    document.getElementById('th2').innerText = inp2.value.length ? inp2.value : 'Picked Item';
})
shuffleBtn.addEventListener("click", ()=>{
    const shuffleBox = document.getElementById('shuffle-box');
    const inputs = shuffleBox.querySelectorAll('form input[type="text"]');
    console.log(inputs);
    let flag = true;
    for(const i of inputs){
        if(i.disabled === false && i.value.length===0){
            i.classList.add('invalid')
            flag = false;
            break;
        }
    }
    if(flag){
        shuffle(); 
    }
    else if(inp1.disabled===true && inp2.disabled === true){
        shuffle();
    }
    else{
        alert("Please fill out the required inputs!");
    }
});

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