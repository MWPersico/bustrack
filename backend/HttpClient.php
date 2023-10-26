<?php
// Classe que recebe requisições, encaminha para um objeto do tipo Parser e retorna o conteúdo para o chamador;
class HttpClient
{
    private Parser $parser;
    public function __construct(Parser $parser)
    {
        $this->parser = $parser;
    }

    public function getData(string $url): object
    {
        $data = $this->parser->parse(file_get_contents($url));
        return $data;
    }
}
