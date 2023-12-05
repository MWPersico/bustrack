<?php
// Classe com informações de localização, estão relacionadas aos objetos do tipo Trackable;
date_default_timezone_set('Etc/GMT+3');
class Coordinates
{
    private ?float $lat;
    private ?float $long;
    private DateTime $time;

    public function __construct(){
        $this->lat = null;
        $this->long = null;
    }

    public function getCoordinates(): ?array
    {
        if ($this->lat!=null) {
            return [$this->lat, $this->long, $this->getTime()];
        }
        return null;
    }

    public function setCoordinates(array $coords, DateTime $time)
    {
        $this->lat = $coords[0];
        $this->long = $coords[1];
        $this->time = $time;
    }

    public function getTime(): string
    {
        return $this->time->format("Y-m-d H:i:s");
    }
}