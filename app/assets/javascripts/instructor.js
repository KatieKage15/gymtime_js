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
      const values = $(this).serialize()
      $.post('/instructors', values).done(function(data) {
        $("#app-container").html("")
        const newIns = new Instructor(data)
        const htmlToAdd = newIns.formatShow()
        $("#app-container").append(htmlToAdd)
      })
  })
}

function getInstructor(){
  $.ajax({
    url: 'http://localhost:3000/instructors',
    method: 'get',
    dataType: 'json',
  }).done(function (data){
    let myInstructor = new Instructor(data[0])
    let myInstructorHTML = myInstructor.formatIndex()
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

Instructor.prototype.formatIndex = function(){
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

Instructor.prototype.formatShow = function(){
  let postHtml = `
    <h3>${this.name}</h3>
    <h2>${this.bio}</h2>
    `
    return postHtml
}
