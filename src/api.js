// SERVER STUFF

const url = "http://localhost:3000/dogs"

// get dogs from the server
function getDogs(){
  return fetch(url)
    .then(resp => resp.json())
}


// update dogs to the server
function updateDogs (dog){
  return fetch(url+`/${dog.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(dog)

  })
    .then(resp => resp.json())
}
