
const images = [
    { "src": "./img/img1.jpg", "alt": "1 Nature" },
    { "src": "./img/img2.jpg", "alt": "2 Fjords" }, 
    { "src": "./img/img3.jpg", "alt": "3 Mountains" },
    { "src": "./img/img4.jpg", "alt": "4 Lights" }
];

//Creating variables, index = the current picture, bInainte, bInapoi = left & right buttons, 
//bilute = generating the dots menu
//biluta = tracks which dot is hovered

var bilute = document.querySelector(".meniu");
var bInainte = document.getElementById('inainte');
var bInapoi = document.getElementById('inapoi');
var index = 0;

//This is the mai funtion allowing you to browse & view pictures
function showImage(image){
    if (index < 0){//if index drops below 0, it'll reset to its max value
        document.getElementById('slide').src = images[images.length - 1].src;
        document.getElementById('slide').alt = images[images.length - 1].alt;
        index = images.length - 1;  
    }   
    else if (index === images.length){//if index exceeds max value, it'll reset to 0
        document.getElementById('slide').src = images[0].src;
        document.getElementById('slide').alt = images[0].alt;
        index = 0;
    }
    else{
        document.getElementById('slide').src = images[image].src;
        document.getElementById('slide').alt = images[image].alt;
    }
    
}
//This function creates the dots below the picture
function createBiluta(param){
    bilute.innerHTML = ''; //reset the menu element
    /*for (let i=0; i<images.length; i++){*/ //quick fix: let in loc de var
        //creating dots (bilute)
        for (var i=0; i<images.length; i++){
        var biluta = document.createElement('span');
        biluta.className = 'biluta';
        biluta.title = images[i].alt;
        bilute.appendChild(biluta);
        //making the dot active when its coresponding image is displayed
        if (i === param)
            biluta.classList.add('activ');
        //adding click events for dots
        /*biluta.addEventListener('click', () => {
            console.log(i,index);
            createBiluta(i);
            showImage(i);
            console.log("He clicked biluta number:"+i);
        }); */ //este varianta cu let, fara factory
        biluta.addEventListener('click', bilutaClick(i));
    }
    index = param;
}

function bilutaClick (index){
    return () => {
        createBiluta(index);
        showImage(index);
    }
}

window.addEventListener("load", ()=> {
    showImage(index);
    createBiluta(index);
});

bInainte.addEventListener("click", ()=> {
    showImage(++index);
    createBiluta(index);
 } );

bInapoi.addEventListener("click", ()=> {
    showImage(--index);
    createBiluta(index);
 } );

