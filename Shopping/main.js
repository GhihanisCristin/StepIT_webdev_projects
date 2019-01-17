//listening for Enter or submit buttons for the initial input
var inputKey = document.getElementById("shop");
var inputButton = document.getElementById("add");
var ulInitial = document.getElementById("lista");
var ulFinal = document.getElementById("fin")
var text = "";
var onceClicked = true;
//creating the initial llist items with their buttons
function createInitialList() {
    var ulElem = document.createElement("li");
    var span = document.createElement("span");
    var butSubmit = document.createElement("button");
    var butEdit = document.createElement("button");
    var butDelete = document.createElement("button");
    span.innerText = text;
    butSubmit.innerText = "Submit";
    butEdit.innerText = "Edit";
    butDelete.innerText = "Delete";
    ulInitial.appendChild(ulElem); //li is appended as a child to the initial ul
    ulElem.appendChild(span); //add a span to have a reference to the text. We'll need this for edit button
    ulElem.appendChild(butSubmit); //each button is a chils for the li above
    ulElem.appendChild(butEdit);
    ulElem.appendChild(butDelete);
	//Adding event listeners for each button
    butSubmit.addEventListener("click", (ev) => { 
		submitFinal(ev.target.parentNode);
		ev.target.parentNode.parentNode.removeChild(ev.target.parentNode);
	});
    butDelete.addEventListener("click", (ev) => {
        //console.log (ev.target.parentNode);
        ev.target.parentNode.parentNode.removeChild(ev.target.parentNode);
    });
    butEdit.addEventListener("click", (ev) => {
        if (onceClicked){
            editMe(ev.target.parentNode);
        }

	});
    //console.log(text);
}
//get the input field value and check if Enter was pressed. If so, add input value as a new list element
inputKey.addEventListener("keypress", (event)=> {
    if (event.keyCode === 13 || event.which === 13){
        text = inputKey.value;
        //console.log(text);
        createInitialList();
        text = "";
        inputKey.value = "";
    }
});
//Create the list element after click is pressed on the Add button
inputButton.addEventListener("click", () =>{
   text = inputKey.value;
   createInitialList();
   text = "";
   inputKey.value = "";
});
//Creating the function that appends a child to the final list
function submitFinal(elementF) { //elementF is passed from event listener and has the element we need to add in the final list and remove it from the initial one
    var elemArray = Array.from(document.querySelectorAll("#fin li")); //The array containing the whole final list elements
    var finalElem = document.createElement("li");
    finalElem.innerText = elementF.firstChild.textContent; //creating the node that will be added to the final list
    elemArray.push(finalElem); //appending the element above to the array
	elemArray.sort(function(el1,el2) { //sorting the array alphabetically 
		if ( el1.innerText > el2.innerText)
			return 1;
		else 
			return -1;
	});
	//console.log(elemArray);
	ulFinal.value = ""; //Clearing the final list to get the new elements
    elemArray.forEach((element) => { //adding each oredered array element as a new element in the final list
        ulFinal.appendChild(element);
    });
    //console.log(elementF.firstChild.nodeValue);
}
//Creating the function that edits inline an element from the initial list
function editMe(elemM){
    //Creating an input field to replace the edited element
    var span = elemM.firstChild;
    //console.log (elemM.firstChild); //just checking if I got it right :)
	var inputEdit = document.createElement("input");
	inputEdit.type = "text";
    inputEdit.value = span.textContent;
    //console.log(span.textContent); // All preps are done
    inputEdit.style.display = "inline";
    elemM.removeChild(span);
    elemM.insertBefore(inputEdit, elemM.firstChild);
    inputEdit.addEventListener("keypress", (event)=> {
        if (event.keyCode === 13 || event.which === 13){
            span.textContent = inputEdit.value;
            elemM.removeChild(inputEdit);
            elemM.insertBefore(span,elemM.firstChild);
            onceClicked = true;
        }
        span.style.display = "inline";
    });
	onceClicked = false;
}