function fetchCountries(searchQuery) {
    fetch(
        `https://restcountries.eu/rest/v2/name/${searchQuery}`
    ).then(r => r.json())
}


export default fetchCountries