$(function(){
    clickForClient()
})

function clickForClient(){
  $("button#click-me").on('click', function (event){
    event.preventDefault()
    getClient()
  })
}

function getClient(){
  $.ajax({
    url: 'http://localhost:3000/clients',
    method: 'get',
    dataType: 'json',
  }).done(function (data){
    let myClient = new Client(data[0])
    let myClientHTML = myClient.clientHTML()
    document.getElementById('our-new-clients').innerHTML += myClientHTML
  })
}

class Client {
  constructor(obj){
    this.id = obj.id
    this.name = obj.name
    this.age = obj.age
    this.goals = obj.goals
    this.instructor = obj.instructor
  }
}

Client.prototype.clientHTML = function(){
  let instructor = this.instructor.map(instructor => {
    return(`
      <p>${instructor.name} : ${instructor.bio}</p>
      `)
  }).join('')

  return(`
    <div>
    <h2>${this.name}</h2>
    <h3>${this.age}</h3>
    <h3>${this.goals}</h3>
    <p>${instructor}</p>
    </div>
    `)
}
