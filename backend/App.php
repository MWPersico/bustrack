<?php
require_once "LocationService.php";
require_once "JsonParser.php";
require_once "HttpClient.php";
require_once "config.php";
// Classe principal do sistema, faz uso do restante das classes de maneira ordenada e lida com requisições;
class App
{
    private array $vehicles = array();
    private DBHandler $dbHandler;
    private LocationService $locationService;

    public function __construct()
    {
        $this->dbHandler = new VehicleDBService(DBHOST, DBUSER, DBPASSWORD, DBNAME);
        $jsonParser = new JsonParser();
        $httpClient = new HttpClient($jsonParser);
        $this->locationService = new LocationService($httpClient);
        $this->setVehicles();
    }

    public function registerVehicle(string $name, string $type, float $avgSpeed)
    {
        $vehicle = new Vehicle($name, $type, $avgSpeed, $this->dbHandler);
        $this->setVehicles();
    }

    public function deleteVehicle(int $id)
    {
        $this->dbHandler->delete($id);
    }

    public function updateCoordinates(int $vehicleId, array $coords)
    {
        $this->vehicles[$vehicleId]->setCoordinates($coords);
    }

    public function clearDatabase()
    {
        $this->dbHandler->reset();
    }

    public function getVehicle(int $vehicleId): Vehicle
    {
        return $this->vehicles[$vehicleId];
    }

    public function reverseGeocoding(int $vehicleId): object
    {
        return $this->vehicles[$vehicleId]->reverseGeocoding($this->locationService);
    }

    public function calculateRoute(array $coordsFrom, array $coordsTo): object
    {
        $url = "https://api.tomtom.com/routing/1/calculateRoute/$coordsFrom[0],$coordsFrom[1]:$coordsTo[0],$coordsTo[1]/json?&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=" . APIKEY;
        return $this->locationService->calculateRoute($url);
    }

    public function getColumn(string $column): ?array
    {
        return $this->dbHandler->getColumn($column);
    }

    public function getTable(): ?array
    {
        return $this->dbHandler->readAll();
    }

    public function setVehicles()
    {
        $vehicles = $this->dbHandler->readAll();
        if ($vehicles) {
            foreach ($vehicles as $vehicle) {
                $object = new Vehicle($vehicle["name"], $vehicle["vehicleType"], $vehicle["avgSpeed"], $this->dbHandler);
                $object->setId($vehicle["vehicleId"]);
                if ($vehicle["lastTrack"]) {
                    $object->setCoordinates([$vehicle["lat"], $vehicle["long"]]);
                }
                $this->vehicles[$vehicle["vehicleId"]] = $object;
            }
        }
    }
}
