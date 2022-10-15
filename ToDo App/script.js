//select  elements in DOM
const  form = document.querySelector("#itemform");
const message = document.querySelector("#message");
const itemInput = document.querySelector("#item");
const itemsList = document.querySelector("#items");
const filters = document.querySelectorAll(".nav-item")

//create  an empty item list
let todoItems = []

// get items from Local storage
const getLocalStorage = ()=>{
    const toDoStorage = localStorage.getItem("todoItems");
    if(toDoStorage  === "undefined" || toDoStorage === null){
        todoItems = [];
    }else {
        todoItems = JSON.parse(toDoStorage);
    }
    console.log(todoItems);
    getList();
}
const getList = ()=>{
    itemsList.innerHTML = "";
    if(todoItems.length>0){
        todoItems.forEach((item)=>{
            let liTag = `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${item.name}</span>
            <span>
                <a href="#" data-done><i class="bi bi-check-circle green"></i></a>
                <a href="#" data-edit><i class="bi bi-pencil-square blue"></i></a>
                <a href="#" data-delete><i class="bi bi-x-circle red"></i></a>
            </span>
        </li>`
            itemsList.insertAdjacentHTML( "beforeend",liTag)   
            handleItem(item);
        })
    }else {

    }
}

const setLocalStorage = function (todoItems) {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

//delete item
const removeItem = function (item) {
    const removeIndex = todoItems.indexOf(item);
    todoItems.splice(removeIndex, 1);
}

//update function
const updateItem = function (currentItemIndex, value) {
    const newItem = todoItems[currentItemIndex];
    newItem.name = value;
    todoItems.splice(currentItemIndex, 1, newItem);
    setLocalStorage(todoItems);
}

//handle events on action buttons
const handleItem = function (itemData) {

  
    items.forEach((item) => {


        //done
        if (item.querySelector(".title").getAttribute('data-time') == itemData.addedAt) {
            item.querySelector('[data-done]').addEventListener('click', function (e) {
                e.preventDefault();

                const itemIndex = todoItems.indexOf(itemData);
                const currentItem = todoItems[itemIndex];

                const currentClass = currentItem.isDone
                    ? "bi-check-circle-fill"
                    : "bi-check-circle";

                currentItem.isDone = currentItem.isDone ? false : true;
                todoItems.splice(itemIndex, 1, currentItem);
                setLocalStorage(todoItems);

                const iconClass = currentItem.isDone
                    ? "bi-check-circle-fill"
                    : "bi-check-circle";

                this.firstElementChild.classList.replace(currentClass, iconClass);
                const filterType = document.querySelector("#tabValue").value;
                getItemsFilter(filterType);
            });


            //edit
            item.querySelector("[data-edit]").addEventListener("click", function (e) {
                e.preventDefault();
                itemInput.value = itemData.name;
                document.querySelector("#objIndex").value = todoItems.indexOf(itemData);
            });

            //delete
            item.querySelector("[data-delete]").addEventListener("click", function (e) {
                e.preventDefault();
                if (confirm("Are you sure you want to remove this item?")) {
                    itemsList.removeChild(item);
                    removeItem(item);
                    setLocalStorage(todoItems);
                    alertMessage("Item has been deleted", "alert-success");
                    return todoItems.filter((item) => item != itemData);
                }
            });
        }
    })
};

document.addEventListener("DOMContentLoaded", ()=>{
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const itemName = itemInput.value.trim();
        console.log(itemName);
        if(itemName.length === 0){
            alert("Please enter a task")
        }else {
            const item = {
                name:itemName,
                isDone:false,
                createdAt: new Date().getTime()
            }
            //console.log(item);
            todoItems.push(item);
            setLocalStorage(todoItems);
            
        } 
    })
    getLocalStorage();
   
})
