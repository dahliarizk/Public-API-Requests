let gallery = document.getElementById('gallery');
let cards = gallery.children
let header = document.querySelector('.header-text-container');

//fetch request to return data from randomuser API, and return people array of objects
//then calls createCard function to build one card per people[i] object
fetch ('https://randomuser.me/api/?results=12&nat=us')
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
          cards.forEach(card => card.addEventListener('click', (event) => {
              updateModalWindow(people, event)
          }));
      })
  .catch(error => console.log('There is an issue', error));


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
  };

//function to add HTML elements of modal window that do not change
function addModalWindow(){
    gallery.insertAdjacentHTML('afterend', `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
            </div>
        </div>
    </div>`);
    let modalWindow = document.querySelector('.modal-container');
    modalWindow.style.display = 'none';
};

//function to format phone number and remove the extra '-',
//references from https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  } else {
    return null;
  }
};

//function to format date
function formatDOB(date){
  return `${date.split('-')[1]}/${date.split('-')[2][0]+date.split('-')[2][1]}/${date.split('-')[0]}`
};


//updates modal window content using people array. compares event target of the click with each of the objects
//if they match displays corresponding object.
function updateModalWindow(people, event){
  let modalWindow = document.querySelector('.modal-container');
  modalWindow.style.display = 'block'
  console.log(event.target.className)
  for (let i = 0; i < people.length; i++){
    if (event.target.textContent === `${people[i].name.last} ${people[i].name.first}`
          || event.target.textContent === `${people[i].email}`
          || event.target.textContent === `${people[i].location.city}, ${people[i].location.state}`
          || event.target.src === `${people[i].picture.thumbnail}` || event.target.className === "card-info-container" && event.target.firstElementChild.textContent === `${people[i].name.last} ${people[i].name.first}`){
            let modalInfo = document.querySelector('.modal-info-container');
            modalInfo.innerHTML = '';
            modalInfo.insertAdjacentHTML('afterbegin', `
                <img class="modal-img" src="${people[i].picture.thumbnail}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${people[i].name.last} ${people[i].name.first}</h3>
                <p class="modal-text">${people[i].email}</p>
                <p class="modal-text cap">${people[i].location.city}, ${people[i].location.state}</p>
                <hr>
                <p class="modal-text">${formatPhoneNumber(people[i].cell)}</p>
                <p class="modal-text">${people[i].location.street.number} ${people[i].location.street.name}, ${people[i].location.city}, ${people[i].location.state} ${people[i].location.postcode}</p>
                <p class="modal-text">${formatDOB(people[i].dob.date)}</p>
            `)
        }
      };
      modalWindow.addEventListener('click', e => {
        if (e.target.textContent === 'X'){
          modalWindow.style.display = 'none';
      }
    });
  };
