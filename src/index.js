console.log('%c HI', 'color: firebrick')

let allBreeds = []
const dropdown = document.getElementById("breed-dropdown")
const dogBreedsId = document.getElementById('dog-breeds')

function fetchImages() {

  return fetch("https://dog.ceo/api/breeds/image/random/4")
      .then(response => response.json())
      .then(json => loopOverImages(json.message))

}

function loopOverImages(images) {
  for (const image of images) {
    addToHTML(image)
  }
}

function addToHTML(image) {
  const imageDiv = document.getElementById('dog-image-container')
  const imageTag = document.createElement('img')
  imageTag.src = image
  imageDiv.appendChild(imageTag)
}

function fetchDogBreeds() {

  return fetch("https://dog.ceo/api/breeds/list/all")
      .then(response => response.json())
      .then(function(json) {
        const breeds = Object.keys(json.message)
        allBreeds = breeds
        return loopOverBreeds(breeds)
      })

}

function loopOverBreeds(breeds) {
  while (dogBreedsId.hasChildNodes()) {
    dogBreedsId.removeChild(dogBreedsId.lastChild);
  }

  breeds.forEach (breed => addBreedToHTML(breed))
}

function addBreedToHTML(breed) {

  const listItem = document.createElement('li')
  listItem.innerText = breed
  addEventListenerToBreed(listItem)
  dogBreedsId.appendChild(listItem)
}

function addEventListenerToBreed(listEl) {
  listEl.addEventListener("click", function(event) {
    event.target.style.color = "blue"
  })
}

function addDropDownEvent() {
  dropdown.addEventListener("change", function(event) {
    filter()
  })
}

function filter() {

  let selectedValue = dropdown.options[dropdown.selectedIndex].value

  if (selectedValue === "a") {
    getBreedsByLeter(selectedValue)
  } else if (selectedValue === "b") {
    getBreedsByLeter(selectedValue)
  } else if (selectedValue === "c") {
    getBreedsByLeter(selectedValue)
  } else if (selectedValue === "d") {
    getBreedsByLeter(selectedValue)
  }
}

function getBreedsByLeter(firstLeter) {
  let filteredBreeds = []
  for (const breed of allBreeds) {
    if (breed[0] === firstLeter) {
      filteredBreeds.push(breed)
    }
  }

  loopOverBreeds(filteredBreeds)
}

fetchImages()
fetchDogBreeds()
addDropDownEvent()
