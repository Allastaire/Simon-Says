//Globals
var colors = ["red", "green", "yellow", "blue"];
var gameSequence = [];
var userSequence = [];
var gameStarted = false;
var userLost = false;
$("button").click(function() {
  var btn = $(this);
  animateButton(btn);
  if (gameStarted) {
    userSequence.push(retrieveButtonColor(btn));
    compareSequences()
    if (userSequence.length === gameSequence.length && !userLost) {
      //next level baby
      $("h1").text("Level " + gameSequence.length + " completed, press a button to start next level")
      userSequence = [];
    }
  }
});

$(document).keydown(function() {
  if (!userLost) {
    var level = "Level " + (gameSequence.length + 1);
    $("h1").text(level);
    gameStarted = true;
    nextSequence();
    for (i = 0; i < gameSequence.length; i++) {
      playSequenceElement(i);
    }
  } else {
    window.location.reload();
  }

});

//create a sequence element

function nextSequence() {
  var rand = Math.floor(Math.random() * 4);
  gameSequence.push(colors[rand]);
}

//plays button
function playSequenceElement(i) {
  setTimeout(function() {
    var color = "." + gameSequence[i];
    var btn = $(color);
    animateButton(btn);
  }, 500 * i);
}

function animateButton(btn) {
  btn.addClass("on");
  setTimeout(function() {
    btn.removeClass("on");
  }, 300);
}


function compareSequences() {
  for (i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== gameSequence[i]) {
      userLost = true;
      endGame();
      break;
    }
  }
}


function retrieveButtonColor(btn) {
  for (i = 0; i < colors.length; i++) {
    if (btn.hasClass(colors[i])) {
      return colors[i]
    }
  }
  console.log("does js even have decent exception handling?");
  return "";
}

function endGame()
{
  $("h1").text("Game over!, you reached level " + (gameSequence.length) + "\n Press any botton to restart.");
}
