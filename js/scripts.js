let gallery = document.getElementById('gallery');
let cards = gallery.children


fetch ('https://randomuser.me/api/?results=12&nat=us,dk,fr,gb,ca,au,nz,de')
    .then(response => response.json())
    .then(data => people = data.results)
    .then(people => createCard(people))
    .then(people => createModalWindow(people))
    .then(people => console.log(people))


console.log(cards)
function createCard(people){
    for (let i = 0; i < people.length; i++){
      gallery.insertAdjacentHTML('beforeend', `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${people[i].picture.thumbnail}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${people[i].name.last} ${people[i].name.first}</h3>
              <p class="card-text">${people[i].email}</p>
              <p class="card-text cap">${people[i].location.city}, ${people[i].location.state}</p>
          </div>
      </div>`)
    }
  }

function createModalWindow(people){
    for (let i = 0; i < people.length; i++){
        gallery.insertAdjacentHTML('afterbegin', `
          <div class="modal-container">
              <div class="modal">
                  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                      <img class="modal-img" src="${people[i].picture.thumbnail}" alt="profile picture">
                      <h3 id="name" class="modal-name cap">${people[i].name.last} ${people[i].name.first}</h3>
                      <p class="modal-text">${people[i].email}</p>
                      <p class="modal-text cap">${people[i].location.city}, ${people[i].location.state}</p>
                      <hr>
                      <p class="modal-text">${people[i].phone}</p>
                      <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                      <p class="modal-text">Birthday: 10/21/2015</p>
                  </div>
              </div>`)
  }
}

function closeModalWindow(target){}

gallery.addEventListener('click', createModalWindow(e));
