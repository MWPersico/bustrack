import VehicleMethods from "./VehicleMethods.js";

const bustrack = new VehicleMethods();
const form = document.getElementById("vehicleForm");
const vehiclesTable = document.getElementById("vehicles");

document.addEventListener("load", getVehicles());

// Registro de novo veículo:
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let formData = new FormData(e.target);
    let formDataObj = {}
    for(const [key, value] of formData){
        formDataObj[key] = value;
    }
    await bustrack.registerVehicle(formDataObj);
    e.target.reset();
    getVehicles();
});

async function getVehicles(){
    let vehicles = await bustrack.getData();
    vehiclesTable.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Type</th>
        <th>Track</th>
        <th>Delete</th>
    </tr>`;
    for(let vehicle of vehicles){
        let row = `
        <tr vehicleid="${vehicle.vehicleId}">
            <td>${vehicle.vehicleId}</td>
            <td>${vehicle.name}</td>
            <td>${vehicle.vehicleType}</td>
            <td><i class="fa-solid fa-location-crosshairs trackVehicleBtn"></i></td>
            <td><i class="fa-solid fa-trash deleteVehicleBtn"></i></td>
        </tr>`;
        vehiclesTable.innerHTML +=row; 
    }
    vehicleActions();
}


// Aciona os eventos para deleção e rastreamento de veículos
function vehicleActions(){
    let deleteButtons = document.querySelectorAll(".deleteVehicleBtn");
    let trackButtons = document.querySelectorAll(".trackVehicleBtn");
    for(let button of deleteButtons){
        //Deleta veículo registrado
        button.addEventListener("click", async e=>{
            let row = e.target.parentElement.parentElement;
            await bustrack.deleteVehicle(row.getAttribute("vehicleid"));           
            row.remove()
        })
    }
    for(let button of trackButtons){
        //Começa a rastrear veículo registrado
        button.addEventListener("click", e=>{
            let row = e.target.parentElement.parentElement;
            window.location.href = `track?id=${row.getAttribute("vehicleid")}`;
        });
    }
}