
async function searchCountry(countryName) {
    const spinner = document.getElementById("loading-spinner");
    const container = document.getElementById("country-info");
    const borderContainer = document.getElementById("bordering-countries");
    const errorMessage = document.getElementById("error-message");

    container.innerHTML = "";
    borderContainer.innerHTML = "";
    errorMessage.textContent = "";
    try {
        
        // Show loading spinner

        // Fetch country data
        spinner.style.display="block";
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
         if (!response.ok) {
            throw new Error("Country not found, please try again!");
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
    
   
const border_countries = country.borders || [];

if (border_countries.length === 0) {
    borderContainer.innerHTML = "<p>No bordering countries</p>";
    return;
}

else{
    const response2 = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${border_countries.join(",")}`
);

const borderData = await response2.json();

// Create a simple unordered list
let listHTML = "<h3>Bordering Countries:</h3><ul>";

borderData.forEach(borderCountry => {
    listHTML += `
    <li>
        ${borderCountry.name.common}
        <img src="${borderCountry.flags.svg}" width="100">
    </li>
`;
});

listHTML += "</ul>";

borderContainer.innerHTML = listHTML;
}// Single API request (cleaner + faster)


        // Update bordering countries section
    } catch (error) {
        
        errorMessage.textContent = "Country does not exist, Please try again!";
       
    } finally {
        // Hide loading spinner
        spinner.style.display = "none";
    }
}


document.getElementById("search-btn").addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});