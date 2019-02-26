class Dog {
    constructor(dog) {
        this.id = dog.id
        this.name = dog.name
        this.breed = dog.breed
        this.sex = dog.sex
        this.tableRow = document.createElement("tr")
        this.createEl() // create element in HTML
    }

    createEl() {
        this.tableRow.id = `dog-${this.id}`
        this.tableRow.innerHTML = `
        <td>${this.name}</td> 
        <td>${this.breed}</td> 
        <td>${this.sex}</td> 
        <td><button class="edit-dog">Edit Dog</button></td>
        <td><button class="delete-dog">Delete Dog</button></td>
        `
        return this.tableRow
    }

    edit(form) {
        this.renderEditForm(form)
    }

    renderEditForm(form) {
        form.dataset.id = this.id
        form.name.value = this.name 
        form.breed.value = this.breed
        form.sex.value = this.sex
    }

    update(event) {
        // console.log(event)
        event.preventDefault()
        const dogName = event.target.name.value
        const dogBreed = event.target.breed.value
        const dogSex = event.target.sex.value
        const dog = {id: event.target.dataset.id, name: dogName, breed: dogBreed, sex: dogSex}
        event.target.reset()
        event.target.dataset.id = ""

        return updateDogs(dog)
        .then(dog => dogList.updateDogList(dog))
        .then(() => dogList.renderDogList(dogList.dogs))
        
    }

    deleteDogData(dog) {
        const dogsWithoutDeletedDog = dogList.deleteDogInstance(dog)
        dogList.renderDogList(dogsWithoutDeletedDog)
        return deleteDog(dog)
    }
}