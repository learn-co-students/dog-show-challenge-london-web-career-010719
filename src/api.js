const DOGS_URL = "http://localhost:3000/dogs"

function fetchDogs() {
    return fetch(DOGS_URL)
        .then(res => res.json())
}

function updateDogServer(dog) {
    const url = (DOGS_URL + `/${dog.id}`)
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }
    return fetch(url, options)
        .then(res => res.json())
}