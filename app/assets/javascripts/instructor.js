$(() => {
  console.log("hi katie")
    showInstructor()
    newInstructor()
})

const showInstructor = () => {
  $('.all_instructors').on('click', e => {
    e.preventDefault()
    history.pushState(null, null, "instructors")
    fetch(`/instructors.json`)
      .then(res => res.json())
      .then(instructors => {
        $('#app-container').html('')
        instructors.forEach(instructor => {
          let newIns = new Instructor(instructor)

          let insHTML = newIns.formatInsIndex()

          $('#app-container').append(insHTML)
        })
      })
  })

  $(document).on('click', ".show_link", function(e) {
    e.preventDefault()
    $('#app-container').html('')
    let id = $(this).attr('data-id')
    fetch(`/instructors/${id}.json`)
    .then(res => res.json())
    .then(instructor => {
      let newIns = new Instructor(instructor)

      let insHTML = newIns.formatInsShow()

      $('#app-container').append(insHTML)
    })
  })
}

function Instructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.bio = obj.bio
    this.clients = obj.clients
}

Instructor.prototype.formatInsIndex = function(){
  let insHTML = `
    <a href="/instructors/${this.id}" data-id="${this.id}" class="show_link"><h2>${this.name}</h2></a>
    <h3>${this.bio}</h3>
    `
    return insHTML
}

Instructor.prototype.formatInsShow = function(){
  let clients = this.clients.map(client => {

    return (`
      <p>${client.name}</p>
    `)
  }).join('')

    return (`
      <div>
        <h3>${this.name}</h3>
        <h4>${this.bio}</h4>
        <p>${clients}</p>
      </div>
      `)
}

function newInstructor(){
  $("#new_instructor").on('submit', function(e){
      e.preventDefault();

      const values = $(this).serialize()
      $.post(`/instructors`, values).done(function(data) {

          $("#app-container").html('')

        const newInstructor = new Instructor(data)
        const htmlToAdd = newInstructor.formatInsShow()
        $("#app-container").append(htmlToAdd)
      })
  })
}
