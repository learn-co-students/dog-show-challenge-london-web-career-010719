const tableBodyEl = document.querySelector('#table-body')
const formEl = document.querySelector('#dog-form')
let currentDog

document.addEventListener('DOMContentLoaded', () => {
    displayDogs()
    addFormEvent()
})

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
        currentDog = dog
    })
    tableBodyEl.append(dogEl)
}

function writeDogs(dogs) {
    for (const dog of dogs) { writeDog(dog) }
}

function displayDogs() {
    tableBodyEl.innerHTML = ''
    fetchDogs()
        .then(writeDogs)
}

function fillForm(dog) {
    formEl.name.value = dog.name
    formEl.breed.value = dog.breed
    formEl.sex.value = dog.sex
}

function addFormEvent() {
    formEl.addEventListener('submit', event => {
        event.preventDefault()
        updateDogLocal(currentDog)
        formEl.reset()
        updateDogServer(currentDog)
            .then(displayDogs)
            .then(currentDog = null)
    })
}

function updateDogLocal(dog) {
    dog.name = formEl.name.value
    dog.breed = formEl.breed.value
    dog.sex = formEl.sex.value
}