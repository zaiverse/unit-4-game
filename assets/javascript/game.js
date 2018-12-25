//create variable for the divs
var fighterOne = $('#fighter-one');
var fighterTwo = $('#fighter-two');
var fighterThree = $('#fighter-three');
var userName = '';
let player;
let enemy;

//set constructor for player

function Player(playerType, health, attack, defense){
    this.playerType = playerType;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
}


//set constructor for enemy

function Enemy(enemyType, health, attack, defense){
    this.enemyType = enemyType;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
}

//set stats for the player choices
let playerAndEnemyStats ={
    playerStats: function(playerType){
        switch(playerType){
            case "I5":
                player = new Player(playerType, 500, 23, 6);
                break;
            case "Pioneer":
                player = new Player(playerType, 500, 18, 10);
                break;
            case "Eight":
                player = new Player(playerType, 500, 20, 9);
                break;

        }
    },
    //set the inner HTML for the player choice
    playerStatsinnerHTML: function(){
        
        $('<h3>Your Stats</h3><p class ="healthOfPlayer">Health: ' + player.health + ' </p><p class = "attackOfPlayer">Attack: ' + player.attack +'</p><p class = "defenseOfPlayer">Defense: ' + player.defense + '</p>' ).appendTo('#Textbox');

    },
    //set the enemy stats
    enemyStats: function(enemyType){
        switch(enemyType){
            //earth enemies
            case "spider":
                enemy = new Enemy(enemyType, 300, 26, 5);
                break;
            case "Eye":
                enemy = new Enemy(enemyType, 345, 50, 2);
                break;
            case "weirdTurtle":
                enemy = new Enemy(enemyType, 400, 24, 10);
                break;
                
        }

    },
    //set the inner HTML for the enemy
    enemyStatsinnerHTML: function(){

        $('<h3>Enemy Stats: </h3><p class ="healthOfEnemy">Health: ' + enemy.health + ' </p><p class ="attackofEnemy">Attack: ' + enemy.attack +'</p><p class ="defense of Enemy">Defense: ' + enemy.defense + '</p>' ).appendTo('#Textbox');

    }


}

//create a function that accesses the player and enemy info to intiate //attack when a button is clicked.
let initialAttack = {
    attackFunction: function(){
        let playerHealth = $('.healthOfPlayer');
        let enemyHealth = $('.healthOfEnemy');
        let playerAttack = $('.attackOfPlayer');
        let playerDefense = $('.defenseOfPlayer');

        player.health = 500;
        $(playerHealth).empty();
        $('<p>Health: ' + player.health +'</p>').appendTo(playerHealth);


        $('<button id ="attack">Attack!</button>').appendTo('#buttonDialog');
        $('#attack').on("click", function(){

            if(enemy.health > 0 && player.health > 0){
            enemy.health = enemy.health - player.attack + enemy.defense;
            player.health = player.health - enemy.attack + player.defense

            $(enemyHealth).empty();
            $('<p>Health: ' + enemy.health +'</p>').appendTo(enemyHealth);
            $(playerHealth).empty();
            $('<p>Health: ' + player.health +'</p>').appendTo(playerHealth);
            
            }
            else if(player.health <= 0){
            $(playerHealth).empty();
            $('<p>Health: 0</p>').appendTo(playerHealth);
            alert("You died");
                }
            else if (enemy.health <= 0){
            $(enemyHealth).empty();
            $('<p>Health: 0</p>').appendTo(enemyHealth);
            alert("You killed it");

                player.attack = player.attack + 8;
                player.defense = player.defense + 2;

                alert("You increased your attack to: " + player.attack);
                alert("You increased your defense to: " + player.defense);
                $(playerAttack).empty();
                $('<p>Attack: ' + player.attack + '</p>').appendTo(playerAttack);
                $(playerDefense).empty();
                $('<p>Defense: ' + player.defense + '</p>').appendTo(playerDefense);

                 //return to earth selections
                reset();
                earthAdventure();
            }
        })
    }
}



