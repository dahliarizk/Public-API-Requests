let gallery = document.getElementById('gallery');
let cards = gallery.children
let header = document.querySelector('.header-text-container');

//fetch request to return data from randomuser API, and return people array of objects
//then calls createCard function to build one card per person object
fetch ('https://randomuser.me/api/?results=12&nat=us,dk,fr,gb,ca,au,nz,de')
    .then(response => response.json())
    .then(data => people = data.results)
    .then(people => {
      createCard(people)
      return people
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
function createCard(arr){
    for (let i = 0; i < arr.length; i++){
      gallery.insertAdjacentHTML('beforeend', `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${arr[i].picture.thumbnail}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${arr[i].name.last} ${arr[i].name.first}</h3>
              <p class="card-text">${arr[i].email}</p>
              <p class="card-text cap">${arr[i].location.city}, ${arr[i].location.state}</p>
          </div>
      </div>`)
    }
  }

  function searchProfiles(event){
    let matches = [];
    if (event.target.type === 'submit'){
      for (let i = 0; i < people.length; i++) {
        if (input.value.length > 0 && `${people[i].name.last} ${people[i].name.first}`.toLowerCase().includes(input.value.toLowerCase())){
          matches.push(people[i]);
      }
    }
  }
      console.log(matches)
      if (matches.length > 0){
        gallery.innerHTML = '';
        createCard(matches)
    } else if (matches.length === 0) {
          header.insertAdjacentHTML('beforeend',
          `<h3>Your search did not return any results. Please try again. </h3>`)
          input.value = '';
          createCard(people);
    }
};


//creates modalwindow element that is triggered by eventListener as callback.
//builds HTML for modal window, using people attributes, similar to createCard function
function createModalWindow(){
  if (event.target.className !== 'gallery'){
    for (let i = 0; i < people.length; i++){
        if (event.target.textContent === `${people[i].name.last} ${people[i].name.first}`
          || event.target.textContent === `${people[i].email}`
          || event.target.textContent === `${people[i].location.city}, ${people[i].location.state}`
          || event.target.src === `${people[i].picture.thumbnail}` ){
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
                          <p class="modal-text">${people[i].cell}</p>
                          <p class="modal-text">${people[i].location.street.number} ${people[i].location.street.name}, ${people[i].location.city}, ${people[i].location.state} ${people[i].location.postcode}</p>
                          <p class="modal-text">Birthday: ${people[i].dob.date.split('-')[1]}/${people[i].dob.date.split('-')[2][0]+people[i].dob.date.split('-')[2][1]}/${people[i].dob.date.split('-')[0]}</p>
                      </div>
                  </div>
                  <div class="modal-btn-container">
                      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                      <button type="button" id="modal-next" class="modal-next btn">Next</button>
                  </div>`)

      } else {
          continue;
      }
      return people;
    }
  }
};

function prevProfile(event){
  if (event.target.textContent === 'Prev'){
    for (let i = 0; i < people.length; i++){
      //seemed like the only way to select these elements in the modal, would get 'null' otherwise, even if they
      //were already created. 
      let name = event.target.parentNode.previousElementSibling.children[1].children[1].textContent;
      console.log(name)
      if (name === `${people[i].name.last} ${people[i].name.first}`){
        console.log(people[i-1])
        createModalWindow(people[i-1])
      }
    }
  }
};

function nextProfile(event){
  if (event.target.textContent === 'Next'){
    console.log('next')
  }

}
//closes modalWindow when 'x' is selected
function closeModalWindow(event){
  let modalWindow = document.querySelector('.modal-container')
    if (event.target.textContent === 'X'){
      modalWindow.style.display = 'none'
  }
}


//event listeners
gallery.addEventListener('click', createModalWindow);
gallery.addEventListener('click', closeModalWindow);
searchImg.addEventListener('click', searchProfiles);
gallery.addEventListener('click', nextProfile);
gallery.addEventListener('click', prevProfile);
