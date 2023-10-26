<?php
// Intefrace que define contrato para classes de objetos que podem ser rastreados pelo sistema;
interface Trackable
{
    public function setCoordinates(array $coords);
    public function getCoordinates(): ?array;
}