//create newGame function
function newGame(){
    $("<h1>Choose Your Spacecraft adventurer: </h1>").appendTo("#containerDiv");
    //add images of the spacecrafts to the empty divs
    $("<div id= 'div1'></div>").appendTo('#containerDiv')
    $('#div1').html('<img src = "assets/images/spacecraft1.png"' + 'class = "widthnHeight"/>');
    $("<div id= 'div2'></div>").appendTo('#containerDiv')
    $('#div2').html('<img src = "assets/images/spacecraft2.png"' + 'class = "widthnHeight2"/>');
    $("<div id= 'div3'></div>").appendTo('#containerDiv')
    $('#div3').html('<img src = "assets/images/spacecraft3.png"' + 'class = "widthnHeight3"/>');

    //if player clicks on the first spacecraft
    $('#div1').on("click", function(){
        //empty in case player clicks again or clicks on other spacecraft
        $('#Textbox').empty();

        //describe the spacecraft and create button for option choice
        $("<p>The voyeger I5 is reliant and dependable in the battlefield. Contructed in WW6, the I5 was the last spaceship created by human kind before their complete disapperance. </p>").appendTo("#Textbox");

        $("<button id = 'chooseI5'>Choose I5</button>").appendTo("#Textbox");

        $('#chooseI5').on("click", function(){
            playerAndEnemyStats.playerStats("I5");
            beginAdventure();
        })
    })

    //if player clicks on the second spacecraft
    $('#div2').on("click", function(){
        $('#Textbox').empty();
       $("<p> good ship ypup </p>").appendTo("#Textbox");

        $("<button id = 'chooseI5'>Choose I5</button>").appendTo("#Textbox");

        $('#chooseI5').on("click", function(){
            playerAndEnemyStats.playerStats("Pioneer");
            beginAdventure();
        })
    })
    
    //if player clicks on the third spacecraft
    $('#div3').on("click", function(){
        $('#Textbox').empty();

        $("<p>dancing shipp </p>").appendTo("#Textbox");

        $("<button id = 'chooseI5'>Choose I5</button>").appendTo("#Textbox");
        
        $('#chooseI5').on("click", function(){
            playerAndEnemyStats.playerStats("Eight");
            beginAdventure();
        })
    })
    

}

newGame();

//reset display area
function reset(){
    $('#containerDiv').empty();
    $('#Textbox').empty();
    $('#buttonDialog').empty();
}

//text choices for beginAdventure function
var textInputforIntro = ["welcome adventurer! Please enter your assigned name: ", " Welcome ", ", we are glad to see you again. Your last visit to the Galatic Interstellar Committee was ID 860 - 2 - 14 billion. Todays ID is 870 - 2 -14 billion. You have received a special mission from the Interstellar Committe, do you accept it?", "On ID 865 - 2 - 14 billion, the GIC received a signal from a distant galaxy located in the Virgo Supercluster. The signal seems to be transmitted by an intelligent species and is under immediate surpervision. Your mission is to explore the solar system for sign of life. Good Luck! We trust in your past and future dediction to GIC."];

//Introduction to mission
function beginAdventure(){
    reset();
    //make sure stats are being transferred
    console.log(player.attack);
    console.log(player.defense);
    // prompt for name
    $("<p>" + textInputforIntro[0] + "</p>").appendTo('#Textbox');
    var inputBox = $('<input></input>').appendTo('#buttonDialog');
    var continueButton = $('<button>Next</button>').appendTo('#buttonDialog');

    //grab user input and then give choice to accept mission
    (continueButton).on('click', function(){
        var userName = inputBox.val();
        reset();
        $("<p>" + textInputforIntro[1] + userName + textInputforIntro[2] + "</p>").appendTo('#Textbox');

        $("<button id = 'yes'>Yes</button>").appendTo('#buttonDialog');
        $("<button id = 'no'>No</button>").appendTo('#buttonDialog');

        if($('#yes').on("click", function(){
            reset();
            $('<p>' + textInputforIntro[3] + '</p>').appendTo('#Textbox');
            $('<button id ="toSpacecraft">Explore source of signal</button>').appendTo('#buttonDialog');
            if($('#toSpacecraft').on("click", function(){
                //reset all divs and head to beginMission function
                beginMission();
            }));
        }));
        if($('#no').on("click", function(){
                //you cant start an adventure if you're too scared
                reset();
                $('<h1>GAME OVER</h1>').appendTo('#Textbox');
                $('<button id ="replay">Replay</button>').appendTo('#buttonDialog')
                $('#replay').on("click", function(){
                    reset();
                    newGame();
                })
                
        }));
    })

    

}

