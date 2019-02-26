//// API CALLS ////

//returns a promise with all the dogs
function getDogs() {
    return fetch(baseURL)
        .then(resp => resp.json())
}
//patches a dog and returns the response in a promise
function patchDog(dog) {
    const URL = baseURL + dog.id
    return fetch(URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }).then(resp => resp.json())
}