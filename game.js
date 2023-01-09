
//Initialization of global variables 
var buttonColors = ["red", "blue", "green", "yellow"]; 
var gamePattern = []; 
var userClickedPattern = []; 
var level = 0; 
var started = false; 

//Start the game 
$(document).keydown(function(){
    if(!started){
        nextSequence(); 
        started = true; 
    }
}); 

//Game Sequence 
//Function to generate a gamePattern array 
function nextSequence(){

    $("#level-title").text("Level  " + level); 
    level++;
    
    var randomNum = Math.random()*4; 
    randomNum = Math.floor(randomNum); 

    console.log(randomNum); 
    console.log(buttonColors[randomNum]); 

    var randomChosenColor = buttonColors[randomNum]; 

    //Create the game pattern 
    gamePattern.push(randomChosenColor); 

    //Make a random button flash 
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //Play a random button sound 
    playSound(randomChosenColor);  
   
}

//Button clicks by the user 
$(".btn").click(function(){

    var userChosenColor = $(this).attr("id"); 

    //Store the UserClikedPattern in an array 
    userClickedPattern.push(userChosenColor); 

    //Animate the button the user clicked on 
    animatePress(userChosenColor); 

    //Play sound of the button the user clicked on 
    playSound(userChosenColor); 

    console.log(userClickedPattern); 

    //userClickedPattern = ["red", "yellow", "green", "blue", "red"]
    //userClickedPattern = [  0  ,    1    ,    2   ,    3  ,    4 ]
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor)); 
});


//Function to play game sounds 
function playSound (name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Function to animate the game buttons 
function animatePress(currentColor){
    $(".btn" + "." + currentColor).addClass("pressed"); 

    setTimeout(function(){
        $(".btn" + "." + currentColor).removeClass("pressed"); 
    }, 100); 
}

//Check answers => compare the gamePattern and the userPattern 
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){

        //counter to see how many buttons the user got right 
        var count = 0; 

        for (var i = 0; i<gamePattern.length; i++){
            if(gamePattern[i] === userClickedPattern[i]){
                count++; 
            }
        }

        //Checks if count is the same value as the gamePattern lenght 
        //=> it means the user clicked on the rights buttons (same pattern as the game)
        if(count === gamePattern.length ){
            console.log("success"); 
        
            setTimeout(function(){
                nextSequence(); 
                userClickedPattern = []; 
            }, 1000); 
        }

    }

    //If the user clicks on the wrong button 
    else{
       
        console.log("wrong"); 
        var wrongAudio = new Audio("sounds/wrong.mp3"); 
        wrongAudio.play(); 
        $("body").addClass("game-over"); 
        
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        }, 200);

        setTimeout(function(){
            $("h2").text("You have reached level " + level);  
        });

        setTimeout(function(){
            $("h2").text("Game Over ! (Press any key to restart)"); 
        }, 3000); 
          
        startOver(); 

    }
}

//Start over 
function startOver(){
    level = 0; 
    gamePattern = [];  
    userClickedPattern = []; 
    started = false; 
}



