document.getElementById("fetchDataBtn").addEventListener("click", fetchData);

function fetchData() {
    var term = document.getElementById("term").value;
    var location = document.getElementById("location").value;

    // Fetching data from your local server which further fetches from Yelp API
    fetch(`/search?term=${term}&location=${location}`)
        .then(response => response.json())
        .then(data => displayBusinesses(data))
        .catch(error => console.error('Error:', error));
}

function displayBusinesses(data) {
    var output = "";
    for (var i = 0; i < data.businesses.length; i++) {
        var business = data.businesses[i];
        output += `
            <div class="business">
                <h2>${business.name}</h2>
                <p>Address: ${business.location.display_address.join(', ')}</p>
                <p>Phone: ${business.display_phone}</p>
                <a href="${business.url}" target="_blank">Visit on Yelp</a>
            </div>
        `;
    }
    
    document.getElementById("apiDataDisplay").innerHTML = output;
}
