<?php

$db = dbConnect();
    $bestScore = $db -> query('SELECT * FROM player ORDER BY player_score DESC LIMIT 10');
    $tableScore = $bestScore -> fetchAll();
    echo json_encode($tableScore);