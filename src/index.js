const dogList = new DogList()

fetchDogs()
  .then (dogs => dogList.createDogs(dogs))
