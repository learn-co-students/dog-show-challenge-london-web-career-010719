class DogController { 
    constructor(dogs) {
        this.dogs = []
        this.tableBody = document.querySelector("#table-body")
        this.form = document.querySelector("#dog-form")
        this.form.addEventListener("submit", (event) => {
            const editingDogId = parseInt(this.form.dataset.id)
            const dog = this.dogs.find(d => d.id === editingDogId)
            dog.update(event)
        })
        this.createDogList(dogs)
    }

    createDog(dog) {
        const newDog = new Dog(dog)
        const newDogEl = newDog.createEl()
        this.tableBody.appendChild(newDogEl)
        newDogEl.querySelector(".edit-dog").addEventListener("click", () => {
            return newDog.edit(this.form)
        })
        this.dogs.push(newDog)
    }

    createDogList(dogs) {
        dogs.forEach(dog => this.createDog(dog))
    }

    updateDogList(dog) {
        for(const key in this.dogs) {
            if (this.dogs[key].id === dog.id) {
                this.dogs[key] = new Dog(dog)
                return dogList
            }
        }
    }

    renderDogList(dogs) {
        console.log('renderdoglist')
        this.tableBody.innerHTML = ""
        dogs.forEach(dog => {
            const newDogEl = dog.createEl()
            this.tableBody.appendChild(newDogEl)
            newDogEl.querySelector(".edit-dog").addEventListener("click", () => {
                return dog.edit(this.form)
            })
        })
    }

}