<?php
// Classe com informações de localização, estão relacionadas aos objetos do tipo Trackable;
class Coordinates
{
    private float $lat;
    private float $long;
    private DateTime $time;

    public function __construct(array $coords)
    {
        $this->lat = $coords[0];
        $this->long = $coords[1];
        date_default_timezone_set('Etc/GMT+3');
        $this->time = new DateTime();
    }

    public function getCoordinates(): ?array
    {
        if ($this->lat) {
            return [$this->lat, $this->long, $this->getTime()];
        }
        return null;
    }

    public function setCoordinates(array $coords)
    {
        $this->lat = $coords[0];
        $this->long = $coords[1];
    }

    public function getTime(): string
    {
        return $this->time->format("Y-m-d H:i:s");
    }
}
