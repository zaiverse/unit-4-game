//create variable for the divs
var fighterOne = $('#fighter-one');
var fighterTwo = $('#fighter-two');
var fighterThree = $('#fighter-three');
var userName = '';
var nameOfCreature = '';
var urbanLegendsInput = '';
var urbanLegendCount = 0;
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
                player = new Player(playerType, 700, 23, 6);
                break;
            case "Pioneer":
                player = new Player(playerType, 700, 18, 11);
                break;
            case "Eight":
                player = new Player(playerType, 700, 20, 9);
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
                enemy = new Enemy(enemyType, 300, 26, 8);
                break;
            case "Eye":
                enemy = new Enemy(enemyType, 470, 60, 10);
                break;
            case "weirdTurtle":
                enemy = new Enemy(enemyType, 360, 37, 9);
                break;
            case "siren":
                enemy = new Enemy(enemyType, 500, 75, 15);
                break;
            case "boss":
                enemy = new Enemy(enemyType, 700, 85, 30);
                
        }

    },
    //set the inner HTML for the enemy
    enemyStatsinnerHTML: function(){

        $('<h3>Enemy Stats: </h3><p class ="healthOfEnemy">Health: ' + enemy.health + ' </p><p class ="attackofEnemy">Attack: ' + enemy.attack +'</p><p class ="defense of Enemy">Defense: ' + enemy.defense + '</p>' ).appendTo('#Textbox');

    }


}

var robotDialog = [
    'I see their signal finally had their desired outcome. Much too late I fear.','You received a signal recently, have you not?', 'No, we were created by the species you seek, but we are not them. The ones you are searching for are known as human kind among us. We are mechanical inventions created by the human species to lessen their work load. From years of inivation, we were born and set to work alongside human kind','', ''
]

var buttonMarsDialog = [
    'what are you talking about?', 'Yes, I was sent to investigate a signal sent by an intelligent species. Would that happen to be your kind?','What happened to their kind?',''
]

