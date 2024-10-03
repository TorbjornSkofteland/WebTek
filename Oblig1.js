let limit = 3;
let page = 1;


 
function fetchPost() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error: ' + response.status);
            }
            return response.json();
        })
        .then((posts) => {
            let container = document.getElementById("postTabell");
            posts.forEach((post) => {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = post.title;
                const body = document.createElement("p");
                body.textContent = post.body;
                article.appendChild(title);
                article.appendChild(body);
                container.appendChild(article);
                
            });
            page++;
        })
}

fetchPost();
fetchPost();

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
        fetchPost();
    }
});


function fetchWether(place, latitude, longitude) {
    console.log("fetch")
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error: ' + response.status);
            }
            return response.json();
        })
        .then((data) => {
            const article = document.getElementById(place); // Finn eksisterende <article>-element med ID lik place
                const body = article.querySelector('.data'); // Finn <p>-elementet med klassen 'data' inne i <article>
                body.innerHTML = `Temperature: ${data.current_weather.temperature} ${data.current_weather_units.temperature} <br>
                                  Wind Direction: ${data.current_weather.winddirection} ${data.current_weather_units.winddirection} <br>
                                  Wind Speed: ${data.current_weather.windspeed} ${data.current_weather_units.windspeed}`;
                                  console.log(`Updating for ${place}`);
        })
        
}
 
function UpdatWeather(){
    console.log("update");
    fetchWether("Sandefjord", 59.14, 10.2);
    fetchWether("Gjovik", 60.81, 10.59);
    fetchWether("Oslo", 59.91, 10.75);
    fetchWether("Bergen", 60.39, 5.32);
    fetchWether("Trondheim", 63.43, 10.39);
    fetchWether("Alta", 69.96, 23.27);
 
}
 
UpdatWeather();
setInterval(UpdatWeather, 6000);
