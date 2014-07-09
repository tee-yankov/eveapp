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
$getChar = new Pheal($keyID, $vCode, "char");
$getEve = new Pheal($keyID, $vCode, "eve");

//Obtain the characterID
try {
    $response = $getAccount->Characters();
    $characters = (array)$response->characters;
    $length = count($characters);
    if ($length == 1) {
        $characterID = $characters[0]->characterID;
    } elseif ($length == 2) {
        $characterID = $characters[0]->characterID;
        $characterID2 = $characters[1]->characterID;
    } elseif ($length == 3) {
        $characterID = $characters[0]->characterID;
        $characterID2 = $characters[1]->characterID;
        $characterID3 = $characters[2]->characterID;
    }
} catch (\Pheal\Exceptions\PhealException $e) {
    echo sprintf(
        "an exception was caught! Type: %s Message: %s",
        get_class($e),
        $e->getMessage()
    );
}

//Obtain CharSheet data
try {
	$response = $getChar->CharacterSheet(array("characterID" => $characterID));

} catch (\Pheal\Exceptions\PhealException $e) {
    echo sprintf(
        "an exception was caught! Type: %s Message: %s",
        get_class($e),
        $e->getMessage()
    );
}

//Obtain CharacterInfo data
try {
	$response2 = $getEve->CharacterInfo(array("characterID" => $characterID));
} catch (\Pheal\Exceptions\PhealException $e) {
    echo sprintf(
        "an exception was caught! Type: %s Message: %s",
        get_class($e),
        $e->getMessage()
    );
}

//Release all data
$returnData = json_encode(array(
	"name" => $response->name,
	"corpName" => $response->corporationName,
	"balance" => $response->balance,
	"characterID" => $characterID,
	"skillPoints" => $response2->skillPoints,
	"shipTypeName" => $response2->shipTypeName,
	"shipName" => $response2->shipName
	));
print_r($returnData);

?>
