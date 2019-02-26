document.addEventListener('DOMContentLoaded', () => {
})

const table = document.querySelector('#table-body')
const form = document.querySelector('#dog-form')
const state = { dogs: []}



//This requires an argument of a complete dog object
function createDogEl(dog) {
    let dogTr = document.createElement('tr')
    dogTr.className = "dogDiv"
    dogTr.innerHTML = `
    <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td id="dogButton"><button>Edit</button></td>
    </tr>`
    dogTr.addEventListener('click', (event) => {
        if (event.target.innerText === 'Edit'){
            prefillForm(dog)}
        })
    return dogTr

}

function createList(dogs) {
    table.innerHTML = ''
    for (let i = 0; dogs.length > i; i++){
        let dog = createDogEl(dogs[i])
        table.append(dog)
    }
}

function prefillForm(dog) {
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    form.id.value = dog.id
}

document.addEventListener('submit', (event) => {
    event.preventDefault()
    let dog = {
        id: form.id.value,
        name: form.name.value, 
        breed: form.breed.value, 
        sex: form.sex.value
    }
    patchDog(dog)
})



function init() {
    getDogs()
}
init()


