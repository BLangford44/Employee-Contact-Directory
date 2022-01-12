let employees = []; //Empty array to store employee data
const url = 'https://randomuser.me/api/?results=12' // URL for fetch

// Fetch Data
const data = fetch(url)
  .then(response => response.json()) // parse response
  .then(response => response.results) // Get results of fetch from object
  .then(generateEmployeeCard) // Use results to generate employee cards
  .catch(err => console.log(err)); // Print error message to console

const grid = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

/**
 * Function: Will generate/set html for the grid-container in the Index file
 * 
 * @param  {array} data = Array containing employee objects
 */

function generateEmployeeCard(data) {

  let gridHtml = '';

  data.forEach((employee) => {

    const cardHtml = `
            <div class='card' data-index='${data.indexOf(employee)}'>
              <img class='avatar' src='${employee.picture.medium}'>
              <div class='text-container'>
                <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
                <p class="email">${employee.email}</p>
                <p class="address">${employee.location.city}, ${employee.location.state}</p>
              </div>
            </div>
    `

    gridHtml += cardHtml; //Add Card HTML to Grid Variable

    // Store Employee Information
    employees.push(employee);
  }); // End forEach Loop

  grid.innerHTML = gridHtml;
}

/**
 * Function: Will generate/set the html for the modal-container conatained in the Index File
 * 
 * @param  {number} index = selected card's 'data-index' value
 */

function displayModal(index) {

  let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index]
  let birthday = new Date(dob.date);

  const modalHTML = `
          <img src="${picture.large}" alt="Employee photo" class="avatar">
          <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p class='phone'>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class='birthday'>Birthday: ${birthday.getMonth()}/${birthday.getDate()}/${birthday.getFullYear()}</p>
          </div>
`;

  overlay.classList.remove('hidden');
  modalContainer.innerHTML = modalHTML;
}

/**
Click Event:

- Will dislay modal when Employee's Card is clicked

 */

grid.addEventListener('click', (e) => {
  if (e.target !== grid) {

    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

/**
Click Event:

- Close modal with button click

 */

modalClose.addEventListener('click', () => overlay.classList.add('hidden'));