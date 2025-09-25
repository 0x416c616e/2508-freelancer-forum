/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

//1. Write a function that returns a freelancer object with a randomly generated name, occupation, and rate according to the provided constants.

function getFreelancer() {
  //using variables because you could change the const arrays/objs
  let numNames = NAMES.length;
  let numOccupations = OCCUPATIONS.length;
  let randomNameIndex = Math.floor(Math.random() * numNames);
  let randomOccupationIndex = Math.floor(Math.random() * numOccupations);
  let priceMin = PRICE_RANGE.min;
  let priceMax = PRICE_RANGE.max;
  let randomPrice =
    priceMin + Math.floor(Math.random() * (priceMax - priceMin)); //20 + 0-180 = 20-200
  return {
    name: NAMES[randomNameIndex],
    occupation: OCCUPATIONS[randomOccupationIndex],
    rate: randomPrice,
  };
}

//2. Initialize a state variable to an array of `NUM_FREELANCERS` freelancer objects.

let freelancers = [];
for (let i = 0; i < NUM_FREELANCERS; i++) {
  freelancers[i] = getFreelancer();
}

//3. Write a function that returns the average rate of all freelancers in state.

function getAverageRate(freelancers) {
  let sumRates = 0;
  let numFreelancers = freelancers.length;
  for (let i = 0; i < numFreelancers; i++) {
    sumRates += freelancers[i].rate;
  }
  return sumRates / numFreelancers;
}

//4. Use that function to initialize a state variable which will store the average rate of all freelancers.

let averageRate = getAverageRate(freelancers);

//5. Write a component function to represent a single freelancer.

function getFreelancerComponent(freelancer) {
  //row
  //let freelancer = getFreelancer(); //should this be an arg passed to this function instead?
  let name = document.createElement("td");
  name.classList.add("freelancer-name-td");
  name.innerText = freelancer.name;
  let occupation = document.createElement("td");
  occupation.classList.add("freelancer-occupation-td");
  occupation.innerText = freelancer.occupation;
  let rate = document.createElement("td");
  rate.classList.add("freelancer-rate-td");
  rate.innerText = freelancer.rate;
  let row = document.createElement("tr");
  row.classList.add("freelancer-tr");
  row.appendChild(name);
  row.appendChild(occupation);
  row.appendChild(rate);
  return row;
}

//6. Write a component function to represent an array of freelancers.

function getFreelancerComponents(freelancers) {
  //table of rows
  let table = document.createElement("table");
  table.id = "freelancer-table";
  let tbody = document.createElement("tbody");
  tbody.id = "freelancer-tbody";
  let nameTh = document.createElement("th");
  nameTh.id = "freelancer-name-th";
  nameTh.innerText = "Name";
  let occupationTh = document.createElement("th");
  occupationTh.id = "freelancer-occupation-th";
  occupationTh.innerText = "Occupation";
  let rateTh = document.createElement("th");
  rateTh.id = "freelancer-rate-th";
  rateTh.innerText = "Rate";

  tbody.appendChild(nameTh);
  tbody.appendChild(occupationTh);
  tbody.appendChild(rateTh);

  for (let i = 0; i < freelancers.length; i++) {
    tbody.appendChild(getFreelancerComponent(freelancers[i]));
  }

  table.appendChild(tbody);
  console.log(table);
  return table;
}

//7. Write a component function to represent the average rate of all freelancers.

function getAverageRateComponent(averageRate) {
  let p = document.createElement("p");
  p.id = "average-rate-p";
  let averageRateTwoDecimalPlaces = averageRate.toFixed(2);
  p.innerText = `Average rate: $${averageRateTwoDecimalPlaces}`;
  return p;
}

//8. Write and call a render function that will mount the application onto the document.

function render(app, averageRate, freelancers) {
  title = document.createElement("h1");
  title.innerText = "Freelancer Forum";
  app.appendChild(title);
  app.appendChild(getAverageRateComponent(averageRate));
  app.appendChild(getFreelancerComponents(freelancers));
  console.log(app);
  document.querySelector(`#${app.id}`).replaceWith(app);
}

app = document.querySelector("#app");

render(app, averageRate, freelancers);

//> If you're thinking about using a `<table>`, be aware that
//> you aren't allowed to use "fake" elements in a table!
//> So when you render your app, replace a real element with an ID instead of
//> replacing a `<Component></Component>`.

//> $app.innerHTML = `
//>    <tbody id="FreelancerRows"></tbody>
//> `;
//> $app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
