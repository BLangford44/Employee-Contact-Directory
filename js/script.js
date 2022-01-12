let employees = [];
const url = 'https://randomuser.me/api/?results=12'

// Fetch Data
const data = fetch(url)
  .then(response => response.json())
  .then(response => response.results)
  .then(generateEmployeeCard)
  .catch(err => console.log(err));

const grid = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

function generateEmployeeCard(data) {

  data.forEach((employee) => {

    // Card Div
    const div = document.createElement('div')
    div.className = 'card';
    div.setAttribute('data-index', `${data.indexOf(employee)}`);

    // Image Element
    const img = document.createElement('img');
    img.className = 'avatar';
    img.src = `${employee.picture.medium}`;

    // Text Div
    const infoDiv = document.createElement('div');
    infoDiv.className = 'text-container';

    const h2 = document.createElement('h2');
    h2.className = 'name';
    h2.textContent = `${employee.name.first} ${employee.name.last}`;

    // Add Email
    const email = document.createElement('p');
    email.className = 'email';
    email.textContent = `${employee.email}`;

    // Add Location
    const location = document.createElement('p');
    location.textContent = `${employee.location.city}, ${employee.location.state}`;
    location.className = 'address';

    infoDiv.append(h2, email, location)
    div.append(img, infoDiv)

    grid.appendChild(div);

    // Store Employee Information
    employees.push(employee);
  });
}

function displayModal(index) {

  let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index]
  let birthday = new Date(dob.date);

  const modalHTML = `
<div class="modal-content">
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
        </div>
`;

  overlay.classList.remove('hidden');
  modalContainer.innerHTML = modalHTML;
}


grid.addEventListener('click', (e) => {

  if (e.target !== grid) {

    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

modalClose.addEventListener('click', () => overlay.classList.add('hidden'));