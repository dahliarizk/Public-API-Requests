let gallery = document.getElementById('gallery');
let cards = gallery.children
let header = document.querySelector('.header-text-container');

//fetch request to return data from randomuser API, and return people array of objects
//then calls createCard function to build one card per people[i] object
fetch ('https://randomuser.me/api/?results=12&nat=us,dk,fr,gb,ca,au,nz,de')
    .then(response => response.json())
    .then(data => {
      let people = data.results
      console.log(people)
      return people
    })

    .then(people => {
          createCard(people);
          addModalWindow();
          let cards = document.querySelectorAll('.card');
          cards.forEach(card => card.addEventListener('click', () => {
              updateModalWindow(people)
          }));
          document.addEventListener('click', e => {
            if (e.target.textContent === 'Prev'){
              //prevProfile function
            }
          })
          //searchFunction goes here
      });
      .catch(error => console.log('There is an issue', error)); 



//creates searchBar form and button. to be built on later.
let searchBar = document.querySelector('.search-container')
searchBar.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`

let input = document.querySelectorAll('input')[0];
let searchImg = document.querySelectorAll('input')[1];

//builds HTML for card div using people attributes
function createCard(people){
    console.log(people);
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
    return people;
  }

  function addModalWindow(){
      gallery.insertAdjacentHTML('afterend', `
      <div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
              </div>
          </div>
          <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
          </div>
      </div>`);
      let modalWindow = document.querySelector('.modal-container');
      modalWindow.style.display = 'none';
  };


function updateModalWindow(people){
  let modalWindow = document.querySelector('.modal-container');
  modalWindow.style.display = 'block'
  for (let i = 0; i < people.length; i++){
    if (event.target.textContent === `${people[i].name.last} ${people[i].name.first}`
          || event.target.textContent === `${people[i].email}`
          || event.target.textContent === `${people[i].location.city}, ${people[i].location.state}`
          || event.target.src === `${people[i].picture.thumbnail}` || event.target.type === 'button'){
          let modalInfo = document.querySelector('.modal-info-container');
          modalInfo.innerHTML = '';
          console.log(i)
          modalInfo.insertAdjacentHTML('afterbegin', `
              <img class="modal-img" src="${people[i].picture.thumbnail}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${people[i].name.last} ${people[i].name.first}</h3>
              <p class="modal-text">${people[i].email}</p>
              <p class="modal-text cap">${people[i].location.city}, ${people[i].location.state}</p>
              <hr>
              <p class="modal-text">${people[i].cell}</p>
              <p class="modal-text">${people[i].location.street.number} ${people[i].location.street.name}, ${people[i].location.city}, ${people[i].location.state} ${people[i].location.postcode}</p>
              <p class="modal-text">${people[i].dob.date.split('-')[1]}/${people[i].dob.date.split('-')[2][0]+people[i].dob.date.split('-')[2][1]}/${people[i].dob.date.split('-')[0]}</p>
          `)
        }
      };
      modalWindow.addEventListener('click', e => {
        if (e.target.textContent === 'X'){
          modalWindow.style.display = 'none';
      }
    });
  };
