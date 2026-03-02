
async function searchCountry(countryName) {
    try {
        const container = document.getElementById("country-info");
        // Show loading spinner
        
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
         if (!response.ok) {
            container.innerHTML = "Country does not exist. Try again!";
            return;
        }
        const data = await response.json();
        const country = data[0];
       
        // Update DOM

        
        container.innerHTML = `
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <img src="${country.flags.svg}" alt="${country.name.common} flag">
`;
        // Fetch bordering countries
    const borderContainer = document.getElementById("bordering-countries");
borderContainer.innerHTML = "";

const border_countries = country.borders || [];

if (border_countries.length === 0) {
    borderContainer.innerHTML = "<p>No bordering countries</p>";
    return;
}

// Single API request (cleaner + faster)
const response2 = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${border_countries.join(",")}`
);

const borderData = await response2.json();

// Create a simple unordered list
let listHTML = "<h3>Bordering Countries:</h3><ul>";

borderData.forEach(borderCountry => {
    listHTML += `<li>${borderCountry.name.common}</li>`;
});

listHTML += "</ul>";

borderContainer.innerHTML = listHTML;

        // Update bordering countries section
    } catch (error) {
        // Show error message
       
    } finally {
        // Hide loading spinner
    }
}


document.getElementById("search-btn").addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});