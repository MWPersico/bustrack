//Arquivo para lidar com estilização e interação na página
import VehicleMethods from "./VehicleMethods.js";
import {API_KEY} from "./config.js";

const bustrack = new VehicleMethods();
var map;
var markers;
var markerList = {}
const modal = document.getElementById("modal");
const markerIcons = {
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
    markerList['user'] = new tt.Marker()
    .setLngLat(CENTER)
    .addTo(map)

    var data = await bustrack.getData();
    data.forEach(vehicle=>{
        markerList[vehicle.vehicleId] = new tt.Marker(getMarker(vehicle))
        .setLngLat(getVehicleCoordinates(vehicle))
        .addTo(map);
    })
    setMarkersEvent();
}

//Extrai as coordenadas de um veículo
function getVehicleCoordinates(vehicle){
    return [vehicle.long, vehicle.lat];
}

// Retorna o marcador referente ao tipo de objeto
function getMarker(vehicle){
    if(Object.hasOwn(markerIcons, vehicle.vehicleType)){
        return markerIcons[vehicle.vehicleType];
    }
    return markerIcons.default;
}

function setMarkersEvent(){
    markers = document.querySelectorAll(".marker")
    .forEach(marker=>marker.addEventListener("click", (e)=>{
        for(var [key, value] of Object.entries(markerList)){
            if(e.target == value._element || e.target.offsetParent == value._element){
                getMarkerData(key);
                return;
            }
            
        }
    }));
}

async function getMarkerData(vehicleId){
    let vehicle = await bustrack.getVehicle(vehicleId);
    let userCoords = [markerList.user._lngLat.lng, markerList.user._lngLat.lat];
    let vehicleCoords = getVehicleCoordinates(vehicle);
    let route = await bustrack.calculateRoute(userCoords, vehicleCoords, vehicle.avgSpeed);
    let location = await bustrack.reverseGeocode(vehicleId);
    setModal(location, route);   
}

function setModal(location, route){
    let content = `
        <i id="closeModal" class="fa-solid fa-x"></i>
        <p>Rua: ${location.street} - ${location.countrySubdivisionCode}</p>
        <p>Município: ${location.municipality}</p>
        <p>Distância: ${(route.lengthInMeters/1000).toFixed(2)} quilômetros</p>
        <p>Tempo: ${Math.round(route.travelTimeInSeconds/60)} minutos</p>
        <p>Saída: ${getTime(route.departureTime)}</p>
        <p>Chegada: ${getTime(route.arrivalTime)}</p>

    `
    modal.innerHTML = content;
    modal.style.display = 'block';
    document.getElementById("closeModal").addEventListener("click", ()=>modal.style.display = 'none');
}

function getTime(time){
    let date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
}