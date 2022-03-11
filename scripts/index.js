localStorage.removeItem("country");

// 1. loop through the array of objects 
// 2. for each object, create a new card element

const card = document.getElementsByClassName('cards')[0];

function createCard(data) {  
  data.map(i => {
    const link = document.createElement('a');
    link.href = "details.html";
    link.addEventListener("click", getDetails); 

    const flag = document.createElement('div');
    flag.className = 'flag';

    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';

    const title = document.createElement('p');
    title.className = 'title';
    title.innerHTML = i.name;

    const desc = document.createElement('div');
    desc.className = 'desc';

    const popWrap = document.createElement('div');
    popWrap.className = 'pop-wrap';
    const popTxt = document.createElement('b');
    popTxt.innerHTML = "Population: "
    const pop = document.createElement('p');
    pop.innerHTML = i.population;
    pop.id = 'population';

    const regWrap = document.createElement('div');
    regWrap.className = 'region-wrap';
    const regTxt = document.createElement('b');
    regTxt.innerHTML="Region: "
    const reg = document.createElement('p');
    reg.innerHTML = i.region;
    reg.id = 'region';

    const capWrap = document.createElement('div');
    capWrap.className = 'capital-wrap';
    const capTxt = document.createElement('b');
    capTxt.innerHTML="Capital: "
    const cap = document.createElement('p');
    cap.id = 'capital';
    cap.innerHTML = i.capital;

    popWrap.append(popTxt, pop);
    regWrap.append(regTxt, reg);
    capWrap.append(capTxt, cap);

    desc.append(popWrap, regWrap, capWrap);
    cardInfo.append(title, desc);
    link.append(flag, cardInfo);
    card.append(link);

    // helper function
    function getDetails() {
      console.log(i);
      localStorage.setItem("country", JSON.stringify(i));
    }
  })
}

async function getData () {
  try {
    const response = await axios.get("https://restcountries.com/v2/all");
    let data = response.data;
    createCard(data);
  } catch (error){
    console.log(error);
  }
  
}
getData();
