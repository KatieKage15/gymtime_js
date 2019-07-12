$(function(){
  console.log("js is active!")
  listenForClick()
})

function listenForClick(){
  $("button#click-me").on('click', function (event){
    event.preventDefault()
    getInstructor()
  })
}

function getInstructor(){
  $.ajax({
    url: 'http://localhost:3000/instructors',
    method: 'get',
    dataType: 'json',
  }).done(function (data){
    console.log("your data is: ", data)
    let myInstructor = new Instructor(data[0])
    let myInstructorHTML = theInstructor.postHTML()
    document.getElementById('ajax-instructors').innerHTML += myInstructorHTML
  })
}


class Instructor {
  constructor (obj){
    this.id = obj.id
    this.name = obj.name
    this.bio = obj.bio
    this.clients = obj.clients
  }

  static newInstructorForm() {
    return ('
    <strong>New Instructor Client form</strong>
      <form>
        <input id='instructor-name' type='text' name='name'></input><br>
        <input type='text' name='bio'></input><br>
        <input type='submit'>
      </form>
    ')
  }
}

Instructor.prototype.instructorHTML = function () {
  let instructorClients = this.clients.map(client => {
    return (`
      <p>${client.name}</p>
      `)
  }).join('')
  return (`
    <div>
      <h3>${this.name}</h3>
      <p>${this.age}</p>
      <p>${this.goals}</p>
      <p>${instructorClients}<p?
    </div>
  `)
}
