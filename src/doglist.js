class DogList {
  constructor(dog){
    this.dogs = []
    this.tableEl = document.querySelector('tbody#table-body')
  }

  createDog(dog){
    const dogInstance = new Dog (dog)
    this.tableEl.appendChild(dogInstance.dogEl())
    this.dogs.push(dog)
  }

  createDogs(dogs){
    dogs.forEach(dog=>this.createDog(dog))
  }

  updateDog(dog){
    this.dogs.forEach((oldDog,index,arr)=>{
      if (oldDog.id == dog.id){
        //debugger;
        arr[index] = dog
        return oldDog
      }
    })
  }

  displayDogs(dogs){
    this.tableEl.innerHTML = ''
    dogs.forEach(dog=>{
      const dogInstance = new Dog (dog)
      this.tableEl.appendChild(dogInstance.dogEl())
    })
  }

}
