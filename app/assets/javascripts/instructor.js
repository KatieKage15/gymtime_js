$(function(){
    console.log("js is loading!")
    getInstructor()
    getClient()
    showClient()
    newInstructor()
})


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

function newInstructor() {
    $('#new_instructor_form').on('submit', function(e) {
        e.preventDefault()

        let values = $(this).serialize()
        const clientId = document.location.href.match(/\d+/g)[1];

        $.post(`/clients/${clientId}/instructor`, values).done(function(data) {
            $('#app-container').html('')

            let newInstructor = new Instructor(data)
            let instructorHTML = newInstructor.instructorsHTML()

            $('#app-container').append(instructorHTML)
            })
    })
}

function getClient(){
    $.ajax({
        url: 'http://localhost:3000/clients',
        method: 'get',
        dataType: 'json'
    }).done(function (data) {
        data.forEach(review => {
            let allClients = new Cient(client)
            let allClientsHTML = allClients.formatClientsIndex()
            document.getElementById('js-client-index').innerHTML += allClientsHTML
          })
    })

}

function showClient(){
    $(document).on('click', ".show_link", function(e){
        e.preventDefault()
        let id = $(this).attr('data-id')

        history.pushState(null, null, `reviews/${id}`)
        $('#app-container').html('')
        fetch(`/clients/${id}.json`)
        .then(res => res.json())
        .then(client => {
            let newClient = new Client(client)
            let showClientHTML = newClient.formatClientShow()
            $("#app-container").append(showClientHTML)
        })
    })
}

class Client {
    constructor (obj){
        this.id = obj.id
        this.name = obj.instructor.name
        this.bio = obj.instructor.bio
        this.age = obj.age
        this.goals = obj.goals
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
      <h3>${this.name}</h3>
      <p>${this.age}</p>
      <p>${this.goals}</p>
    `
    return clientHtml
}
