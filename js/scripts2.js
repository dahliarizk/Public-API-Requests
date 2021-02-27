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
          for (let i = 0; i < cards.length; i++){
            cards[i].addEventListener('click', addUniqueFeatures)
            cards[i].addEventListener('click', updateModalWindow)
          }
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

  function addUniqueFeatures(person){
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


function updateModalWindow(people){
  console.log(people)
    let modalInfo = document.querySelector('.modal-info-container');
    modalInfo.innerHTML = '';
      for (let i = 0; i < people.length; i++){
          person = people[i]
          modalInfo.insertAdjacentHTML('afterbegin', `
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        `)
      }
  };
