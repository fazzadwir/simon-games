var started = false;
var level = 0;
var gamePattern = [];
var userClickPattern = []; 
var buttonColours = ["red", "blue","green","yellow"];

$(document).on("keypress", function(event){
    if (!started){
        if (event.key.toUpperCase() === "A"){    
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    }
});

$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickPattern.length-1)
});

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();    
}

function nextSequence(){ 
    userClickPattern = [];
    level++;

    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}

function animatePress(currentColour) {
    var button = $("#" + currentColour);
    button.addClass("pressed");
    setTimeout(function(){
        button.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
   
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {        

        var over = new Audio("sounds/wrong.mp3");
        over.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 1000);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      } 

    function startOver() {
        started = false; 
        level = 0;
        gamePattern = [];
    }
}