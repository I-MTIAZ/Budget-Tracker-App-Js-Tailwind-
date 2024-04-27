/* const card =  document.querySelector(".card");

const newdiv = document.createElement('div')

newdiv.innerHTML= `
<h1>Hello World</h1>
<h3>This is Bangladesh</h3>
`

const seconddiv = document.createElement('div')

seconddiv.innerHTML = `
<h1>lorem ispum fkasf n sadjlfj</h1>
<h1>lorem ispum fkasf n sadjlfj</h1>

`
card.append(newdiv)
const button = document.createElement("button")

button.textContent = "OK"
seconddiv.append(button)
card.appendChild(seconddiv)

button.addEventListener("click",()=>{
    alert("working");
}) */





let income
let expense
const Amount = document.querySelector("input"); 
const Add_button = document.querySelector("button");
const Information = document.querySelector("#all-result")

const Income = document.querySelector('#result > :nth-child(1) > span');
const Expense = document.querySelector('#result > :nth-child(2) > span');

let data = []

function create_info(item){
   /*  console.log("item is = ",item) */
    const newdiv = document.createElement("div");
    newdiv.innerHTML = `
    <div class = "flex justify-between bg-[#F6F6F8]  mx-auto container p-4">

        <div class=" flex gap-x-10">
        <h1 class ="text-3xl font-normal " >${item.value}</h1>
        <h3 class = "font-normal">${item.name}</h3>
        </div>

        <div class="flex gap-x-10">
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        </div>
    </div>
    `
    Information.append(newdiv)

    newdiv.querySelector(".delete-btn").addEventListener("click",() =>{
        newdiv.remove()
        /* console.log("ok") */
        delete_info(item)
    })

    newdiv.querySelector(".edit-btn").addEventListener("click",()=>{
        const value = prompt("What's your sign?");
        if(parseFloat(value) > 0 || parseFloat(value < 0)){
            Edit_info(item ,parseFloat(value))
            newdiv.querySelector("h1").textContent = value
        }  
    })
}

Add_button.addEventListener("click", () => {
    const amount = parseFloat(Amount.value);
    /* console.log(amount) */
    if(!isNaN(amount)){
        if(amount > 0){
            income += amount;
            Income.textContent = income;
            localStorage.setItem('income',income)
            const item = {name:"Income",value:amount}
            data.push(item)
            create_info(item)
            all_info(data)
        } 
        else if (amount < 0){
            expense += (amount * -1)
            Expense.textContent = expense
            localStorage.setItem('expense',expense)
            const item = {name:"Expense",value:amount * -1}
            data.push(item)
            create_info(item)
            all_info(data)
        }
        Amount.value=""
        /* console.log(data); */
    }
    else{
        alert("Enter Valid Number")
        Amount.value=""
    }
   
});

function all_info(data){
    const result = JSON.stringify(data);
    localStorage.setItem('result',result)
}

function Edit_info(item, value){
    
    const copyItem = parseFloat(item.value)
    const index = data.findIndex(dataItem => dataItem === item);
    if (index !== -1) {
        data[index].value = value
        all_info(data)
        if(item.name === "Income"){
            income = (income -copyItem) + value
            /* console.log(income) */
            Income.textContent = income
            localStorage.setItem('income',income)
        }
        else{
            expense = (expense - copyItem)+value
            Expense.textContent = expense
            localStorage.setItem('expense',expense)
        }
        /* console.log("copy = ",copyItem)
        console.log("item = ",item) */
    }
}

function delete_info(item){
    if(item.name === "Income"){
        income-=item.value
        Income.textContent = income
        localStorage.setItem('income',income)
    }
    else{
        expense -= item.value
        Expense.textContent = expense
        localStorage.setItem('expense',expense)
    }
    const index = data.findIndex(dataItem => dataItem === item);
    if (index !== -1) {
        data.splice(index, 1);
    }
    all_info(data)

}

function ready(){
    income = localStorage.getItem('income') ? parseFloat(localStorage.getItem('income')) : 0;
    expense = localStorage.getItem('expense') ? parseFloat(localStorage.getItem('expense')) : 0;
    Income.textContent = income;
    Expense.textContent = expense;

     
    if(localStorage.getItem('result')) 
    {
        const Result = JSON.parse(localStorage.getItem('result'))
        data = Result
        
        if (Result !== null) {
            Result.forEach((item) => {
            create_info(item);
            });
        }
    }

}

ready()



