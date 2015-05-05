<?php

ini_set('display_errors', 1);
error_reporting(~0);

if (!@include './ProxyHandler.class.php') {
    die('Could not load proxy');
}

$proxy = new ProxyHandler('http://192.168.1.183:8080/bdo-nrs-api', 3);

// Check for a success
if ($proxy->execute()) {
    // print_r($proxy->getCurlInfo()); // Uncomment to see request info
} else {
    echo $proxy->getCurlError();
}

$proxy->close();
