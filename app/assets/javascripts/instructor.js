$(document).ready(function(){
    showInstructor()
    submitInstructor()
    console.log("hi katie")
})

function showInstructor(){
  $("button#click-me").on('click', function (event){
    event.preventDefault()
    getInstructor()
  })
}

function submitInstructor(){
  $("#new_instructor").on('submit', function(e){
      e.preventDefault();
      const formValues = $(this).serialize();
      const clientId = document.location.href.match(/\d+/g)[1];
      $.post('/clients/' + clientId + '/instructors', formValues).done(function(data){
        let pantry = new Instructor(data);
        displayNewInstructor(instructor);
      });
    });
  }

function getNewInstructor(values){
  $.post("/instructors", values).done(function(data){
    $("#container").html("");
    const newIns= new Instructor(data)
    const html= newIns.showHTML()
    $("#container").append(html)
  })
}

function getInstructor(){
  $.ajax({
    url: 'http://localhost:3000/instructors',
    method: 'get',
    dataType: 'json',
  }).done(function (data){
    let myInstructor = new Instructor(data[0])
    let myInstructorHTML = myInstructor.instructorHTML()
    document.getElementById('our-new-instructors').innerHTML += myInstructorHTML
  })
}

class Instructor {
  constructor(obj){
    this.id = obj.id
    this.name = obj.name
    this.bio = obj.bio
    this.clients = obj.clients
  }
}

Instructor.prototype.instructorHTML = function(){
  let clients = this.clients.map(client => {
    return(`
      <strong><p>${client.name}, ${client.age} : ${client.goals}</p></strong>
      `)
  }).join('')

  return(`
    <div>
    <h2>${this.name}</h2>
    <h3>${this.bio}</h3>
    <p>${clients}</p>
    </div>
    `)
}
