<?php
// Classe do tipo Trackable, o objeto principal do nosso sistema, representam os veóculos do sistema;
require_once "interfaces/Trackable.php";
class Vehicle implements Trackable
{
    private int $id;
    private string $name;
    private string $type;
    private float $avgSpeed;
    private Coordinates $coordinates;
    private DBHandler $dbService;

    public function __construct(string $name, string $type, float $avgSpeed, DBHandler $dbService)
    {
        $this->name = $name;
        $this->type = $type;
        $this->avgSpeed = $avgSpeed;
        $this->dbService = $dbService;
        $this->dbService->add($this);
    }

    public function getCoordinates(): ?array
    {
        if (!empty($this->coordinates)) {
            $coords = $this->coordinates->getCoordinates();
            return array("lat" => $coords[0], "long" => $coords[1], "time" => $coords[2]);
        }
        return null;
    }

    public function setCoordinates(array $coords)
    {
        $this->coordinates = new Coordinates($coords);
        $this->dbService->update($this->id, $this);
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getAvgSpeed()
    {
        return $this->avgSpeed;
    }

    public function reverseGeocoding(LocationService $locationService): object
    {
        $coords = $this->getCoordinates();
        return $locationService->getLocation([$coords["lat"], $coords["long"]]);
    }
}
