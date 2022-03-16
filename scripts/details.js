// get data from local storage
let country = JSON.parse(localStorage.getItem("country"));

function createDetailCard(country) {
  // get elements
  document.getElementsByClassName("title")[0].innerHTML = country.name;
  document.getElementById("native-name").innerHTML = country.nativeName;
  document.getElementById("pop").innerHTML = country.population;
  document.getElementById("reg").innerHTML = country.region;
  document.getElementById("sub-reg").innerHTML = country.subregion;
  document.getElementById("cap").innerHTML = country.capital;
  document.getElementById("domain").innerHTML = country.topLevelDomain;
  document.getElementById("curr").innerHTML = country.currencies[0].name;

  // get flag images
  document.getElementById("flag").src = country.flags.svg;
  document.getElementById("flag-lg").srcset = country.flags.svg;

  // get languages
  let languages = "";
  country.languages.forEach(i => {
    languages = `${languages}${languages === "" ? "" : ","} ${i.name}`;
  })
  document.getElementById("lang").innerHTML = languages;

  // get border countries 
  let borders = document.getElementById("borders");
    //country.borders returns a country code, make API call using the code to get the actual country name
  country.borders.map(i => {   
    let span = document.createElement("span");
    span.className = 'btn flex-nowrap fw-light fs-6 border col-4 col-lg-2 mb-2 mt-1 mb-lg-0 me-lg-1';

    async function getData() {
      try {
        const response = await axios.get(`https://restcountries.com/v2/alpha/${i.toLowerCase()}`);
        let data = response.data.name;
        span.innerHTML = data;

      } catch (error){
        console.log(error);
      }
    }
    getData();
    borders.append(span);
    span.addEventListener("click", handleBorderClick); 
  })
}
createDetailCard(country);

function clearCards() {
  document.querySelectorAll(".clear").forEach(i => {
    i.innerText = "";
  });
}

async function handleBorderClick(e) {
  let borderCountry = e.target.innerText;
  try {
    const response = await axios.get(`https://restcountries.com/v2/name/${borderCountry}`);
    clearCards();
    createDetailCard(response.data[0]);
  } catch (error){
    console.log(error);
  }
}