//beginMission text array
var textInputforMission = [
    "You reach a stellar system that has eight planets slowly gravitating a star. There seems to be signs of activity in three different locations. One comes from a green and blue planet, another from a brown planet, and the last comes, not from a planet, but from a moon that gravitates a gas planet with stunning rings surrounding its exterier. Which will you explore? "
]

function beginMission(){
    reset();
    //create divs for the pictures of planets and moon
    $('<div id = "Earth"></div>').appendTo("#containerDiv")
    $('#Earth').html('<img src = "https://cdn.pixabay.com/photo/2016/04/24/04/53/globe-1348777_960_720.png"' + 'class = "WidthnHeighPlanets"/>');

    $('<div id = "Mars"></div>').appendTo("#containerDiv")
    $('#Mars').html('<img src = "https://upload.wikimedia.org/wikipedia/commons/6/68/Mars_%2816716283421%29_-_Transparent_background.png"' + 'class = "WidthnHeighPlanets"/>');

    $('<div id = "Moon"></div>').appendTo("#containerDiv")
    $('#Moon').html('<img src = "https://vignette.wikia.nocookie.net/thesolarsystem6361/images/8/86/Enceladus_spacepedia.png/revision/latest?cb=20180302104450"' + 'class = "WidthnHeighPlanets"/>');

    $('<p>' + textInputforMission[0] + '</p>').appendTo('#Textbox');

    //if player chooses Earth as destination
    $('#Earth').on("click", function(){
        $('#Textbox').empty();

        $("<div><h3>Difficulty:</h3></div>").appendTo("#Textbox");
        $("<div><p>Easy</p></div>").appendTo("#Textbox");


        $("<button id = 'chooseEarth'>Explore planet</button>").appendTo("#buttonDialog");

        $('#chooseEarth').on("click", function(){
            reset();
            earthAdventure();
        })
    })
}

//create function to reference if player gets killed
function continueGame(){
    reset();
    $()
}

var earthDialog = [
"You easily land your spaceship on the rocky ground of the planet and exit your ship. A signal of activity comes from three different locations, which way would you like to go?", "You step inside a wooden structure and question what it could have been used for in the past. The wood that holds the structure together is rotten, seeming ready to fall apart with just a weak gust of wind. As you take to exploring the foreign structure, you tense at the sound of rustling coming from behind you. Turning around, you come face to face with a creature of eight legs racing towards you. You quickly draw your weapon, ready for a fight."
]


//explore Earth
function earthAdventure(){
    $('<p>' + earthDialog[0] + '</p>').appendTo('#Textbox');
    $('<button id = "woodenStructure">Abandoned wooden structure</button>').appendTo('#containerDiv');
    $('#woodenStructure').on("click", function(){
        reset();
        $('<p>' + earthDialog[1] + '</p>').appendTo('#Textbox');
        $('<button id = "fight">Fight!</button>').appendTo('#buttonDialog');
        $('#fight').on("click", function(){
            reset();
            playerAndEnemyStats.enemyStats("spider");
            playerAndEnemyStats.playerStatsinnerHTML();
            playerAndEnemyStats.enemyStatsinnerHTML();
            initialAttack.attackFunction();
            $('<div id = "spider"></div>').appendTo("#containerDiv")
            $('#spider').html('<img src = "assets/images/ragno.gif"' + 'class = "WidthnHeighPlanets"/>');
        })
    })

    $('<button></button>').appendTo('#containerDiv');

    $('<button></button>').appendTo('#containerDiv');

    $('<button id ="spaceCraft">Back to spacecraft</button>').appendTo('#containerDiv');
    $('#spaceCraft').on("click", function(){
        reset();
        beginMission();
    })


}