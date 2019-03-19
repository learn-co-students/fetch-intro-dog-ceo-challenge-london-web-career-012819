console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const pics = []
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogs = []

const imageContainer = document.getElementById('dog-image-container')
const dogsUl = document.getElementById('dog-breeds')
const dropDown = document.getElementById('breed-dropdown')

function dropDownOption() {
  dropDown.addEventListener('change', () => {
    console.log(filterDogs(dropDown.value))
    dogsUl.innerHTML = ''
    let lovely = filterDogs(dropDown.value).map(dog =>`<li>${dog}</li>`).join('')
    dogsUl.innerHTML += lovely
  })
}

function filterDogs(letter) {
  return dogs.filter(dog => dog[0] === letter)
}

function changeTextColor() {
  document.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
	     event.target.style.color = 'blue';
    }
  })
}

function getBreeds() {
  return fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => Object.keys(breeds.message).forEach(dag => {
	dogs.push(dag)
  }))
}

function addDogs() {
  let dogsList = dogs.map(dog =>`<li>${dog}</li>`).join('')
  dogsUl.innerHTML = dogsList
}

function getPics() {
  return fetch(imgUrl)
    .then(resp => resp.json())
    .then(photos => photos.message.forEach(photo => {
      pics.push(photo)
    }))
}

function addPics() {
  pics.forEach(pic =>{
    let img = document.createElement('img')
    img.src = pic
    imageContainer.appendChild(img)
  })
}

function initialize() {
  getPics().then(addPics)
  getBreeds()
    .then(addDogs)
}

initialize()
changeTextColor()
dropDownOption()
