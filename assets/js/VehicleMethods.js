//Classe com todas as operações básicas do sistema, trabalha com conjunto com o HttpClient e lida com dados de veículos
import HttpClient from "./HttpClient.js";
export default class VehicleMethods{
    httpClient = new HttpClient();

    async registerVehicle(data){
        let normalizedData = data;
        normalizedData.name = this.normalizeString(data.name);
        normalizedData.type = this.normalizeString(data.type);
        return await this.httpClient.doPost("register", JSON.stringify(data));
    }
    
    async getVehicle(id){
        let data = await this.httpClient.doGet("vehicle/"+id);
        try{
            return JSON.parse(data);
        }catch(ex){
            return data;
        }
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
        try{
            return JSON.parse(data).addresses[0].address;
        }catch(ex){
            return data;
        }
    }
    
    async  calculateRoute(coords1, coords2, speed){
        let data = await this.httpClient.doGet("route/"+`${coords1[1]},${coords1[0]}/${coords2[1]},${coords2[0]}/${speed}`);
        try{
            return JSON.parse(data).routes[0].summary;
        }catch(ex){
            return data;
        }
    }
    
    clearDatabase(){
        let data =  this.httpClient.doGet("clear");
        return data;
    }
    
    async getColumn(column){
        let data = await this.httpClient.doGet("column/"+column);
        try{
            return JSON.parse(data);
        }catch(ex){
            return data;
        }     
    }
    
    async getData(){
        let data =  JSON.parse(await this.httpClient.doGet("data"));
        try{
            return JSON.parse(data);
        }catch(ex){
            return data;
        }    
    }
    
    normalizeString(string){
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
}