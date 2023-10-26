<?php
// Interface que define contrato para classes que tratam conteúdo de arquivos;
interface Parser
{
    public function Parse(string $data): object;
}
