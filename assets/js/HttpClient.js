// Classe para realizar requisições HTTP via AJAX para a API
import {REQ_URL} from "./config.js";
export default
class HttpClient{
  doPost(path, body){
    return new Promise(function (resolve, reject) {
      let xhttp = new XMLHttpRequest();
      xhttp.open("POST", REQ_URL+path, true);
      xhttp.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            resolve(xhttp.response);
        } else {
            reject({
              status: this.status,
              statusText: xhttp.statusText
            });
        }
      };
      xhttp.onerror = function () {
        reject({
          status: this.status,
          statusText: xhttp.statusText
        });
      };
      xhttp.send(body);
    });
  }

  doGet(path){
    return new Promise(function (resolve, reject) {
      let xhttp = new XMLHttpRequest();
      xhttp.open("GET", REQ_URL+path, true);
      xhttp.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            resolve(xhttp.response);
        } else {
            reject({
              status: this.status,
              statusText: xhttp.statusText
            });
        }
      };
      xhttp.onerror = function () {
        reject({
          status: this.status,
          statusText: xhttp.statusText
        });
      };
      xhttp.send();
    });
  }
}