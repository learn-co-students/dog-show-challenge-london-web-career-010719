document.addEventListener('DOMContentLoaded', () => {

})

const nameInput = document.querySelector("#name-input")
const breedInput = document.querySelector("#breed-input")
const sexInput = document.querySelector("#sex-input")
const dogForm = document.querySelector("#dog-form")
const dogTableEl = document.querySelector("#table-body")

const state ={
  dogs: [],
  selectedDog: ""
}

initialize()

function initialize(){
  getDogs()
    .then(dogs =>{
      state.dogs = dogs
      addDogRows(dogs)
    })
}

function addDogToTable(dog){
const dogRowEl = document.createElement('tr')
   dogRowEl.innerHTML = `
   <td>${dog.name}</td>
   <td>${dog.breed}</td>
   <td>${dog.sex}</td>
   <td>
       <button>Edit</button>
   </td>`
   dogTableEl.appendChild(dogRowEl)

   dogRowEl.addEventListener('click', () => displayDogInfo(dog))
}

function addDogRows(dogs){
   for (const dog of dogs){
       addDogToTable(dog)
   }
}


function displayDogInfo(dog){
clearDogInfo()
state.selectedDog = dog
nameInput.value = dog.name
breedInput.value = dog.breed
sexInput.value = dog.sex
}

dogForm.addEventListener('submit', event => {
 event.preventDefault()
 if(state.selectedDog === ""){
   alert("You must select a dog first!")
 } else{
  state.selectedDog.name = nameInput.value
  state.selectedDog.breed = breedInput.value
  state.selectedDog.sex =  sexInput.value
    updateDogInfo(state.selectedDog)
 }
})


function updateDogInfo(dog){
   updateDogs(dog)
   while( dogTableEl.firstChild ){
 dogTableEl.removeChild( dogTableEl.firstChild );
   }
   addDogRows(state.dogs)
}

function clearDogInfo(){
dogForm.reset()
}

document.addEventListener('keydown', event=>{
if (event.key ==="Escape"){
  clearDogInfo()
}
})









































//
