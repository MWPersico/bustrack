<?php
// Arquivo base para processar e encaminhar requisições get e post para a classe App e controlar ações do usuário através das requisições
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=utf-8");

require_once "./backend/App.php";
require_once "./backend/VehicleDBService.php";
require_once "./backend/Vehicle.php";
require_once "./backend/Coordinates.php";

global $app;
$app = new App();
$url = (isset($_GET['url'])) ? $_GET['url'] : showApp();
$url = array_filter(explode('/', $url));

switch ($url[0]) {
    case "app.html":require_once "./app.html"; break;
    case "register":register(); break;
    case "update":update(); break;
    case "clear":clear(); break;
    case "vehicle":getVehicle($url[1]);break;
    case "column":getColumn($url[1]);break;
    case "data":getData();break;
    case "delete":deleteVehicle($url[1]);break;
    case "geocode":reverseGeocoding($url[1]);break;
    case "route":calculateRoute($url[1], $url[2]);break;
    default: echo "A página ".$url[0]." não existe";
}

function register(){
    global $app;
    if(isset($_POST)){
        $data = json_decode(file_get_contents('php://input'));
        try{
            $app->registerVehicle($data->name, $data->type, $data->avgSpeed);
        }catch(Exception $ex){
            echo "Os dados passados podem estar incorretos";
            $ex->getMessage();
        }
        echo "Veículo ".$data->name." registrado!";
        return;
    }else{
        die("Erro: O corpo da requisição deve conter dados para registro do veículo");
    }
}

function update(){
    global $app;
    if(isset($_POST)){
        $data = json_decode(file_get_contents("php://input"));
        try{
            $app->updateCoordinates($data->id, $data->coords);
        }catch(Exception $ex){
            echo "Os dados passados podem estar incorretos";
            echo $ex->getMessage();
        }
        echo "Veículo de ID: ".$data->id." atualizado!";
        return;
    }else{
        die("Erro: O corpo da requisição deve conter dados para atualizar veículo");
    }
    
}

function getVehicle($id){
    global $app;
    if($id){
        try{
            $vehicle = $app->getVehicle($id);
        }catch(Exception $ex){
            echo "Erro ao recuperar veículo de id: ".$id;
        }
        $data = [
            "id"=> $vehicle->getId(),
            "name"=> $vehicle->getName(),
            "type"=> $vehicle->getType(),
            "avgSpeed"=> $vehicle->getAvgSpeed(),
        ];
        $data = $vehicle->getCoordinates()? array_merge($data, $vehicle->getCoordinates()):$data;
        echo json_encode($data);
    }else{
        die("Você deve inserir um id como parâmetro");
    }
}

function deleteVehicle($id){
    global $app;
    if($id){
        try{
            $app->deleteVehicle($id);
            echo "Veículo de id ".$id." deletado!";
            return;
        }catch(Exception $ex){
            echo "Falha ao deletar veículo de id: ".$id;
        }
    }    
    die("Você deve inserir um id como parâmetro");
}

function reverseGeocoding($id){
    global $app;
    if($id){
        try{
            $data = $app->reverseGeocoding($id);
            echo json_encode($data);
            return;
        }catch(Exception $ex){
            echo "Falha ao extrair dados do veículo de id: ".$id;
        }
    }else{
        die("Você deve inserir um id como parâmetro");
    } 
}

function calculateRoute($coords1, $coords2){
    global $app;
    if($coords1 && $coords2){
        $data1 = explode(",", $coords1);
        $data2 = explode(",", $coords2);
        $coord1 = [$data1[0], $data1[1]];
        $coord2 = [$data2[0], $data2[1]];
        try{
            $data = $app->calculateRoute($coord1, $coord2);
            echo json_encode($data);
        }catch(Exception $ex){
            echo "Não foi possível calcular a rota entre os pontos";
        }
    }else{
        die("As coordenadas devem ser informadas");
    }
    
}

function getColumn($column){
    global $app;
    try{
        $data = $app->getColumn($column);
        echo json_encode($data);
    }catch(Exception $ex){
        echo "Erro ao recuperar a coluna ".$column;
    }
}

function getData(){
    global $app;
    try{
        $data = $app->getTable();
        echo json_encode($data);
        return;
    }catch(Exception $ex){
        echo "Falha ao recuperar dados";
    }
}

function clear(){
    global $app;
    try{
        $app->clearDatabase();
        echo "Base de dados resetada!";
        return;
    }catch(Exception $ex){
        echo $ex->getMessage();
    }
    die("Erro: Falha ao resetar a base de dados");
}

function showApp(){
    header("Content-Type: text/html; charset=utf-8");
    return "app.html";
}