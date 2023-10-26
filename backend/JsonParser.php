<?php
// Classe para tratar e retornar conteúdo do tipo .json;
require_once "interfaces/Parser.php";
class JsonParser implements Parser
{
    public function Parse(string $data): object
    {
        return json_decode($data);
    }
}
