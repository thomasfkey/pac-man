<?php

$db = dbConnect();
header("Access-Control-Allow-Origin: *");
$data = file_get_contents('php://input');
$json = json_decode($data);

$playerName = $json->{'player_name'};
$playerScore = $json->{'player_score'};

$response = new stdClass();

if($playerName == '' || $playerScore == ''){
    $response->type = 0;
    $response->msg = "Your score couldn't be saved";
    echo json_encode($response);
}
else {
    $requete = $db->prepare("SELECT * FROM player WHERE player_name = :playerName ");
    $requete->execute(
        [
            'playerName' =>  $playerName,
        ]
    );
    $playerExist = $requete->fetch();
    if($playerExist){
        if($playerExist['player_score']>$playerScore){
            $response->type = 0;
            $response->msg = "Your score is too low to be saved";
            echo json_encode($response);
        }
        else{
            $query = $db->prepare('UPDATE player SET player_score = :playerScore WHERE player_name = :playerName');
            $query->execute(
                array(
                    'playerName' => $playerName,
                    'playerScore' => $playerScore,
                )
            );
        }
    }
    else{
        $query = $db->prepare('INSERT INTO player (player_name, player_score) VALUES (?,?)' );
        $query->execute(
            array(
                $playerName,
                $playerScore
            )
        );
    }
}
