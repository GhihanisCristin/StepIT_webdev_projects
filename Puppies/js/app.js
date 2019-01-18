/**
 * Endpoint-uri Dog API:
 * imagine random: https://dog.ceo/api/breeds/image/random
 * toate rasele: https://dog.ceo/api/breeds/list
 * imagine random dintr-o rasa anume: https://dog.ceo/api/breed/{hound}/images/random
 */

// ------------------------------------------
//  Referinte la Elementele HTML pe care le vom folosi in cod
// ------------------------------------------

const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

// PAS 1: exploreaza in consola un response HTTP de la server:
//   - functionalitatea de baza a metodei fetch(), 
//   - cum gestionam un Response cu metoda .then(),
//   - parsarea unui string JSON cu metoda Response.json()   
fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(data => generateImage(data.message));
                
// PAS 2: obtine o imagine random (https://dog.ceo/api/breeds/image/random) 
// Apeleaza functia generateImage(), care afiseaza raspunsul in <div>  
function generateImage(cale){
    var image = document.createElement('img');
    image.id = "Random Dog";
    image.src = cale;
    image.alt = "alt";
    //console.log(image.src);
    card.appendChild(image);
}


// PAS 3: obtine o lista de rase de caini (https://dog.ceo/api/breeds/list)
// Apeleaza functia generateOptions(), care afiseaza raspunsul in <select> 
fetch("https://dog.ceo/api/breeds/list")
    .then(res => res.json())
    .then(data => generateOptions(data.message));

function generateOptions(options){
    options.forEach(element => {
        var addOption = document.createElement("option");
        addOption.textContent = element;
        breeds.appendChild(addOption);
    });
};

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

// PAS 4: la schimbarea optiunii din <select> afiseaza o imagine din rasa selectata
breeds.addEventListener("change", (event) => {
    card.removeChild(card.firstChild);
    var path = "https://dog.ceo/api/breed/" + event.target.value + "/images/random";
    fetch(path)
    .then(res => res.json())
    .then(data => generateImage(data.message));
});

// PAS 5: la click in interiorul <div>-ului afiseaza alta imagine din rasa selectata
card.addEventListener("click", () =>{
    card.removeChild(card.firstChild);
    var path = "https://dog.ceo/api/breed/" + breeds.value + "/images/random";
    fetch(path)
    .then(res => res.json())
    .then(data => generateImage(data.message));
});
// PAS 6: Creati o functie fetchData(url) care sa automatizeze primii doi pasi dintr-un request 
// (trimiterea request-ului si parsarea raspunsului JSON)


// PAS 7 - atasati cu metoda .catch() un handler care sa afiseze in consola un mesaj custom de eroare 
// si eroarea primita de la server. Ca sa va asigurati ca functioneaza, schimbati url-ul catre care
// trimiteti request-ul cu unul gresit.


// PAS 8 - integrati primele doua comenzi .fetch() intr-o singura comanda Promise.all()



// ------------------------------------------
//  POST DATA
// ------------------------------------------


// PAS 9 - Transmiteti datele completate in formular printr-un request POST, catre https://jsonplaceholder.typicode.com/posts 
// Printati in consola raspunsul primit de la server, impreuna cu un mesaj custom.  


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// generateImage(src, alt)
// Functie custom, care afiseaza o imagine in interiorul <div>-ului  


// generateOptions(data)
// Functie custom, care completeaza optiunile din <select>


