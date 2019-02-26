class DogController { 
    constructor(dogs) {
        this.dogs = []
        this.tableBody = document.querySelector("#table-body")
        this.form = document.querySelector("#dog-form")
        this.formTitle = document.querySelector("div h4")
        this.form.addEventListener("submit", (event) => {
            if (this.formTitle.innerText === "Edit Existing Dog") {
                const editingDogId = parseInt(this.form.dataset.id)
                const dog = this.dogs.find(d => d.id === editingDogId)
                dog.update(event)
            } else if (this.formTitle.innerText === "Create Existing Dog") {
                this.createDogData(event)      
            }
        })
        this.createDogList(dogs)
    }

    createDogData(event) {
        event.preventDefault()
        const data = {
            name: this.form.name.value,
            breed: this.form.breed.value,
            sex: this.form.sex.value    
        }
        event.target.reset()
        event.target.dataset.id = ""

        return createDog(data)
        .then(dog => this.createDogInstance(dog))
    }

    createDogInstance(dog) {
        const newDog = new Dog(dog)
        const newDogEl = newDog.createEl()
        this.dogs.push(newDog)
        this.tableBody.appendChild(newDogEl)
        newDogEl.querySelector(".edit-dog").addEventListener("click", () => {
            if (this.formTitle.innerText === "Create Existing Dog") {
                this.formTitle.innerText = "Edit Existing Dog"
            }
            return newDog.edit(this.form)
        })
        newDogEl.querySelector(".delete-dog").addEventListener("click", () => {
            return newDog.deleteDogData(newDog)
        })
    }

    createDogList(dogs) {
        dogs.forEach(dog => this.createDogInstance(dog))
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
        // console.log('renderdoglist')
        this.tableBody.innerHTML = ""
        dogs.forEach(dog => {
            const newDogEl = dog.createEl()
            this.tableBody.appendChild(newDogEl)
            this.formTitle.innerText = "Create Existing Dog"
            newDogEl.querySelector(".edit-dog").addEventListener("click", () => {
                if (this.formTitle.innerText === "Create Existing Dog") {
                    this.formTitle.innerText = "Edit Existing Dog"
                }
                return dog.edit(this.form)
            })
        })
    }

    deleteDogInstance(dog) {
        // console.log(dog.id)
        this.dogs = this.dogs.filter(d => d.id !== dog.id)
        return this.dogs
    }
}