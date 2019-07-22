$(document).ready(function() {
    console.log("hi katie")
    getInstructorByName()
    newInstructor()
    getClients()
    showClient()
})

function getInstructorByName(){
  $.ajax({
    url: 'http://localhost:3000/instructors',
    method: 'get',
    dataType: 'json',
  }).done(function (data){
    data = data.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return data;
        });
        data.forEach(instructor => {
          let myInstructor = new Instructor(instructor)
          let myInstructorHTML = myInstructor.formatInstructorIndex()
          document.getElementById('our-new-instructors').innerHTML += myInstructorHTML
        })
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

Instructor.prototype.formatInstructorIndex = function(){
  let clientsInfo = this.clients.map(clientsData => {
    return(`
      <strong><p>${clientInfo.name}, ${clientInfo.age} : ${clientInfo.goals}</p></strong>
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


function newInstructor(){
  $("#new_instructor").on('submit', function(e){
      e.preventDefault();

      const values = $(this).serialize()
      $.post('/instructors', values).done(function(data) {
          $("#app-container").html("")

        const newIns = new Instructor(data)
        const htmlToAdd = newIns.formatInstructorShow()
        $("#app-container").append(htmlToAdd)
      })
  })
}

Instructor.prototype.formatInstructorShow = function(){
  let instructorHtml = `
    <h3>${this.name}</h3>
    <h2>${this.bio}</h2>
    `
    return instructorHtml
}

function getClients(){
    $.ajax({
        url: 'http://localhost:3000/clients',
        method: 'get',
        dataType: 'json'
    }).done(function (data) {
          data.forEach(client => {
            let allClients = new Client(data)
            let allClientsHTML = allClients.formatReviewsIndex()
            document.getElementById('our-new-clients').innerHTML += allClientsHTML
          })
    })

}

function showClient(){
    $(document).on('click', ".show_link", function(e){
        e.preventDefault()
        let id = $(this).attr('data-id')

        history.pushState(null, null, `clients/${id}`)
        $('#app-container').html('')
        fetch(`/clients/${id}.json`)
        .then(res => res.json())
        .then(clientData => {
            let newClient = new Client(clientData)
            let showClientHTML = newClient.formatClientShow()
            $("#app-container").append(showClientHTML)
        })
    })
}

class Client {
  constructor(obj){
    this.id = obj.id
    this.name = obj.name
    this.goals = obj.goals
    this.instructor_id = obj.instructor_id
  }
}

Client.prototype.formatClientsIndex = function(){
    let clientsHtml = `
      <a href="/clients/${this.id}" data-id="${this.id}" class="show_link">
      <h3>${this.name}</h3></a>
    `
    return clientsHtml
  }

Client.prototype.formatClientShow = function(){
  let clientHtml = `
    <a href="/clients/${this.id}" data-id="${this.id}" class="show_link">
    <h2>${this.name}</h2>
    <h2>${this.goals}</h2>
    `
    return clientHtml
}
