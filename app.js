
// 1. loop through the array of objects 

// 2. for each object, create a new card element
// 2.1 create card
const card = document.getElementsByClassName('cards')[0];

function createCard() {  
  const link = document.createElement('a');
  link.href = "details.html";

  const flag = document.createElement('div');
  flag.className = 'flag';

  const cardInfo = document.createElement('div');
  cardInfo.className = 'card-info';

  const title = document.createElement('p');
  title.className = 'title';

  const desc = document.createElement('div');
  desc.className = 'desc';

  const popWrap = document.createElement('div');
  popWrap.className = 'pop-wrap';
  const popTxt = document.createElement('b');
  const pop = document.createElement('p');
  pop.id = 'population';

  const regWrap = document.createElement('div');
  regWrap.className = 'region-wrap';
  const regTxt = document.createElement('b');
  const reg = document.createElement('p');
  reg.id = 'region';

  const capWrap = document.createElement('div');
  capWrap.className = 'capital-wrap';
  const capTxt = document.createElement('b');
  const cap = document.createElement('p');
  cap.id = 'capital';
}

async function getData(path) {
  await axios.get(path).then((response) => {
    let data = response.data;
    console.log(data);
    
    data.map(i => {
      createCard();

      title.innerHTML = i.name;
      pop.innerHTML = i.population;
      reg.innerHTML = i.region;
      cap.innerHTML = i.capital;
  
      popWrap.append(popTxt, pop);
      regWrap.append(regTxt, reg);
      capWrap.append(capTxt, cap);
  
      desc.append(popWrap, regWrap, capWrap);
      cardInfo.append(title, desc);
      link.append(flag, cardInfo);
      card.append(link);
      
      console.log(card);
      
      // console.log(i.name);
    });


    },
    (error) => {
      console.log(error);
    }
  );
}
const baseURL = "https://restcountries.com/v2/all";
getData(baseURL);

console.log(card);


// async function getData2() {
//   let response = await fetch(baseURL);
//   let data = await response.json();

//   console.log("fetch: ", data[0]);
// }

// getData2().catch((err) => {
//   console.log(
//     "There has been a problem with your fetch operation: " + err.message
//   );
// });
