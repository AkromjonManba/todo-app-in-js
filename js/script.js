const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const allBtn = document.querySelector(".all__lists");
const allComplatedBtn = document.querySelector(".all_complated");
const allUncomplatedBtn = document.querySelector(".all_uncomplated");
let todos = []

elList.addEventListener("click", (evt)=> {
    if(evt.target.matches(".delete-btn")) {
        let deleteUniquiId = evt.target.dataset.todoId;

        let findedItem = todos.findIndex((el) => el.id == deleteUniquiId);

        todos.splice(findedItem,1)
        // console.log(todos);
        appendToDom(todos,elList)
    } if(evt.target.matches(".js-input")) {
        let checkEdId = evt.target.dataset.todoId;

        let findedChecked = todos.find((el) => el.id == checkEdId); 
        findedChecked.isComplete = !findedChecked.isComplete;
        
        appendToDom(todos,elList)
    } 
})



const appendToDom = (array,node) => {
    elList.innerHTML = "";
    let count = 0;
    array.forEach((todo) => {
        let newItem = document.createElement("li");
        let newSpan = document.createElement("span");
        let newButton = document.createElement("button");
        let newInput = document.createElement("input");

        newSpan.textContent = todo.name;
        newButton.textContent = `Delete`;
        newInput.type = "checkbox";
        newButton.dataset.todoId = todo.id; 
        newInput.dataset.todoId = todo.id; 
        allBtn.dataset.todoId = todo.id;    
        // allBtn.textContent = `All ${todo.id + 1}`
        allUncomplatedBtn.dataset.todoId = todo.id;    
        // allUncomplatedBtn.textContent = `Uncomplated ${todo.id + 1}`
        newButton.setAttribute("class", "delete-btn");
        newInput.setAttribute("class", "js-input");
        newItem.setAttribute("class","li__box")
        newItem.appendChild(newInput)
        newItem.appendChild(newSpan)
        newItem.appendChild(newButton)
        node.appendChild(newItem)

        if(todo.isComplete) {
            newSpan.style.textDecoration = "line-through"
            newInput.checked = true;
            count++;
        }
        allBtn.textContent = array.length;
        allComplatedBtn.textContent = count;
        allUncomplatedBtn.textContent = array.length - count;
    })
}

let message = document.querySelector(".msg")

elForm.addEventListener("submit", (evt)=> {
    let elInputVal = elInput.value;
    elList.innerHTML = ""
    evt.preventDefault()

    if(elInputVal == "" || elInputVal == null) {
        message.textContent = "Iltmos malumot kirgizing) hamma malumotlaringiz saqlangan malumont kirgasangiz kora olasiz"
        message.classList.add("active")
        return;
    }else {
        message.textContent = ""
        message.classList.remove("active")
    }

    let obj = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 0,
        name: elInputVal,
        isComplete: false,
    }

    todos.push(obj);
    // console.log(todos);
    appendToDom(todos,elList)
    
    elInput.value = ""
})