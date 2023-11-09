//Arquivo para lidar com estilização e interação na página
import VehicleMethods from "./VehicleMethods.js";
import {API_KEY} from "./config.js";

const bustrack = new VehicleMethods();
var markerList = {}
var map;
const markers = {
    bus:document.querySelector(".bus"),
    car:document.querySelector(".car"),
    person:document.querySelector(".person"),
    default:``
};
getUserLocation();

// Evento que pega a localização do veículo e exibe no mapa:
document.addEventListener("click", async ()=>{
    var data = await bustrack.getData();
    data.forEach(vehicle=>{
        markerList[vehicle.vehicleId]
        .setLngLat(getVehicleCoordinates(vehicle));
    })
});

// Requisita a posição do usuário para exibição do mapa:
function getUserLocation(){
    try{
        navigator.permissions.query({ name: "geolocation" });
        navigator.geolocation.getCurrentPosition(setMap);
    }catch(ex){console.log(ex.message, "Você deve permitir que tenhamos acesso a sua localização!")}
}

// Configura e inicia o mapa TomTom com marcador do usuário:
async function setMap(location){
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
    new tt.Marker()
    .setLngLat(CENTER)
    .addTo(map)

    var data = await bustrack.getData();
    data.forEach(vehicle=>{
        markerList[vehicle.vehicleId] = new tt.Marker(getMarker(vehicle))
        .setLngLat(getVehicleCoordinates(vehicle))
        .addTo(map);
    })
}

//Extrai as coordenadas de um veículo
function getVehicleCoordinates(vehicle){
    return [vehicle.long, vehicle.lat];
}

// Retorna o marcador referente ao tipo de objeto
function getMarker(vehicle){
    if(Object.hasOwn(markers, vehicle.vehicleType)){
        return markers[vehicle.vehicleType];
    }
    return markers.default;
}