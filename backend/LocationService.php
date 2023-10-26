<?php
// Classe que lida com os principais serviços relacionados a localização de objetos no sistema;
require_once "config.php";
class LocationService
{
    private HttpClient $httpClient;

    public function __construct(HttpClient $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    public function trackObject(Trackable $object, array $coords)
    {
        return $object->setCoordinates($coords);
    }

    public function getLocation(array $coords): object
    {
        $url = "https://api.tomtom.com/search/2/reverseGeocode/$coords[0],$coords[1].json?key=" . APIKEY . "&radius=10";
        return $this->httpClient->getData($url);
    }

    public function calculateRoute(string $url): object
    {
        return $this->httpClient->getData($url);
    }
}
