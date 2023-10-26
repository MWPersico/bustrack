<?php
// Interface que define contrato para classes gerenciadoras de bancos de dados;
interface DBHandler
{
    public function connect(string $hostname, string $username, string $password, string $database);
    public function delete(int $objectId);
    public function update(int $objectId, object $objectData);
    public function read(int $objectId);
    public function add(object $objectData);
    public function reset();
    public function readAll();
    public function getColumn(string $column);
}