//create a function that accesses the player and enemy info to intiate //attack when a button is clicked.
let initialAttack = {
    attackFunction: function(){
        let playerHealth = $('.healthOfPlayer');
        let enemyHealth = $('.healthOfEnemy');
        let playerAttack = $('.attackOfPlayer');
        let playerDefense = $('.defenseOfPlayer');

        player.health = 700;
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
                //player dies
            else if(player.health <= 0){
            $(playerHealth).empty();
            $('<p>Health: 0</p>').appendTo(playerHealth);
            reset();
            $('<h2>YOU DIED</h2>').appendTo("#containerDiv");

            $('<button id = "continue">Continue</button>').appendTo("#Textbox");
            $('<button id = "endGame">End Game</button>').appendTo("#Textbox");

            $('#continue').click(function() {
                beginMission();
            });
            $('#endGame').click(function() {
                window.location = "index.html";
            });
                }
                //enemy dies
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

                //display code for player to unlock moon
                if(enemy.enemyType === "Eye"){
                    reset();
                    $('<h3>The creature seems to have dropped something. It reads: </h3>').appendTo("#Textbox");
                    $('<p> They know something you do not. It is what you search and something they can not have. Call them by their name if you wish to challenge their kind.</p>').appendTo("#Textbox");
                    $("<button id = 'continue'>Continue</button>").appendTo('#buttonDialog');
                    $('#continue').on("click", function(){
                        reset();
                        earthAdventure();
                    })

                }else if(enemy.enemyType === "siren"){
                    reset();
                    $('<h3>The sirens begin to sing in unison the following words </h3>').appendTo("#Textbox");
                    $('<p>Name the three urban legends that remain on Earth and the ones that remain will acknowledge your presence</p>').appendTo("#Textbox");
                    $("<button id = 'continueBack'>Continue</button>").appendTo('#buttonDialog');
                    $('#continueBack').on("click", function(){
                    reset();
                    MarsAdventure();
                    })
                }else{
                //return to earth selections
                reset();
                earthAdventure();
                }
                
            }
        })
    },
    //create a function that will accept the users input for Mars code pad
    passcode: function(){
        var urbanLegends = ["evil eye", "the spider bite", "loch ness monster"];
        var input = $('<input id ="input"></input>').appendTo('#buttonDialog');
        var button = $('<button>Submit</button>').appendTo('#buttonDialog');
        var button1 = $('<button>Return</button>').appendTo('#buttonDialog');

        urbanLegendsInput = input.val();

            $(button).on("click", function(){
                if(urbanLegends.indexOf(urbanLegendsInput.toLocaleLowerCase())){
                    urbanLegendCount++;
                    alert("correct");
                    $('#input').val('');
                    if(urbanLegendCount === 3){
                        alert("You guessed all urban legends");
                        reset();
                        initialAttack.marsRobot();
                    }
                }else{
                    alert("Incorrect");
                }
        })
            $(button1).on("click", function(){
                MarsAdventure();
            });
    },
    marsRobot: function(){
        $('<div id = "robotAi"></div>').appendTo('#containerDiv');
        $('#robotAi').html('<img src = "https://logosrated.net/wp-content/uploads/2016/08/ESET-(NOD32)-Logo-1.png"'  + 'class = "widthnHeight"/>');
        var button = $('<button></button>').appendTo('#buttonDialog');
        var paragraph = $('<p></p>').appendTo('#Textbox');

        $(button).html(buttonMarsDialog[0]);
        $(paragraph).html(robotDialog[0]);

        $(button).on("click", function(){
            (button).empty();
            (paragraph).empty();
            $(button).html(buttonMarsDialog[1]);
            $(paragraph).html(robotDialog[1]);

            $(button).on("click", function(){
                (button).empty();
                (paragraph).empty();
                $(button).html(buttonMarsDialog[1]);
                $(paragraph).html(robotDialog[1]);
            })
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
        $("<p>The voyeger I5 is reliant and dependable in the battlefield. Contructed in Interstellar War II, the I5 is one of the lastest spaceCrafts built by the Galactic Interstellar Committee.</p>"+ "<h5>Stats</h5>" + "<p>Health: 700</p>" + "<p>Attack: 23</p>" + "<p>Defense: 6</p>").appendTo("#Textbox");

        $("<button id = 'chooseI5'>Choose I5</button>").appendTo("#Textbox");

        $('#chooseI5').on("click", function(){
            playerAndEnemyStats.playerStats("I5");
            beginAdventure();
        })
    })

    //if player clicks on the second spacecraft
    $('#div2').on("click", function(){
        $('#Textbox').empty();
       $("<p>This spaceCraft is known as the Pioneer, one of the first to travel intergalactic space. It is built by the species ENio, which are known as the founders of Galactic Interstellar Committee. </p>"+ "<h5>Stats</h5>" + "<p>Health: 700</p>" + "<p>Attack: 18 </p>" + "<p>Defense: 11</p>").appendTo("#Textbox");

        $("<button id = 'choosePioneer'>Choose Pioneer</button>").appendTo("#Textbox");

        $('#choosePioneer').on("click", function(){
            playerAndEnemyStats.playerStats("Pioneer");
            beginAdventure();
        })
    })
    
    //if player clicks on the third spacecraft
    $('#div3').on("click", function(){
        $('#Textbox').empty();

        $("<p>This is one of the most common spaceCrafts known to all species. It is compact and agile, meaning it is easily able to land in any kind of environment. It's most common use is by soldiers belonging to the Galactic Interstellar Committee. </p>" + "<h5>Stats</h5>" + "<p>Health: 700</p>" + "<p>Attack: 20</p>" + "<p>Defense: 9</p>").appendTo("#Textbox");


        $("<button id = 'chooseEight'>Choose Eight</button>").appendTo("#Textbox");
        
        $('#chooseEight').on("click", function(){
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
var textInputforIntro = ["welcome adventurer! Please enter your assigned name: ", " Welcome ", ", we are glad to see you again. Your last visit to the Galactic Interstellar Committee was ID 860 - 2 - 14 billion. Todays ID is 870 - 2 -14 billion. You have received a special mission from the Interstellar Committe, do you accept it?", "On ID 865 - 2 - 14 billion, the GIC received a signal from a distant galaxy located in the Virgo Supercluster. The signal seems to be transmitted by an intelligent species and is under immediate surpervision. Your mission is to explore the solar system for sign of life. Good Luck! We trust in your past and future dediction to GIC."];

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
        userName = inputBox.val();
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
    $('#Earth').html('<img src = "http://www.pngall.com/wp-content/uploads/2016/06/Earth-PNG-Pic.png"' + 'class = "WidthnHeighPlanets"/>');

    $('<div id = "Mars"></div>').appendTo("#containerDiv")
    $('#Mars').html('<img src = "https://upload.wikimedia.org/wikipedia/commons/6/68/Mars_%2816716283421%29_-_Transparent_background.png"' + 'class = "WidthnHeighPlanets"/>');

    $('<div id = "Moon"></div>').appendTo("#containerDiv")
    $('#Moon').html('<img src = "https://vignette.wikia.nocookie.net/thesolarsystem6361/images/8/86/Enceladus_spacepedia.png/revision/latest?cb=20180302104450"' + 'class = "WidthnHeighPlanets"/>');

    $('<p>' + textInputforMission[0] + '</p>').appendTo('#Textbox');

    //if player chooses Earth as destination
    $('#Earth').on("click", function(){
        $('#Textbox').empty();
        $('#buttonDialog').empty();


        $("<div><h3>Difficulty:</h3></div>").appendTo("#Textbox");
        $("<div><p>Easy</p></div>").appendTo("#Textbox");


        $("<button id = 'chooseEarth'>Explore planet</button>").appendTo("#buttonDialog");

        $('#chooseEarth').on("click", function(){
            reset();
            earthAdventure();
        })
    })

    //if player chooses mars for destinations
    $('#Mars').on("click",function(){
        $("#Textbox").empty();
        $('#buttonDialog').empty();

        $("<div><h3>Difficulty:</h3></div>").appendTo("#Textbox");
        $("<div><p>None-Hard</p></div>").appendTo("#Textbox");

        $("<button id = 'chooseMars'>Explore planet</button>").appendTo("#buttonDialog");

        $('#chooseMars').on("click", function(){
            reset();
            MarsAdventure();
        })
    })

    //if player chooses moon for destination
    $('#Moon').on("click", function(){
        $("#Textbox").empty();
        $('#buttonDialog').empty();

        $("<div><h3>Difficulty:</h3></div>").appendTo("#Textbox");
        $("<div><p>Intermidiate</p></div>").appendTo("#Textbox");

        $("<button id = 'chooseMoon'>Explore moon</button>").appendTo("#buttonDialog");

        $('#chooseMoon').on("click", function(){
            reset();
            moonAdventure();
        })
    })
}

//create function to reference if player gets killed
function continueGame(){
    reset();
    $()
}

var earthDialog = [
"You easily land your spaceship on the rocky ground of the planet and exit your ship. A signal of activity comes from three different locations, which way would you like to go?", "You step inside a wooden structure and question what it could have been used for in the past. The wood that holds the structure together is rotten, seeming ready to fall apart with just a weak gust of wind. As you take to exploring the foreign structure, you tense at the sound of rustling coming from behind you. Turning around, you come face to face with a creature of eight legs racing towards you. You quickly draw your weapon, ready for a fight.","Cautiously, you begin your descent into the shrouded forest. The fallen leaves from barren trees crunching underneath your sturdy boots. It is difficult to see through the thick mist surrounding you, but you feel safer knowing you have an Interstellar Mapping Device at your disposal. It should be easy enough to find your way back. In the distance lies a dark shape hidden by the mist. Although difficult to make out what it is, the strange shape seems to be moving. As it becomes clearer, it turns to acknowledge your presence. It remains still, floating in place, but stares at your with its one huge and unblinking eye. It gives you the chills just looking at it.", "You head towards the sound of falling water until you reach a clearing among trees. Clear blue water flows over a steep ledge and crashes into a rocky pool below. You suddenly crave a drink, but the levels of the water seem to have high levels of toxity. It would be best to avoid drinking it. As you scan the area for any signal of activity, you notice a small creature peering through the surface of the water. It stares at you for awhile until it deems you a threat, then rushes out from the water, opening its mouth wide to display a sharp row of bottom teeth."
]


//explore Earth
function earthAdventure(){
    $('<p>' + earthDialog[0] + '</p>').appendTo('#Textbox');
    $('<button id = "woodenStructure">Abandoned wooden structure</button>').appendTo('#buttonDialog');
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

    $('<button id ="shroudedForest">Shrouded forest</button>').appendTo('#buttonDialog');
    $('#shroudedForest').on("click", function(){
        reset();
        $('<p>' + earthDialog[2] + '</p>').appendTo('#Textbox');
        $('<button id = "fight">Fight it?</button>').appendTo('#buttonDialog');
        $('<button id = "avoid">Explore another area</button>').appendTo('#buttonDialog');
        $('#fight').on("click", function(){
            reset();
            playerAndEnemyStats.enemyStats("Eye");
            playerAndEnemyStats.playerStatsinnerHTML();
            playerAndEnemyStats.enemyStatsinnerHTML();
            initialAttack.attackFunction();
            $('<div id = "eye"></div>').appendTo("#containerDiv")
            $('#eye').html('<img src = "assets/images/floatingEye.gif"' + 'class = "WidthnHeighPlanets"/>');
        })
        $('#avoid').on("click",function(){
            reset();
            earthAdventure();
        })
    })

    $('<button id ="rockyWaterfall" >Rocky Waterfall</button>').appendTo('#buttonDialog');
    $('#rockyWaterfall').on("click", function(){
        reset();
        $('<p>' + earthDialog[3] + '</p>').appendTo('#Textbox');
        $('<button id = "fightIt">Fight!</button>').appendTo('#buttonDialog');
        $('#fightIt').on("click",function(){
            reset();
            playerAndEnemyStats.enemyStats("weirdTurtle");
            playerAndEnemyStats.playerStatsinnerHTML();
            playerAndEnemyStats.enemyStatsinnerHTML();
            initialAttack.attackFunction();
            $('<div id = "turtle"></div>').appendTo("#containerDiv")
            $('#turtle').html('<img src = "https://vignette.wikia.nocookie.net/dont-starve-game/images/4/4b/Crawling_horror_large_by_mf99k-d9fruch.gif/revision/latest?cb=20151107073752"' + 'class = "WidthnHeighPlanets"/>');
        })
        
    })

    $('<button id ="spaceCraft">Back to spacecraft</button>').appendTo('#buttonDialog');
    $('#spaceCraft').on("click", function(){
        reset();
        beginMission();
    })


}

//mars dialog
marsDialog = [
    "You easily land your spaceship on the rocky ground of the planet and exit your ship. Ahead you see a circular structure, almost like a bubble. The land surrounding you is mostly a red dust, but inside the structure you see green trees and blossomming plants as well as tall intricate structures. Approach it?", "There is a locked door and a passcode next to it. It seems to require three different inputs. What will you enter? (submit each one individually)"
]

//explore mars
function MarsAdventure(){
     reset();
     $('<p>' + marsDialog[0] + '</p>').appendTo('#Textbox');
    $('<button id ="yes" >Yes</button>').appendTo('#buttonDialog');
    $('<button id = "no">No</button>').appendTo('#buttonDialog');

    $('#yes').on("click", function(){
    reset();
    $('<p>' + marsDialog[1] + '</p>').appendTo('#Textbox');
    initialAttack.passcode();
    })

    $('#no').on("click", function(){
        beginMission();
    })
}

//moon dialog
var moonDialog = [
    "You have trouble finding an even surface to land your spacecraft, but eventually you manage to land without much difficulty and exit your ship. A signal of activity is coming from one locations, should you go explore?", "As you get closer to the signal, you can hear a beautiful sound echo from a cave in the distance. The harmonious sound lures you in its direction. You head down narrow steps made of ice, the space is tight and barely enough for one to squeeze through. There is a large body of water ahead past a small patch of ice at the bottom of the stairway. The beautiful sound bounces off the walls of the caven. It sounds of singing, but not of a single entity, but a choreographed orchestra of voices. As you emorse yourself in the singing, the voices hush and silence follows hushed whispers. It is difficult to see, but you can barely make out elegantly shapes moving in the water. They gather at a rocky area centered in the cavern and stare at you expectantly. They seem to be waiting for you to say something."
]

//explore moon
function moonAdventure(){
    reset();
    $('<p>' + moonDialog[0] + '</P>').appendTo("#Textbox");
    $('<button id = "yes" >Explore</button>').appendTo("#buttonDialog");
    $('<button id = "no" >Return to craft</button>').appendTo("#buttonDialog");

    $('#yes').on("click", function(){
        reset();
        $('<p>' + moonDialog[1] + '</P>').appendTo("#Textbox");
        $('<div id = "sirens"></div>').appendTo("#containerDiv")
        $('#sirens').html('<img src = "http://38.media.tumblr.com/a2871961babf82eb790561693651c60e/tumblr_n8vg2vgVgJ1tggtmco1_500.gif"' + 'class = "WidthnHeighPlanets"/>');

        var inputBox = $('<input></input>').appendTo('#buttonDialog');
        var confirm = $('<button>Next</button>').appendTo('#buttonDialog');
        $('<button id ="return">Return</button>').appendTo('#buttonDialog');

        $(confirm).on("click", function(){
            nameOfCreature = inputBox.val();

            if(nameOfCreature.toLocaleLowerCase() === "siren" || nameOfCreature.toLocaleLowerCase() === "sirens"){
                $('#Textbox').empty();
                $('#buttonDialog').empty();

                playerAndEnemyStats.enemyStats("siren");
                playerAndEnemyStats.playerStatsinnerHTML();
                playerAndEnemyStats.enemyStatsinnerHTML();
                initialAttack.attackFunction();
            }else{
                alert("Incorrect")
            }
        })
        $('#return').on("click",function(){
            moonAdventure();
        })

    })
    $('#no').on("click", function(){
        reset();
        beginMission();
    })

}