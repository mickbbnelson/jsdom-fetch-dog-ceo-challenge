console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    fetchImage()
    fetchBreeds()
})   /* Listens for the DOM to be loaded before handling our code.  
    Has to be loaded to handle JS can also defer the source on html. 
    Good strategy is to just call your functions in here instead of writing all your code in here.*/

function fetchImage(){
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"  /* can also just add the URL to the fetch request rather than using a variable. */
fetch(imgUrl)           /*returns a promise because it taes time to load.  The rest of the method hinges on whether the promise is fulfilled or not */
.then(response => response.json())
.then(data => displayImage(data["message"])) /* Allows us to display desired data */
}

function displayImage(data){
    const divImage = document.getElementById("dog-image-container")     /*pulls the correct container */
    data.forEach((image) => {
        divImage.innerHTML += `<img src=${image} />`            /*iterates through the data array adding image source code to divImage  Note += adds and does not replace */
    })
}

/* to show how it would be handled with append.

function displayImage(data){
    const divImage = document.getElementById("dog-image-container")     
    data.forEach((image) => {
        const img = document.createElement('img') 
        img.src = image;
        divImage.appendChild(img)    
    })
} */

function fetchBreeds(){
    const breedUrl = "https://dog.ceo/api/breeds/list/all"
    fetch(breedUrl)
    .then(response => response.json())
    .then(dogs => breedDisplay(dogs["message"]))
}

function breedDisplay(dogs){
    for (dog in dogs){                  /* Use for/in loop to retreive dogs because we're iterating through objects */
       displayBreed(dog)                /*each dog is now represented by dog */
    }
    const select = document.getElementById("breed-dropdown");
    select.addEventListener("change", (event) => {
        const ul = document.getElementById("dog-breeds");
        ul.innerText = '';
        const letter = event.target.value;      /*targets the drop down and listens for a change, if the user selects a letter, it filters out breeds based on their first letter */
        for(dog in dogs){
            if(dog.charAt(0) === letter){
                displayBreed(dog)
            }
        }
    })

    function displayBreed(dog){
        const ul = document.getElementById("dog-breeds");
        const li = document.createElement("li");
        li.innerText = dog;         /*Assigns the each list item to each breed that is being sent in. */
        const ul2 = document.createElement("ul")
        ul.appendChild(li)
        for (type of dogs[dog]){
         const li2 = document.createElement('li')  
         li2.innerText = type;
         li.appendChild(ul2);
         ul2.appendChild(li2);        /*creates the nested list items */
         li.addEventListener('click',(event) => event.target.style.color = 'green')  /*allows the event to target list item */
        
        }
}
}






