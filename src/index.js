const imgAPI = 'https://dog.ceo/api/breeds/image/random/4'
const breedAPI = 'https://dog.ceo/api/breeds/list/all'

const getDogs = (url) => {
    return fetch(url)
    .then(response => response.json())
};

const arr = []
getDogs('https://dog.ceo/api/breeds/list/all').then(breed => {
    for(const key in breed.message){
        arr.push(key)
    }})


const createImages = (imageSrc) => {
    let imageContainer = document.getElementById('dog-image-container')
    let imageEl = document.createElement('img')
        imageEl.src = imageSrc
        imageEl.style = "height: 150px"
        imageContainer.appendChild(imageEl)
}

const createListItems = (breedSrc) => {
    let breedList = document.getElementById('dog-breeds')
    let breedItem = document.createElement('li')
        breedItem.innerText = breedSrc
        breedList.appendChild(breedItem)
}

const renderImageContainer = () =>{
    getDogs(imgAPI)
    .then(dogs => dogs.message.forEach(dog => {
        createImages(dog)
    }))
}

const renderBreedList = () => {
    getDogs(breedAPI)
    .then(breeds => {for(const key in breeds.message){
        createListItems(key)
    }})
}

const colorChange = () => {
    document.getElementById('dog-breeds').addEventListener('click', function(event){
		event.target.style.color = 'blue';
    })
}

const findByChar = () => {
    document.getElementById('breed-dropdown').addEventListener('change', function(event){
        breedList = document.getElementById('dog-breeds')
        breedList.innerHTML = ""
        for(const element of arr){
            if(element.charAt(0) === event.target.value){
                createListItems(element)
            }
        }
    })
}


window.addEventListener('DOMContentLoaded', function(){
    renderImageContainer()
    renderBreedList()
    colorChange()
    findByChar()
})

// document.getElementById('breed-dropdown').addEventListener('change', function(event){
// 	breedList = document.getElementById('dog-breeds')
// 	breedList.innerHTML = ""
	
// })