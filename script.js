const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities =[]
const searchInput =  document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');


async function getData (){
    let data = await fetch(endpoint)
    let res =await data.json()
    cities.push(...res)

 }
 getData()

 function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex)
    });
  }
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    console.log(matchArray.length)
    suggestions.innerHTML = matchArray.map(place =>{
        const reg = new RegExp(this.value,'gi')
        const cityName = place.city.replace(reg , `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(reg , `<span class="hl">${this.value}</span>`);
        return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>`}).join('');
  
   if(matchArray.length===0){
    suggestions.innerHTML =`
    <li>
    <span class="name">Not city found.🚩</span>
   
  </li>`
   }
  }
  
 
  
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);