//Arquivo para lidar com estilização e interação na página
import VehicleMethods from "./VehicleMethods.js";
import {API_KEY} from "./config.js";

const bustrack = new VehicleMethods();
const markers = {
    bus:document.querySelector(".bus"),
    car:document.querySelector(".car"),
    person:document.querySelector(".person"),
    default:'a'
};
var map;
getUserLocation();



// Evento que pega a localização do veículo e exibe no mapa:
document.addEventListener("click", async ()=>{
    var data = await bustrack.getData();

    data.forEach(vehicle=>{
        new tt.Marker(getMarker(vehicle))
        .setLngLat(getVehicleCoordinates(vehicle))
        .addTo(map);
    })

    // let marker = new tt.Marker(getMarker(data[0]))
    // .setLngLat(getVehicleCoordinates(data[0]))
    // .addTo(map);
    
    // let marker2 = new tt.Marker(getMarker(data[1]))
    // .setLngLat(getVehicleCoordinates(data[1]))
    // .addTo(map);
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
function getVehicleCoordinates(vehicle){
    return [vehicle.long, vehicle.lat];
}

function getMarker(vehicle){
    if(Object.hasOwn(markers, vehicle.vehicleType)){
        return markers[vehicle.vehicleType];
    }
    return markers.default;
}
// //TODO: Personalizar marcadores, formatar mapa, setInterval para attualizar posição e etc;

// // let vehicle1 = await bustrack.getVehicle(1);
// // let vehicle2 = await bustrack.getVehicle(2);