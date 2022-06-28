
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false; //game not started yet
var level = 0;

//For starting the game and managing the Heading acordingly
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Computer generated random button colours
function nextSequence() {
  userClickedPattern = [];
  level++;//incrementing the level
  $("#level-title").text("Level " + level);//displaying the incremented level
  var randomNumber = Math.floor(Math.random() * 4);// Range: 0,1,2,3.
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);//to flash the buttons
  playSound(randomChosenColour);
}

//User chosen button colour
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);//passing the last recent index
});

//Function to check answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}



//Function to give animation to the button clicked (be it by 'user' or by the 'computer')
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Function to play sound when a button is clicked (be it by 'user' or by the 'computer')
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Playing all over again after loosing
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
