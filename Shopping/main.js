//listening for Enter or submit buttons for the initial input
var inputKey = document.getElementById("shop");
var inputButton = document.getElementById("add");
var ulInitial = document.getElementById("lista");
var ulFinal = document.getElementById("fin")
var text = "";
//creating the initial llist items with their buttons
function createInitialList() {
    var ulElem = document.createElement("li");
    var butSubmit = document.createElement("button");
    var butEdit = document.createElement("button");
    var butDelete = document.createElement("button");
    ulElem.innerText = text;
    butSubmit.innerText = "Submit";
    butEdit.innerText = "Edit";
    butDelete.innerText = "Delete";
    ulInitial.appendChild(ulElem);
    ulElem.appendChild(butSubmit);
    ulElem.appendChild(butEdit);
    ulElem.appendChild(butDelete);
    //butSubmit.addEventListener("click", submitFinal(this.innerText.value));
    butDelete.addEventListener("click", (ev) => {
        console.log (ev.target.querySelectorAll("ul"));
        ev.currentTarget.removeChild(ev.target);
    });
    //butEdit.addEventListener("click", editMe);
    //console.log(text);
}
//get the input field value and check if Enter was pressed. If so, add input value as a new list element
inputKey.addEventListener("keypress", (event)=> {
    if (event.keyCode === 13 || event.which === 13){
        createInitialList();
        text = "";
        inputKey.value = "";
    }
    else
        text = text + event.key;
});
//Create the list element after click is pressed on the Add button
inputButton.addEventListener("click", () =>{
   createInitialList();
   text = "";
   inputKey.value = "";
});
//Creating the function that appends a child to the final list
function submitFinal(text) {
    var elemArray = Array.from(document.querySelectorAll("#fin li"));
    var finalElem = document.createElement("li");
    finalElem.innerText = text;
    elemArray.push(finalElem);
    elemArray.forEach((element) => {
        ulFinal.appendChild(element);
    });
    console.log(text);
}