document.addEventListener('DOMContentLoaded', () => {
})

const table = document.querySelector('#table-body')
const formArea = document.querySelector('#form-location')
let formEdit 
let formNew
const state = { dogs: []}

//=================CREATE=======================

function createNewDog() {

    newDog(dog)
}

//This requires an argument of a complete dog object
function createDogEl(dog) {
    let dogTr = document.createElement('tr')
    dogTr.className = "dogDiv"
    dogTr.innerHTML = `
    <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td id="dogEdit"><button>Edit</button></td>
        <td id="dogDelete"><button>Delete</button></td>
    </tr>`
    // EVENT - initiates creation of edit form and prefill
    dogTr.addEventListener('click', (event) => {
        if (event.target.innerText === 'Edit'){
            createEditForm(dog)
            prefillForm(dog)
        }
        })
    dogTr.addEventListener('click', (event) => {
        if (event.target.innerText === 'Delete'){
            deleteDog(dog.id)
        }
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


//=================UPDATE=======================

function createEditForm (dog) {
    formArea.innerHTML =
    `<h4 class='center'>Edit Existing Dog</h4>
    <form id='edit-dog-form' class="padding margin border-round border-grey">
      <input type="name" name="name" placeholder="name" value="">
      <input type="breed" name="breed" placeholder="breed" value="">
      <input type="sex" name="sex" placeholder="sex" value="">
      <input type="hidden" name="id" value="">
      <input type="submit"value="Submit">
    </form>
    <div>
    <button>Add Dog</button>
    </div>`
    formEdit = document.querySelector('#edit-dog-form')
    document.addEventListener('click', (event) => {
        if (event.target.innerText === 'Add Dog'){
            createNewForm()
        }
        })
    
}

function prefillForm(dog) {
    formEdit.name.value = dog.name
    formEdit.breed.value = dog.breed
    formEdit.sex.value = dog.sex
    formEdit.id.value = dog.id
}

//=================EVENTS=================


//NEW EVENT - Submits new dog to fetch

document.addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log(event.target.id)
    if (event.target.id === 'new-dog-form'){
        let dog = {
            name: formNew.name.value, 
            breed: formNew.breed.value, 
            sex: formNew.sex.value
        }
        newDog(dog)
    }

})

//UPDATE
document.addEventListener('submit', (event) => {
    event.preventDefault()
   if (event.target.id !== 'new-dog-form'){
    let dog = {
        id: formEdit.id.value,
        name: formEdit.name.value, 
        breed: formEdit.breed.value, 
        sex: formEdit.sex.value
    }
    patchDog(dog)
   }

})


//=================Initialize=================

function createNewForm () {
    formArea.innerHTML =
    `<h4 class='center'>Create New Dog</h4>
    <form id='new-dog-form' class="padding margin border-round border-grey">
      <input type="name" name="name" placeholder="name" value="">
      <input type="breed" name="breed" placeholder="breed" value="">
      <input type="sex" name="sex" placeholder="sex" value="">
      <input type="submit"value="Create>
    </form>`
    formNew = document.querySelector('#new-dog-form')
}

function init() {
    createNewForm ()
    getDogs()
}
init()


