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

function getInsctructor(){
  $.ajax({
    url: 'http://localhost:3000/instructors',
    method: 'get',
    dataType: 'json',
  }).done(function (data){
    console.log("your data is: ", data)
    let theInstructor = new Instructor(data[0])
    let myInstructorHTML = theInstructor.postHTML()
    document.getElementById('our-new-instructors').innerHTML += myInstructorHTML
  })
}

class Instructor {
  constructor (obj){
    this.id = obj.id
    this.name = obj.name
    this.bio = obj.bio
    this.clients = obj.clients
    debugger
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
