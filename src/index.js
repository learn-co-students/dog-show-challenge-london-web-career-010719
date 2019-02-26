//==== Set Global & State Variables====//
const dogTableEl = document.querySelector('#table-body')
const dogFormEl = document.querySelector('#dog-form')
let state_dogs = []
let state_selectedDog = undefined
let state_create = true

//==== Set inital state ====//
document.addEventListener('DOMContentLoaded', () => {
    initialize()
})
function initialize(){
    getDogs().then(dogs => {
        state_dogs = dogs
        drawDogRows(dogs)
        addFormSubmitListener()
        addFormClearListener()
    })
}

//==== Attach Listeners ====//
function addFormSubmitListener(){
    dogFormEl.addEventListener('submit', (e)=>{
        e.preventDefault()
        state_create ? addDog() : editDog()
        resetFormState()
    })
}
function addFormClearListener(){
    document.querySelector('#clear-form').addEventListener('click', ()=>{
        resetFormState()
    })
}

//==== CRUD Operations (state + server) ====//
// promises used to ensure server and state are in sync and async functions 
// work as expected

//removes dog from the server, edits state to match then removes dog row
function removeDog(dog) {
    deleteDog(dog)
        .then(() => {
            state_dogs = state_dogs.filter(dogItem => dogItem.id !== dog.id)
            removeDogRow(dog)
        })
}
//adds dog to server, edits state to match then draws new row
function addDog() {
    const newDog = {name: dogFormEl.name.value, breed: dogFormEl.breed.value, sex: dogFormEl.sex.value}
    if (newDog.name === '' || newDog.breed === '' || newDog.sex === ''){
        alert('name, breed & sex must all be present to create dog')
        throw('name, breed & sex must all be present to create dog')
    }
    createDog(newDog)
        .then(dog => {
            state_dogs.push(dog)
            drawDogRow(dog)
        })
}
//edit a dog on the server
function editDog() {
    if (state_selectedDog === undefined) { throw ('a dog must be selected') }
    updateLocalDog(state_selectedDog)
    updateDog(state_selectedDog)
        .then(dog => updateDogRow(dog))
}
//update a dog in state (local)
function updateLocalDog(dog) {
    dog.name = dogFormEl.name.value
    dog.breed = dogFormEl.breed.value
    dog.sex = dogFormEl.sex.value
}

//==== Helper Functions ====//
//rests main form inputs and clears operation user was performing
function resetFormState(){
    document.querySelector('#dog-form-title').innerText = 'Create a New Dog'
    state_selectedDog = undefined
    state_create = true
    dogFormEl.reset()
}
//fill the edit form with dogs details to allow editing
function populateEditDog(dog){
    state_create = false //set state to not create
    document.querySelector('#dog-form-title').innerText = `Edit ${dog.name}`
    dogFormEl.name.value = dog.name
    dogFormEl.breed.value = dog.breed
    dogFormEl.sex.value = dog.sex
    state_selectedDog = dog
}
//functions to handle row manipulation
const dogRowHTML = dog => `<td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td><td><button>📝</button></td><td><button>🗑</button></td>`
const updateDogRow = dog => dogTableEl.querySelector(`tr[data-dog-id="${dog.id}"]`).innerHTML = dogRowHTML(dog)
const removeDogRow = dog => dogTableEl.querySelector(`tr[data-dog-id="${dog.id}"]`).remove()

//===== DRAWING FUNCTIONS ====//
//draws a single row inthe table for a dog object including event handling
function drawDogRow(dog) {
    const dogRowEl = document.createElement('tr')
    dogRowEl.dataset.dogId = dog.id
    dogRowEl.innerHTML = dogRowHTML(dog)
    dogRowEl.querySelectorAll('button')[0].addEventListener('click', () => {
        populateEditDog(dog)
    })
    dogRowEl.querySelectorAll('button')[1].addEventListener('click', () => {
        removeDog(dog)
    })
    dogTableEl.appendChild(dogRowEl)
}
//draws a row per dog
const drawDogRows = dogs => {
    for (const dog of dogs) {
        drawDogRow(dog)
    }
}