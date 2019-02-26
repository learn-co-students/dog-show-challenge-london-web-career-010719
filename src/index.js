//==== Set Global Variables ====//
const dogTableEl = document.querySelector('#table-body')
const dogFormEl = document.querySelector('#dog-form')
const state = {dogs: [], selectedDog: undefined, create: true}

//==== Set inital state ====//
document.addEventListener('DOMContentLoaded', () => {
    initialize()
})
function initialize(){
    getDogs().then(dogs => {
        state.dogs = dogs
        drawDogRows(dogs)
        addFormSubmitListener()
        addFormClearListener()
    })
}

//==== Attach Listeners ====//
function addFormSubmitListener(){
    dogFormEl.addEventListener('submit', (e)=>{
        e.preventDefault()
        //create or edit a dog dependent on state
        state.create ? addDog() : editDog()
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

//removes dog from the server and then edits state to match
function removeDog(dog) {
    deleteDog(dog)
        .then(() => {
            state.dogs = state.dogs.filter(dogItem => dogItem.id !== dog.id)
            dogTableEl.innerHTML = ''
            drawDogRows(state.dogs) //redraw table with dogs in state
        })
}
//adds dog to server and then edits state to match
function addDog() {
    const newDog = {
        name: dogFormEl.name.value,
        breed: dogFormEl.breed.value,
        sex: dogFormEl.sex.value
    }
    createDog(newDog)
        .then(dog => {
            state.dogs.push(dog)
            resetPageState()
        })
}
//edit a dog on the server and store - if server operation fails throw error
function editDog() {
    if (state.selectedDog === undefined) { throw ('a dog must be selected') }
    updateLocalDog(state.selectedDog)
    updateDog(state.selectedDog)
        .then(success => {
            if (success) {
                resetPageState()
            } else {
                throw ('update failed')
            }
        })
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
    document.querySelector('#dog-form-title').innerText = `Create a New Dog`
    state.selectedDog = undefined
    state.create = true
    dogFormEl.reset()
}
//resets form and redraws the dog table
function resetPageState() {
    resetFormState()
    dogTableEl.innerHTML = ''
    drawDogRows(state.dogs) //redraw table with dogs in state
}
//fill the edit form with dogs details to allow editing
function populateEditDog(dog){
    state.create = false //set state to not create
    document.querySelector('#dog-form-title').innerText = `Edit ${dog.name}`
    dogFormEl.name.value = dog.name
    dogFormEl.breed.value = dog.breed
    dogFormEl.sex.value = dog.sex
    state.selectedDog = dog
}

//===== DRAWING FUNCTIONS ====//
//draws a single row inthe table for a dog object including event handling
function drawDogRow(dog) {
    const dogRowEl = document.createElement('tr')
    dogRowEl.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button>📝</button></td>
    <td><button>🗑</button></td>`
    const dogEditBtnEl = dogRowEl.querySelectorAll('button')[0]
    dogEditBtnEl.addEventListener('click', () => {
        populateEditDog(dog)
    })
    const dogDelBtnEl = dogRowEl.querySelectorAll('button')[1]
    dogDelBtnEl.addEventListener('click', () => {
        removeDog(dog)
    })
    dogTableEl.appendChild(dogRowEl)
}
//draws a row per dog
function drawDogRows(dogs) {
    for (const dog of dogs) {
        drawDogRow(dog)
    }
}