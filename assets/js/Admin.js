import VehicleMethods from "./VehicleMethods.js";

const bustrack = new VehicleMethods();
const form = document.getElementById("vehicleForm");
const vehiclesTable = document.getElementById("vehicles");
const resetBtn = document.getElementById("resetBtn");

document.addEventListener("load", getVehicles());

// Registro de novo veículo:
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let formData = new FormData(e.target);
    let formDataObj = {}
    for(const [key, value] of formData){
        formDataObj[key] = value;
    }
    console.log(formDataObj)
    await bustrack.registerVehicle(formDataObj);
    e.target.reset();
    getVehicles();
});

resetBtn.addEventListener("click", async ()=>{
    await bustrack.clearDatabase();
    getVehicles();
})

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
            <td class="searchVehicleBtn">${vehicle.vehicleId}</td>
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
    let searchButtons = document.querySelectorAll(".searchVehicleBtn");
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
    for(let button of searchButtons){
        //Começa a rastrear veículo registrado
        button.addEventListener("click", e=>{
            let row = e.target.parentElement;
            window.location.href = `vehicle/${row.getAttribute("vehicleid")}`;
        });
    }
}