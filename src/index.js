let dogList;

getDogs()
.then(dogs => dogList = new DogController(dogs))
