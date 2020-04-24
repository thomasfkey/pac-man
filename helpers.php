<?php
function dbConnect()
{
    try{
        $db = new PDO('mysql:host=localhost:3306;dbname=dv19eyaa;charset=utf8', 'dv19eyaa', 'rSt~z040', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    }
    catch (Exception $exception)
    {
        die( 'Erreur : ' . $exception->getMessage() );
    }

    return $db;
}
