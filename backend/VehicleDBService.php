<?php
// Gerenciador de banco de dados relacional do sistema, contém os métodos para lidar com serialização e persistência;
require_once "interfaces/DBHandler.php";
class VehicleDBService implements DBHandler
{
    private mysqli $connection;

    public function __construct(string $server, string $name, string $password, string $database)
    {
        $this->connect($server, $name, $password, $database);
    }

    public function add(object $vehicleData)
    {
        $name = $vehicleData->getName();
        $speed = $vehicleData->getAvgSpeed();
        $type = $vehicleData->getType();
        $names = $this->getColumn("name");
        $registrado = false;
        $query = "INSERT INTO vehicles(`name`, `avgSpeed`, `vehicleType`) VALUES('$name', $speed, '$type')";
        try {
            foreach ($names as $element) {
                if ($name == $element) {
                    $registrado = true;
                    break;
                }
            }
            if (!$registrado) {
                $this->connection->query($query);
            }
        } catch (mysqli_sql_exception $ex) {
            die("Erro ao adicionar dados: " . $ex->getMessage());
        }
    }

    public function read(int $vehicleId): array
    {
        $query = "SELECT FROM vehicles WHERE `id` LIKE '$vehicleId'";
        try {
            $array = $this->connection->query($query)->fetch_assoc();
            return $array;
        } catch (mysqli_sql_exception $ex) {
            die("Erro ao ler dados: " . $ex->getMessage());
        }
        return null;
    }

    public function delete(int $vehicleId)
    {
        $query = "DELETE FROM vehicles WHERE vehicleId = '$vehicleId'";
        try {
            $this->connection->query($query);
        } catch (mysqli_sql_exception $ex) {
            die("Erro ao deletar dados: " . $ex->getMessage());
        }
    }

    public function update(int $vehicleId, object $vehicleData)
    {
        $name = $vehicleData->getName();
        $coords = $vehicleData->getCoordinates();
        $speed = $vehicleData->getAvgSpeed();
        $type = $vehicleData->getType();
        $lat = $coords["lat"];
        $long = $coords["long"];
        $time = $coords["time"];
        $query = "UPDATE vehicles SET `name` = '$name', `lat` = $lat, `long` = $long, `avgSpeed` = $speed, `vehicleType` = '$type', `lastTrack` = '$time' WHERE `vehicleId` = $vehicleId";
        try {
            $this->connection->query($query);
        } catch (mysqli_sql_exception $ex) {
            die("Erro ao atualizar dados: " . $ex->getMessage());
        }
    }

    public function reset()
    {
        $query = "TRUNCATE TABLE vehicles";
        try {
            $this->connection->query($query);
        } catch (mysqli_sql_exception $ex) {
            die("Erro ao resetar tabela: " . $ex->getMessage());
        }
    }

    public function readAll(): ?array
    {
        $query = "SELECT * FROM vehicles";
        try {
            $action = $this->connection->query($query);
            $array = [];
            while ($row = $action->fetch_assoc()) {
                array_push($array, $row);
            }
            return $array;
        } catch (mysqli_sql_exception $ex) {
            die("Erro ao ler dados: " . $ex->getMessage());
        }
        return null;
    }

    public function getColumn(string $column): ?array
    {
        $query = "SELECT `$column` FROM vehicles";
        try {
            $action = $this->connection->query($query);
            $array = [];
            while ($row = $action->fetch_column()) {
                array_push($array, $row);
            }
            return $array;
        } catch (mysqli_sql_exception $ex) {
            die("Erro ao ler dados: " . $ex->getMessage());
        }
        return null;
    }

    public function connect($server, $name, $password, $database)
    {
        try {
            $this->connection = new mysqli($server, $name, $password, $database);
        } catch (mysqli_sql_exception $ex) {
            die("Erro ao conectar com o banco de dados: " . $ex->getMessage());
        }
    }
}
