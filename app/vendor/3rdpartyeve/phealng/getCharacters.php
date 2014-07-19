<?php
require_once 'vendor/autoload.php';

use Pheal\Pheal;
use Pheal\Core\Config;

$data = file_get_contents("php://input");
$objData = json_decode($data);
$array =  (array) $objData;
$keyID = $array['keyId'];
$vCode = (string)$array['vCode'];

Config::getInstance()->cache = new \Pheal\Cache\FileStorage('./tmp/phealcache/');

Config::getInstance()->access = new \Pheal\Access\StaticCheck();

$getAccount = new Pheal($keyID, $vCode, "account");

// Obtain the characterID
try {
	$response = $getAccount->Characters();
	$characters = $response->characters;
	$length = count($characters);
} catch (\Pheal\Exceptions\PhealException $e) {
    echo sprintf(
        "an exception was caught! Type: %s Message: %s",
        get_class($e),
        $e->getMessage()
    );
}

$character1Info = [
	"name" => $characters[0]->name,
	"characterID" => $characters[0]->characterID,
	"corporationName" => $characters[0]->corporationName
	];

$character2Info = [
	"name" => $characters[1]->name,
	"characterID" => $characters[1]->characterID,
	"corporationName" => $characters[1]->corporationName
];

$character3Info = [
	"name" => $characters[2]->name,
	"characterID" => $characters[2]->characterID,
	"corporationName" => $characters[2]->corporationName
];

$length = count($characters);
switcH($length) {
	case 1:
		$returnData = json_encode(array(
			"character1" => $character1Info
			));
		break;
	case 2:
		$returnData = json_encode(array(
			"character1" => $character1Info,
			"character2" => $character2Info
			));
		break;
	case 3:
		$returnData = json_encode(array(
			"character1" => $character1Info,
			"character2" => $character2Info,
			"character3" => $character3Info
			));
		break;
}
echo ($returnData);

 ?>