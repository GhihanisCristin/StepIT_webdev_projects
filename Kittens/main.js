var selectContainer = document.getElementById("breedSelect");
var imageContainer = document.getElementById("kittenPic");
var sideBreedData = document.getElementById("breedInfo");
var selectCategoryContainer = document.getElementById("categorySelect");
var imageCategoryContainer = document.getElementById("kittenPicbyCategory");

//Getting a random cat image and populating options for Select with breeds names
function getBreeds(){
    return fetch("https://api.thecatapi.com/v1/breeds", {
        method: "GET",
        mode: "cors",
        headers: {
        "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
        }
    })
        .then(res => res.json())
};

function getCategories(){
    return fetch("https://api.thecatapi.com/v1/categories", {
        method: "GET",
        mode: "cors",
        headers: {
        "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
        }
    })
        .then(res => res.json())
};

function getPic(){
    return fetch("https://api.thecatapi.com/v1/images/search", {
        method: "GET",
        mode: "cors",
        headers: {
        "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
        }
    })
    .then(res => res.json())
};

getCategories().then(data => {
    //console.log(data);
    populateCategorySelection(data);
});

getBreeds().then(data => {
    //console.log(data[0].name, data[0].adaptability, data.length);
    populateSelection(data);
});

getPic().then(data => {
    //console.log(data[0].url);
    displayPic(data);
});

function displayPic(object){
    //console.log(object[0]);
    var image = document.createElement("img");
    image.id = "randomCat";
    image.src = object[0].url;
    image.alt = "Nice kitty";
    imageContainer.appendChild(image);
};

function populateSelection(array){
    array.forEach(element => {
        var selectOption = document.createElement("option");
        selectOption.textContent = element.name;
        selectOption.value = element.id;
        selectContainer.appendChild(selectOption);
    });
};

function populateCategorySelection(array){
    array.forEach(element => {
        var selectOption = document.createElement("option");
        selectOption.textContent = element.name;
        selectCategoryContainer.appendChild(selectOption);
    });
};
//Clicking on a pic will randomly get another pic for that breed. We will also update the breed info side
/*
"origin":"Egypt"
"weight_imperial":"7  -  10",
"adaptability":5,
"affection_level":5,
"child_friendly":3,
"dog_friendly":4,
"energy_level":5,
"grooming":1,
"health_issues":2,
"intelligence":5,
"shedding_level":2,
"social_needs":5,
"stranger_friendly":5,
"vocalisation":1*/
function drawStars(value){
    var string='';
    for(var i=0;i<value;i++)
        string += "*";
    return string;
};
function putBreedinfo(object){
    //sideBreedData.innerHTML='';
    while (sideBreedData.childNodes.length > 2) {
        sideBreedData.removeChild(sideBreedData.lastChild);
    }
    sideBreedData
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Origin: " + object.origin;                
    sideBreedData.appendChild(sideBreedDataItem);
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Weight: " + object.weight_imperial + " pounds";                
    sideBreedData.appendChild(sideBreedDataItem);
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Affection: " + drawStars(object.affection_level);                
    sideBreedData.appendChild(sideBreedDataItem);
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Child Friendly: " + drawStars(object.child_friendly);                
    sideBreedData.appendChild(sideBreedDataItem);
    var sideBreedDataItem = document.createElement("li");                            
    sideBreedDataItem.textContent = "Intelligence " + drawStars(object.intelligence);                
    sideBreedData.appendChild(sideBreedDataItem);
};

selectContainer.addEventListener("change", (event) => {
    imageContainer.removeChild(imageContainer.firstChild);
    getBreeds().then(data => {
        data.forEach(elem =>{
            if (elem.name === event.target.value){
                putBreedinfo(elem);
                //console.log("https://api.thecatapi.com/v1/images/search?breed_id="+elem.id);
                fetch("https://api.thecatapi.com/v1/images/search?breed_id="+elem.id, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                    "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
                    }
                })
                    .then(res => res.json())
                    .then(data => displayPic(data))                             
            }
        });
    });
});

imageContainer.addEventListener("click", () =>{
    imageContainer.removeChild(imageContainer.firstChild);
    getBreeds().then(data => {
        data.forEach(elem =>{
            if (elem.name === selectContainer.value){
                //console.log("https://api.thecatapi.com/v1/images/search?breed_id="+elem.id);
                fetch("https://api.thecatapi.com/v1/images/search?breed_id="+elem.id, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                    "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
                    }
                })
                    .then(res => res.json())
                    .then(data => displayPic(data))                             
            }
        });
    });
});
// fetch by category & limit 5: https://api.thecatapi.com/v1/images/search?limit=5&category_ids=1
function putCategoriesPictures(object){
    //console.log(object);
    object.forEach((elem) =>{
        var imageCategory = document.createElement("img");
        imageCategory.src = elem.url;
        imageCategoryContainer.appendChild(imageCategory);
    })
};

selectCategoryContainer.addEventListener("change", (event) => {
    while (imageCategoryContainer.childNodes.length > 0) {
        imageCategoryContainer.removeChild(imageCategoryContainer.lastChild);
    }
    getCategories().then(data => {
        data.forEach(elem =>{
            if (elem.name === event.target.value){
                //console.log("https://api.thecatapi.com/v1/images/search?breed_id="+elem.id);
                fetch("https://api.thecatapi.com/v1/images/search?limit=5&category_ids="+elem.id, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                    "x-api-key": "8b7a9ba3-b98b-4c7d-90b8-080251ad7512",
                    }
                })
                    .then(res => res.json())
                    .then(data => putCategoriesPictures(data))                             
            }
        });
    });
});
// Cum se poate optimiza foarte bine: in option (child al select) pot stoca si element.id in atributul value
// Adica, option se poate construi in felul urmator: <option value = "element_id">element_name</option>
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

//add a search input that scand a breed oject for all matches.
//for search input, start scanning after at least 3 key inputs. Add an event listener for text input
//populate all images that matches the search criteria

var searchBreed = document.getElementById("searchText");
var breedObject = getBreeds().then(data => breedObject = data);
var defaultUrl = "https://api.thecatapi.com/v1/images/search?breed_id=";
var urlArray = [];
//HTML extended for an input text field used to search breeds + another div to put the pictures in
//CSS also extended for the div above
//Adding the event to monitor the search values
searchBreed.addEventListener("keyup", () => {
    //console.log("Do we have the correct value?" + searchBreed.value);
    if (searchBreed.value.length >= 3)
        dynamicSearch(searchBreed.value);
        //console.log(breedObject);
        //console.log("I'm triggered if there are at least 3 characters");
});
//dynamic search is called when we have a string to match and if we do, we'll create a url array
//We'll use the url arrat to call fetches and generate images
function dynamicSearch(text){
    breedObject.forEach((elem) => {
        //console.log(elem.name);
        if (elem.name.includes(text))
            urlArray = urlArray + elem.id;
            console.log(elem.id + " " + urlArray);
    })
};