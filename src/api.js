//// API CALLS ////
const baseURL = 'http://localhost:3000/dogs/'

//returns a promise with an array containing the dogs
const getDogs = () =>  fetch(baseURL).then(resp => resp.json())

//patches a dog and returns success status in a promise
function updateDog(dog) {
    return fetch(baseURL+dog.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }).then(resp => resp.json())
}

//deletes a dog and returns success status in a promise
function deleteDog(dog) {
    return fetch(baseURL+dog.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(resp => resp.ok)
}

//creates a dog and returns the new Dog in a promise
function createDog(dog) {
    return fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    })
    .then(resp => resp.json())
}