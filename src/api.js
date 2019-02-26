//// API CALLS ////
const baseURL = 'http://localhost:3000/dogs/'

//returns a promise with an array containing the dogs
function getDogs() {
    return fetch(baseURL)
        .then(resp => resp.json())
}

//patches a dog and returns success status in a promise
function updateDog(dog) {
    const URL = baseURL + dog.id
    return fetch(URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }).then(resp => resp.ok)
}

//deletes a dog and returns success status in a promise
function deleteDog(dog) {
    const URL = baseURL + dog.id
    return fetch(URL, {
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