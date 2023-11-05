//Arquivo para lidar com estilização e interação na página
import VehicleMethods from "./VehicleMethods.js";
import {API_KEY} from "./config.js";

const bustrack = new VehicleMethods();
const icons = document.querySelectorAll(".icon");
var map;
getUserLocation();

// Evento que pega a localização do veículo e exibe no mapa:
document.addEventListener("click", async ()=>{
    let marker = new tt.Marker(icons[0])
    .setLngLat(vehicleCoordinates(await bustrack.getVehicle(1)))
    .addTo(map);

    let marker2 = new tt.Marker(icons[1])
    .setLngLat(vehicleCoordinates(await bustrack.getVehicle(2)))
    .addTo(map);
});

// Requisita a posição do usuário para exibição do mapa:
function getUserLocation(){
    try{
        navigator.permissions.query({ name: "geolocation" });
        navigator.geolocation.getCurrentPosition(setMap);
    }catch(ex){console.log(console.log(ex.message), "Você deve permitir que tenhamos acesso a sua localização!")}
}

// Inicia e configura o mapa TOMTOM
function setMap(location){
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    const APPLICATION_NAME = "bustrack";
    const APPLICATION_VERSION = "1.0";
    const CENTER = {lng:longitude, lat:latitude};
    tt.setProductInfo(APPLICATION_NAME, APPLICATION_VERSION);
    map = tt.map({
        key:API_KEY,
        container:"map",
        center:CENTER,
        zoom:17
    });
}

//Extrai as coordenadas de um veículo
function vehicleCoordinates(vehicle){
    return [vehicle.long, vehicle.lat];
}

//TODO: Personalizar marcadores, formatar mapa, setInterval para attualizar posição e etc;

// let vehicle1 = await bustrack.getVehicle(1);
// let vehicle2 = await bustrack.getVehicle(2);