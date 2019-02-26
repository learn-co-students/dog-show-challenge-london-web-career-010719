//// Set Global Variables ////
const baseURL = 'http://localhost:3000/dogs/'
const dogTableEl = document.querySelector('#table-body')
const state = {dogs: [], selectedDog: undefined}

//// Set inital state ////
document.addEventListener('DOMContentLoaded', () => {
    initialize()
})
function initialize(){
    getDogs().then(dogs => {
        state.dogs = dogs
        drawDogRows(dogs)
        addFormListener()
    })
}

//// HELPER FUNCTIONS ////
function addFormListener(){
    document.querySelector('#dog-form').addEventListener('submit', (e)=>{
        e.preventDefault()
        if (state.selectedDog === undefined) {
            throw ('a dog must be selected')
        } else {
            updateLocalDog(state.selectedDog)
            patchDog(state.selectedDog)
            state.selectedDog = undefined //reset state selected dog
            dogTableEl.innerHTML = ''
            drawDogRows(state.dogs) //redraw table with dogs in state
        }
    })
}
function updateLocalDog(dog) {
    const dogForm = document.querySelector('#dog-form')
    dog.name = dogForm.name.value
    dog.breed = dogForm.breed.value
    dog.sex = dogForm.sex.value
    dogForm.reset()
}

//// DRAWING FUNCTIONS ////
function drawDogRow(dog){
    const dogRowEl = document.createElement('tr')
    dogRowEl.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td>
        <button>📝</button>
    </td>`
    const dogEditBtnEl = dogRowEl.querySelector('button')
    dogEditBtnEl.addEventListener('click', () => {
        populateEditDog(dog)
    })
    dogTableEl.appendChild(dogRowEl)
}
function drawDogRows(dogs){
    for (const dog of dogs){
        drawDogRow(dog)
    }
}
function populateEditDog(dog){
    const dogForm = document.querySelector('#dog-form')
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex
    state.selectedDog = dog
}
