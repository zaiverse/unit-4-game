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

               if(enemy.enemyType === "siren"){
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
            beginMission();
        })
    })

    //if player clicks on the second spacecraft
    $('#div2').on("click", function(){
        $('#Textbox').empty();
       $("<p>This spaceCraft is known as the Pioneer, one of the first to travel intergalactic space. It is built by the species ENio, which are known as the founders of Galactic Interstellar Committee. </p>"+ "<h5>Stats</h5>" + "<p>Health: 700</p>" + "<p>Attack: 18 </p>" + "<p>Defense: 11</p>").appendTo("#Textbox");

        $("<button id = 'choosePioneer'>Choose Pioneer</button>").appendTo("#Textbox");

        $('#choosePioneer').on("click", function(){
            playerAndEnemyStats.playerStats("Pioneer");
            beginMission();
        })
    })
    
    //if player clicks on the third spacecraft
    $('#div3').on("click", function(){
        $('#Textbox').empty();

        $("<p>This is one of the most common spaceCrafts known to all species. It is compact and agile, meaning it is easily able to land in any kind of environment. It's most common use is by soldiers belonging to the Galactic Interstellar Committee. </p>" + "<h5>Stats</h5>" + "<p>Health: 700</p>" + "<p>Attack: 20</p>" + "<p>Defense: 9</p>").appendTo("#Textbox");


        $("<button id = 'chooseEight'>Choose Eight</button>").appendTo("#Textbox");
        
        $('#chooseEight').on("click", function(){
            playerAndEnemyStats.playerStats("Eight");
            beginMission();
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


function beginMission(){
    reset();
    //create divs for the pictures of planets and moon
    $('<div id = "Earth"></div>').appendTo("#containerDiv")
    $('#Earth').html('<img src = "http://www.pngall.com/wp-content/uploads/2016/06/Earth-PNG-Pic.png"' + 'class = "WidthnHeighPlanets"/>');

    $('<div id = "Mars"></div>').appendTo("#containerDiv")
    $('#Mars').html('<img src = "https://upload.wikimedia.org/wikipedia/commons/6/68/Mars_%2816716283421%29_-_Transparent_background.png"' + 'class = "WidthnHeighPlanets"/>');

    $('<div id = "Moon"></div>').appendTo("#containerDiv")
    $('#Moon').html('<img src = "https://vignette.wikia.nocookie.net/thesolarsystem6361/images/8/86/Enceladus_spacepedia.png/revision/latest?cb=20180302104450"' + 'class = "WidthnHeighPlanets"/>');

    $('<p>Click any to explore</p>').appendTo('#Textbox');

    //if player chooses Earth as destination
    $('#Earth').on("click", function(){
        $('#Textbox').empty();
        $('#buttonDialog').empty();


        $("<div><h3>Difficulty:</h3></div>").appendTo("#Textbox");
        $("<div><p>Easy-Intermidiate</p></div>").appendTo("#Textbox");


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
        $("<div><p>Hard</p></div>").appendTo("#Textbox");

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


//explore Earth
function earthAdventure(){
    $('<p>Which area would you like to explore?</p>').appendTo('#Textbox');
    $('<button id = "woodenStructure">Abandoned wooden structure</button>').appendTo('#buttonDialog');
    $('#woodenStructure').on("click", function(){
        reset();
            playerAndEnemyStats.enemyStats("spider");
            playerAndEnemyStats.playerStatsinnerHTML();
            playerAndEnemyStats.enemyStatsinnerHTML();
            initialAttack.attackFunction();
            $('<div id = "spider"></div>').appendTo("#containerDiv")
            $('#spider').html('<img src = "assets/images/ragno.gif"' + 'class = "WidthnHeighPlanets"/>');

        })

    $('<button id ="shroudedForest">Shrouded forest</button>').appendTo('#buttonDialog');
    $('#shroudedForest').on("click", function(){
            reset();
            playerAndEnemyStats.enemyStats("Eye");
            playerAndEnemyStats.playerStatsinnerHTML();
            playerAndEnemyStats.enemyStatsinnerHTML();
            initialAttack.attackFunction();
            $('<div id = "eye"></div>').appendTo("#containerDiv")
            $('#eye').html('<img src = "assets/images/floatingEye.gif"' + 'class = "WidthnHeighPlanets"/>');
    })

    $('<button id ="rockyWaterfall" >Rocky Waterfall</button>').appendTo('#buttonDialog');
    $('#rockyWaterfall').on("click", function(){
            reset();
            playerAndEnemyStats.enemyStats("weirdTurtle");
            playerAndEnemyStats.playerStatsinnerHTML();
            playerAndEnemyStats.enemyStatsinnerHTML();
            initialAttack.attackFunction();
            $('<div id = "turtle"></div>').appendTo("#containerDiv")
            $('#turtle').html('<img src = "https://vignette.wikia.nocookie.net/dont-starve-game/images/4/4b/Crawling_horror_large_by_mf99k-d9fruch.gif/revision/latest?cb=20151107073752"' + 'class = "WidthnHeighPlanets"/>');
        
    })

    $('<button id ="spaceCraft">Back to spacecraft</button>').appendTo('#buttonDialog');
    $('#spaceCraft').on("click", function(){
        reset();
        beginMission();
    })


}


//explore mars
function MarsAdventure(){
     reset();
     $('<p>There are three inputs required to unlock this region (submit them individually)</p>').appendTo('#Textbox');
     var urbanLegends = ["evil eye", "the spider bite", "loch ness monster"];
     console.log(urbanLegends);
    $('<input id ="input1"></input>').appendTo('#buttonDialog');
     var button = $('<button>Submit</button>').appendTo('#buttonDialog');
     var button1 = $('<button>Return</button>').appendTo('#buttonDialog');

         $(button).on("click", function(){
             if($('#input1').val() === urbanLegends[0] || $('#input1').val() === urbanLegends[1] || $('#input1').val() === urbanLegends[2]){
                 urbanLegendCount++;
                 alert("correct");
                 $('#input1').val('');
                 if(urbanLegendCount === 3){
                     alert("You guessed all urban legends");
                     reset();
                     playerAndEnemyStats.enemyStats("Eye");
                     playerAndEnemyStats.playerStatsinnerHTML();
                     playerAndEnemyStats.enemyStatsinnerHTML();
                     initialAttack.attackFunction();
                     $('<div id = "eye"></div>').appendTo("#containerDiv")
                     $('#eye').html('<img src = "assets/images/floatingEye.gif"' + 'class = "WidthnHeighPlanets"/>');
                 }
             }else{
                 alert("Incorrect");
                 $('#input1').val('');
             }
     })
         $(button1).on("click", function(){
             beginMission();
         });
}

//explore moon
function moonAdventure(){
    reset();
    playerAndEnemyStats.enemyStats("siren");
    playerAndEnemyStats.playerStatsinnerHTML();
    playerAndEnemyStats.enemyStatsinnerHTML();
    initialAttack.attackFunction();

}