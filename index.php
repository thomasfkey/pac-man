<?php

require 'helpers.php';

if(isset($_GET['controller'])){

    switch ($_GET['controller']) {
        case 'user' :
            require 'controllers/userController.php';
            break;
        case 'score' :
            require 'controllers/scoreController.php';
            break;
        default :
            require 'controllers/indexController.php';
    }
}
else{
    require 'controllers/indexController.php';
}