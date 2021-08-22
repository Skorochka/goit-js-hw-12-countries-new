import { alert, notice, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import refs from './js/refs.js'
import templateCountryCard from './templates/templateCountryCard.hbs'

// debounce(fn, 500)

refs.input.addEventListener('input', debounce(onInputChanged, 1500))




function onInputChanged(e) {
    let searchQuery = e.target.value
    refs.conteiner.innerHTML = ''

    fetchCountries(searchQuery)


    function fetchCountries(searchQuery) {
    fetch(
        `https://restcountries.eu/rest/v2/name/${searchQuery}`
    ).then(r => r.json()).then(data => {
        return amountOfCountries(data)
    }
    ).catch(arror => error(errorTryAgain))
}
}
   



const textError = { text: 'Too many matches found. Please enter a more specific query.' }
const  errorTryAgain = { text: 'Too many matches found. Please enter a more specific query.' }



function amountOfCountries(data) {
    if (data.length >= 10) {
        return error(textError)
    } else if (data.length < 10 && data.length > 1) {
        renderCollection(data)
        
    } else {
        refs.conteiner.insertAdjacentHTML('beforeend', templateCountryCard(data))
    }
    
}




function createListCounties({name}) {
    const list = `
     <ul class="counties-list">
            <li class="contries-item">${name}</li>
        </ul>
    `
    refs.conteiner.insertAdjacentHTML('beforeend', list)
}

function renderCollection(data) {
    data.forEach(el => createListCounties(el))
}
