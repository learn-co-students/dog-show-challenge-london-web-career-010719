class Dog {
  constructor(dog){
    this.id = dog.id
    this.name = dog.name
    this.breed = dog.breed
    this.sex = dog.sex
  }

  dogEl(){
    const dogEl = document.createElement('tr')
    dogEl.setAttribute('dog-id', this.id)
    dogEl.innerHTML = `
      <th class='padding center'>${this.name}</th>
      <th class='padding center'>${this.breed}</th>
      <th class='padding center'>${this.sex}</th>
      <th class='padding center'><button type="button" name="edit-dog">Edit</button></th>
    `
    dogEl.querySelector('button').addEventListener('click', () => {this.editDog()})
    return dogEl
  }

  editDog(){
    this.displayDog()
    const submitBtn = document.querySelector('form#dog-form input[type="submit"]')
    submitBtn.addEventListener('click',()=>{this.updateDog()})
  }

  displayDog(){
    const dogForm = document.querySelector('form#dog-form')
    dogForm.setAttribute('dog-id',this.id)
    const dogName = dogForm.querySelector('[name="name"]')
    const dogBreed = dogForm.querySelector('[name="breed"]')
    const dogSex = dogForm.querySelector('[name="sex"]')

    dogName.value = this.name
    dogBreed.value = this.breed
    dogSex.value = this.sex
  }

  updateDog(){
    event.preventDefault()
    const dogForm = document.querySelector('form#dog-form')
    const dogId = parseInt(dogForm.attributes['dog-id'].value)
    const dogName = dogForm.querySelector('[name="name"]').value
    const dogBreed = dogForm.querySelector('[name="breed"]').value
    const dogSex = dogForm.querySelector('[name="sex"]').value
    const url = `http://localhost:3000/dogs/${dogId}`

    const options = {
      method: 'PATCH',
      headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": `${dogName}`,
          "breed": `${dogBreed}`,
          "sex": `${dogSex}`
        })
    }


    return fetch (url, options)
      .then (res => res.json())
      .then (dog => dogList.updateDog(dog))
      .then (val => dogList.displayDogs(dogList.dogs))
  }


}
