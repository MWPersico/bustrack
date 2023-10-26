//Classe com todas as operações básicas do sistema, trabalha com conjunto com o HttpClient e lida com dados de veículos
import HttpClient from "./HttpClient.js";
export default
class VehicleMethods{
    httpClient = new HttpClient();

    async registerVehicle(data){
        let normalizedData = data;
        normalizedData.name = normalizeString(data.name);
        normalizedData.type = normalizeString(data.type);
        return this.httpClient.doPost("register", JSON.stringify(data));
    }
    
    async getVehicle(id){
        let data = await this.httpClient.doGet("vehicle/"+id);
        return JSON.parse(data);
    }
    
    deleteVehicle(id){
        return this.httpClient.doGet("delete/"+id);
    }
    
    async updateCoordinates(id, coords){
        let body = {
            "id":id,
            "coords":[coords[0], coords[1]]
        }
        return this.httpClient.doPost("update", JSON.stringify(body));
    }
    
    async reverseGeocode(id){
        let data = await this.httpClient.doGet("geocode/"+id);
        return JSON.parse(data).addresses[0].address;
    }
    
    async  calculateRoute(coords1, coords2){
        let data = await this.httpClient.doGet("route/"+`${coords1[0]},${coords1[1]}/${coords2[0]},${coords2[1]}`);
        return JSON.parse(data).routes[0].summary;
    }
    
    clearDatabase(){
        return this.httpClient.doGet("clear");
    }
    
    async getColumn(column){
        let data = await this.httpClient.doGet("column/"+column);
        return data;
    }
    
    async getData(){
        let data = await this.httpClient.doGet("data");
        return data;
    }
    
    normalizeString(string){
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
}