let gallery = document.getElementById('gallery');
let cards = gallery.children
let header = document.querySelector('.header-text-container');

//fetch request to return data from randomuser API, and return people array of objects
//then calls createCard function to build one card per person object
fetch ('https://randomuser.me/api/?results=12&nat=us,dk,fr,gb,ca,au,nz,de')
    .then(response => response.json())
    .then(data => {
      let people = data.results
      console.log(people)
      return people
    })

    .then(people => {
          createCard(people);
          let cards = document.querySelectorAll('.card');
          cards.forEach(card => card.addEventListener('click', () => {
              addUniqueFeatures()
          }))
          cards.forEach(card => card.addEventListener('click', () => {
          for (let i = 0; i < people.length; i++){
            let person = people[i]
            updateModalWindow(person)
            }
          }))
          document.addEventListener('click', () => {
            if (event.target.textContent === 'Prev'){
                  prevProfile(people);
              }
            });

        document.addEventListener('click', () => {
          if (event.target.textContent === 'Next'){

          }
        })

    });



//creates searchBar form and button
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

  function addUniqueFeatures(){
      console.log(event.target)
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
      modalWindow.addEventListener('click', e => {
        if (e.target.textContent === 'X'){
          modalWindow.style.display = 'none';
      }
      })
  };

  // Create update modal function that accepts one parameter, which will be an employee object
    // Target the "modal-info-container" div and set its inner HTML to an empty string, ''
    // Use example markup and interpolated template literals with the info in the parameter
    //to add the unique parts of the modal
    // Target the "modal-info-container" div and use insertAdjacentHTML method with 'afterbegin'
    //option to append unique modal info


function updateModalWindow(person){
  if (event.target.textContent === `${person.name.last} ${person.name.first}`
        || event.target.textContent === `${person.email}`
        || event.target.textContent === `${person.location.city}, ${person.location.state}`
        || event.target.src === `${person.picture.thumbnail}` || event.target.type === 'button'){
        let modalInfo = document.querySelector('.modal-info-container');
        console.log(modalInfo)
        modalInfo.innerHTML = '';
        console.log(person)
        modalInfo.insertAdjacentHTML('afterbegin', `
            <img class="modal-img" src="${person.picture.thumbnail}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${person.name.last} ${person.name.first}</h3>
            <p class="modal-text">${person.email}</p>
            <p class="modal-text cap">${person.location.city}, ${person.location.state}</p>
            <hr>
            <p class="modal-text">${person.cell}</p>
            <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
            <p class="modal-text">${person.dob.date.split('-')[1]}/${person.dob.date.split('-')[2][0]+person.dob.date.split('-')[2][1]}/${person.dob.date.split('-')[0]}</p>
        `)
      }
    };

  function prevProfile(people){
    let name = document.querySelector('h3').textContent;
    for (let i = 0; i < people.length; i++){
      if (name === `${people[i].name.last} ${people[i].name.first}`){
        let modalWindow = document.querySelector('.modal-container');
        let person = people[i-1]
        console.log(person);
        updateModalWindow(person)
      }
    }
  }
