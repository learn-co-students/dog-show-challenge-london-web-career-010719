const DOGS_URL = "http://localhost:3000/dogs"

function fetchDogs(){
  return fetch(DOGS_URL)
    .then (res => res.json())
}

function fetchDog(id){
  const url = DOGS_URL + "/" + `${id}`
  return fetch(url)
    .then (res => res.json())
}
