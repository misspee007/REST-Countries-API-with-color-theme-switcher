// Goals:
// 1. loop through the array of objects (data)
// 2. for each object, create a new card element

// clear local storage to reset details page.
localStorage.removeItem("country"); 

// helper functions
const cards = document.getElementsByClassName('cards')[0];

function createCard(data) {  
  data.map(i => {
    const link = document.createElement('a');
    link.href = "details.html";
    link.className = ' text-decoration-none col ';
    link.id = 'card';
    link.addEventListener("click", getDetails); 

    const div = document.createElement('div');
    div.className = "w-75 bg-white rounded-top h-100";

    const flag = document.createElement('img');
    flag.className = 'flag w-100 rounded-top h-50';
    flag.src = i.flags.svg;

    const cardInfo = document.createElement('div');
    cardInfo.className = 'border border-white shadow-sm rounded-bottom  px-4 py-4 h-50';

    const title = document.createElement('h2');
    title.className = 'title fw-bold fs-5';
    title.innerHTML = i.name;

    const desc = document.createElement('div');

    const popWrap = document.createElement('div');
    popWrap.className = 'd-flex align-items-center';
    const popTxt = document.createElement('h3');
    popTxt.innerHTML = "Population: ";
    popTxt.className = 'fw-normal fs-6 mb-0';
    const pop = document.createElement('p');
    pop.innerHTML = i.population;
    pop.className = 'fs-6 fw-light ms-1 ';

    const regWrap = document.createElement('div');
    regWrap.className = 'd-flex align-items-center';
    const regTxt = document.createElement('h3');
    regTxt.innerHTML="Region: ";
    regTxt.className = 'fw-normal fs-6 mb-0';
    const reg = document.createElement('p');
    reg.innerHTML = i.region;
    reg.className = 'fs-6 fw-light ms-1';

    const capWrap = document.createElement('div');
    capWrap.className = 'd-flex align-items-center';
    const capTxt = document.createElement('h3');
    capTxt.innerHTML="Capital: ";
    capTxt.className = 'fw-normal fs-6 mb-0';
    const cap = document.createElement('p');
    cap.className = 'fs-6 fw-light ms-1';
    cap.innerHTML = i.capital;

    popWrap.append(popTxt, pop);
    regWrap.append(regTxt, reg);
    capWrap.append(capTxt, cap);

    desc.append(popWrap, regWrap, capWrap);
    cardInfo.append(title, desc);
    div.append(flag, cardInfo);
    link.append(div);
    cards.append(link);

    // helper function
    function getDetails() {
      console.log(i);
      localStorage.setItem("country", JSON.stringify(i));
    }
  })
}
function clearCards() {
  while (cards.firstChild) {
    cards.removeChild(cards.lastChild);
  }
}

// filter by region
function handleRegionChange() {
  const region = document.getElementsByClassName('filter-custom')[0].value.toLowerCase();
  const regURL = `https://restcountries.com/v2/region/${region}${region === "america" ? "s" : ""}`;
  clearCards();
  getData(regURL);
}

// search 
function handleInputChange() {
  let searchInput = document.getElementById('searchbar').value;
  searchInput = searchInput.trim().toLowerCase();
  const searchURL = `https://restcountries.com/v2/name/${searchInput}`;
  clearCards();
  getData(searchURL);
}

// get data for all countries and render in cards
async function getData (path) {
  try {
    const response = await axios.get(path);
    let data = response.data;
    createCard(data);
  } catch (error){
    console.log(error);
  }
  
}
const baseURL = "https://restcountries.com/v2/all";
getData(baseURL);
