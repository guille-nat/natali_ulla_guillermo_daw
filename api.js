

async function fetchData() {
    try {
        const container = document.getElementById("api-container");
        // if (container && container.textContent.trim() !== '') {


            container.innerHTML = `<sapn class="loading" >Consultando...<span>`

            const ciudad = String(document.getElementById("ciudad").value).toUpperCase();

            const url_lat_lon = `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1`;

            const response_lat_long = await fetch(url_lat_lon);
            if (!response_lat_long.ok) {
                container.innerHTML = `<sapn class="error" >HTTP error! status: ${response_lat_long.status}<span>`
                throw new Error(`HTTP error! status: ${response_lat_long.status}`);
            }

            const data_lat_lon = await response_lat_long.json();
            const data = data_lat_lon.results[0]

            const lat = data.latitude;
            const lon = data.longitude;


            const url_clima = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

            const clima = await fetch(url_clima);
            if (!clima.ok) {
                container.innerHTML = `<sapn class="error" >HTTP error! status: ${clima.status}<span>`
                throw new Error(`HTTP error! status: ${clima.status}`);
            }

            const response_clima = await clima.json()
            mostrarData(response_clima, ciudad)
        //} else {
            container.innerHTML = `<sapn class="error" >Debe seleccionar una ciudad.<span>`
        //}

    } catch (error) {
        container.innerHTML = `<sapn class="error"> Error al obtener el clima: ${error}<span>`
        console.error("Error fetching data:", error);
    }
}

async function mostrarData(data, ciudad) {
    const container = document.getElementById("api-container");
    container.innerHTML = `
    <div class="clima-content">
        <h2>Ciudad: ${ciudad} <h2>
        <p>Temperatura: ${data.current_weather.temperature} ${data.current_weather_units.temperature}<p>
        <p>Viento: ${data.current_weather.windspeed} ${data.current_weather_units.windspeed}<p>
        <p>Código meteorológico: ${data.current_weather.weathercode} ${data.current_weather_units.weathercode}<p>
    <div>
  `

}