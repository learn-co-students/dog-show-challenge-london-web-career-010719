
const url = 'http://localhost:3000/dogs'
const tableBodyEl = document.querySelector('#table-body')
const formEl = document.querySelector('#dog-form')
const formNameEl = document.querySelectorAll('input')[0]
const formBreedEl = document.querySelectorAll('input')[1]
const formSexEl = document.querySelectorAll('input')[2]



const state = {

    currentDog: {},

    dogs: []
};


document.addEventListener('DOMContentLoaded', () => {
    apiCall()
})


function createDog (dog){
    const tableRowEl = document.createElement('tr')
    tableRowEl.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> `

    const editButtonEl = document.createElement('button')
    editButtonEl.innerText = "Edit"

    tableRowEl.appendChild(editButtonEl)
    tableBodyEl.appendChild(tableRowEl)

    editButtonEl.addEventListener('click', () => {
        editDog(dog)
    });

};

function createDogs(dogs){
    tableBodyEl.innerHTML = ''
     dogs.forEach(
        dog => createDog(dog)
    )};

    
function editDog(dog){
    formEl.reset()
    formNameEl.value = dog.name
    formBreedEl.value = dog.breed
    formSexEl.value= dog.sex
    state.currentDog = dog
    };



 formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    state.currentDog.name = formNameEl.value
    state.currentDog.breed = formBreedEl.value
    state.currentDog.sex = formSexEl.value
    createDogs(state.dogs)
    updateDog(state.currentDog)
    state.currentDog = {}
    formEl.reset()
});

function apiCall (){
    fetch(url)
      .then(resp => resp.json()) 
       .then(dogs => {createDogs(dogs)
            state.dogs = dogs})
};
        




function updateDog(dog) {
    return fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }).then(resp => resp.json())
}
