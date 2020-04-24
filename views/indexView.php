<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <meta charset="UTF-8">
    <title>PAC-MAN</title>
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="icon" type="image/png" href="./assets/img/pac-man.png" />
</head>
<body>
    <!--Choisir entre pac-man et ms-pac-man-->
    <section class="choosePlayer">
        <p>CHOOSE YOUR PAC-MAN PLAYER</p>
        <p><button id="boy"><img src="./assets/img/pac-man.png">PAC-MAN</button></p>
        <button id="girl"><img src="./assets/img/ms-pac-man.png">MS PAC-MAN</button>
    </section>

    <!--Confirmer le choix de son joueur ou retourner au choix du joueur-->
    <section class="confirmBoy">
        <img src="./assets/img/pac-man2.gif">
        <p><button id="playBoy">PLAY</button></p>
        <button id="backBoy">BACK</button>
    </section>
    <section class="confirmGirl">
        <img src="./assets/img/ms-pac-man2.gif">
        <p><button id="playGirl">PLAY</button></p>
        <button id="backGirl">BACK</button>
    </section>

    <!--Saisir son pseudo et débuter de la partie-->
    <div class="namePage">
        <p>ENTER YOUR NAME</p>
        <input type="text" id="name" name="name" required
               minlength="3" maxlength="8" size="10">
        <button type="submit">START</button>
    </div>

    <!--Affcihage du game over-->
    <div class="gameOverPage">
        <p>GAME OVER</p>
        <button id="scoreButton">SCORES</button>
        <p><button><a href="index.php">NEW GAME</a></button></p>
    </div>

    <!--Affcihage des scores-->
    <div class="resultPage">
        <p><button>SCORES</button></p>
        <table>
            <td></td><td>NAME</td><td>SCORE</td>
        </table>
        <table id="tableScore"></table>
        <p><button><a href="index.php">NEW GAME</a></button></p>
    </div>

    <!--Page de jeu-->
    <div class="gamePage">
        <table class="top">
            <thead>
                <td>
                    NAME
                </td>
                <td>
                    SCORE
                </td>
                <td>
                    LEVEL
                </td>
            </thead>
            <tr>
                <td id="playerName"></td>
                <td id="userScore">0</td>
                <td id="level">1</td>
            </tr>
        </table>
        <div class="map">
            <img src="./assets/img/pac-man.gif" alt="PacMan" data-top="500" data-left="500">
            <img src="./assets/img/red-ghost.gif" alt="RedGhost" data-top="400" data-left="400">
            <img src="./assets/img/blue-ghost.gif" alt="BlueGhost" data-top="400" data-left="500">
            <img src="./assets/img/pink-ghost.gif" alt="PinkGhost" data-top="400" data-left="400">
            <img src="./assets/img/background.svg" alt="Labyrinth">
        </div>
    </div>

    <script src="./assets/main.js"></script>
</body>
</html>