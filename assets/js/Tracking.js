import VehicleMethods from "./VehicleMethods.js";

const view = document.getElementById("view");
const msg = document.getElementById("msg");
const bustrack = new VehicleMethods();
const vehicleId = new URLSearchParams(window.location.search).get("id");
const trackingInterval = 5;

document.getElementById("action").addEventListener("click", e=>{
    setInterval(()=>{
        try{
            navigator.permissions.query({name: "geolocation"});
            navigator.geolocation.getCurrentPosition(tracking);
        }catch(ex){
            trackingError(ex);
        }
    }, trackingInterval*1000)
    e.target.remove();
    msg.style.display = "inline-block";
})

//Pega as coordenadas do usuário
async function tracking(location){
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    if(latitude){
        view.innerHTML = `
        <p>Latitude = ${latitude}</p>
        <p>Longitude = ${longitude}</p>
        <p>Last track = ${currentTime()}</p>
        `;
        await bustrack.updateCoordinates(vehicleId, [latitude, longitude]);
    }else{
        view.innerHTML = `<p>Não foi possível rastrear...</p>`;
    }
}

function trackingError(ex){
    view.innerHTML += `<p>Error: ${ex.message}</p>`
}

function currentTime(){
    let date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}