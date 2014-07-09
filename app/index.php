<?php 
$data = file_get_contents("php://input");
$objData = json_decode($data);

$array =  (array) $objData;

print_r($array['keyId']);
?>