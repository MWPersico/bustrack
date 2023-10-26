//Arquivo para lidar com estilização e interação na página
import VehicleMethods from "./VehicleMethods.js";

const methods = new VehicleMethods();

//TODO: Manipulação de elementos e disparo de funções do app;
//TODO: Interface provisória, registro e atualização de coordenadas e exibição no mapa;

//navigator.permissions.query({ name: "geolocation" });

// function getCoordinates(location){
//     let latitude = location.coords.latitude;
//     let longitude = location.coords.longitude;
//     loadData(latitude, longitude);
// }
// const API_KEY = "kpqDhyEOa0WdZTjmzmMVFo1AhQnu1565";
// const APPLICATION_NAME = "bustrack";
// const APPLICATION_VERSION = "1.0";
// const CASA = {lng:-46.747917, lat:-23.285769}
// const icons = document.querySelectorAll(".icon");
// tt.setProductInfo(APPLICATION_NAME, APPLICATION_VERSION);
// var map = tt.map({
//     key:API_KEY,
//     container:"map-div",
//     center:CASA,
//     zoom:17
// });

// document.addEventListener("click", ()=>{
//     let marker = new tt.Marker(icons[0])
//     .setLngLat([-46.747917,-23.28568])
//     .addTo(map);

//     let marker1 = new tt.Marker(icons[1])
//     .setLngLat([-46.747,-23.28536])
//     .addTo(map);

//     var lat = -23.28536;
//     var long = -46.747;

//     setInterval(()=>{
//         lat += 0.000002
//         long -= 0.00001;
//         marker1.setLngLat([long, lat]);
//     }, 200)
// })