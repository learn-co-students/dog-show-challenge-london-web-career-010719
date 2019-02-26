function getDogs() {
    return fetch("http://localhost:3000/dogs")
    .then(res => res.json())
}

function createDog(dog) {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(dog)
    }
    return fetch("http://localhost:3000/dogs", options)
    .then(res => res.json())
}

function updateDogs(dog) {
    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(dog)
    }
    return fetch(`http://localhost:3000/dogs/${dog.id}`, options)
    .then(res => res.json())
}