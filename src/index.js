const DOGS_URL = "http://localhost:3000/dogs"
const tableEl = document.querySelector('table')
const formEl = document.querySelector('#dog-form')

document.addEventListener('DOMContentLoaded', () => {
    displayDogs()
})

function fetchDogs() {
    return fetch(DOGS_URL)
        .then(res => res.json())
}

function writeDog(dog) {
    const dogEl = document.createElement('tr')
    dogEl.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td>
            <button>Edit Dog</button>
        </td>`
    const btnEl = dogEl.querySelector('button')
    btnEl.addEventListener('click', () => {
        fillForm(dog)
        addFormEvent(dog) 
    })
    tableEl.append(dogEl)
}

function writeDogs(dogs) {
    for (const dog of dogs) { writeDog(dog)}
}

function displayDogs() {
    tableEl.innerHTML = ''
    fetchDogs()
        .then(writeDogs)
}

function fillForm(dog) {
    formEl.name.value = dog.name
    formEl.breed.value = dog.breed
    formEl.sex.value = dog.sex
}

function addFormEvent(dog) {
    formEl.addEventListener('submit', event => {
        event.preventDefault()
        updateDogLocal(dog)
        formEl.reset()
        updateDogServer(dog)
            .then(displayDogs)
    })
}

function updateDogLocal(dog) {
    dog.name = formEl.name.value
    dog.breed = formEl.breed.value 
    dog.sex = formEl.sex.value 
}

function updateDogServer(dog) {
    const url = (DOGS_URL + `/${dog.id}`)
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)}
    return fetch(url, options)
        .then(res => res.json())
}



