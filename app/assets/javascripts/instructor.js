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
    let myInstructorHTML = myInstructor.myInstructorHTML()
    document.getElementById('our-new-instructors').innerHTML += myInstructorHTML
  })
}


class Instructor {
  constructor (obj){
    this.id = obj.id
    this.name = obj.name
    this.bio = obj.bio
    this.clients = obj.clients
  }
}

Instructor.prototype.myInstructorHTML = function () {
  let instructorClients = this.clients.map(client => {
    return (`
      <p>${client.name}</p>
      `)
  }).join('')
  return (`
    <div>
      <h3>${this.name}</h3>
      <p>${this.bio}</p>
      <p>${instructorClients}</p>
    </div>
  `)
}
