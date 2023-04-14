
function welcome(){
  document.getElementById('commen').hidden = true;         
  document.querySelector('#audioPlayer').play();
  document.getElementById("div1").style.visibility = "visible";
  setTimeout("document.getElementById('div1').style.display = 'none';", 9001);       
  setTimeout("document.getElementById('div1').style.visibility = 'hidden';", 9001);  
  setTimeout("document.getElementById('div2').style.visibility = 'visible';", 9001); 
  setTimeout("document.querySelector('#audioPlayer1').play();", 9001);
 };

var boutonElement = document.getElementById("butcom");
boutonElement.addEventListener("click", welcome);     
var character = document.querySelector(".character");
var map = document.querySelector(".map");
var m = character.attributes[1]
var x = 88;
var y = 108;
var held_directions = []; 
var speed = 1; 
var snx1 = 158       
var snx2 = 146
var shopx1 = 30
var shopx2 = 18
var asc1 = 94
var asc2 = 82
const MA_VALEUR_ORIGINE1 = snx1
const MA_VALEUR_ORIGINE2 = snx2
const MA_VALEUR_ORIGINE3 = shopx1
const MA_VALEUR_ORIGINE4 = shopx2
const MA_VALEUR_ORIGINE5 = asc1
const MA_VALEUR_ORIGINE6 = asc2
var sny = 24
var p = false
var pd = false
var musee = false

const placeCharacter = () => {

  var pixelSize = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));


  const held_direction = held_directions[0];  
  if (held_direction) {
    if (held_direction === directions.right) {x += speed;}
    if (held_direction === directions.left) {x -= speed;}
    if (held_direction === directions.down) {y += speed;}
    if (held_direction === directions.up) {y -= speed;}
    character.setAttribute("facing", held_direction);
  }
  character.setAttribute("walking", held_direction ? "true" : "false");

  var leftLimit = -8;           
  var rightLimit = 16 * 11 + 8;
  var topLimit = -8 + 32;             
  var bottomLimit = 16 * 7;
  if (x < leftLimit) {x = leftLimit;}
  if (x > rightLimit) {x = rightLimit;}
  if (y < topLimit) {y = topLimit;}
  if (y > bottomLimit) {y = bottomLimit;}


  var camera_left = pixelSize * 66;
  var camera_top = pixelSize * 42;

  map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
  character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
};

const step = () => {
  placeCharacter();
  window.requestAnimationFrame(() => {
    gamepos();
    step();
  });
};
step(); 


const directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right" };

const keys = {
  38: directions.up,
  37: directions.left,
  39: directions.right,
  40: directions.down };

document.addEventListener("keydown", e => {
  var dir = keys[e.which];
  if (dir && held_directions.indexOf(dir) === -1) {
    held_directions.unshift(dir);
  }
});

document.addEventListener("keyup", e => {
  var dir = keys[e.which];
  var index = held_directions.indexOf(dir);
  if (index > -1) {
    held_directions.splice(index, 1);
  }
});


var isPressed = false;
const removePressedAll = () => {
  document.querySelectorAll(".dpad-button").forEach(d => {
    d.classList.remove("pressed");
  });
};
document.body.addEventListener("mousedown", () => {
  console.log('mouse is down');
  isPressed = true;
});
document.body.addEventListener("mouseup", () => {
  console.log('mouse is up');
  isPressed = false;
  held_directions = [];
  removePressedAll();
});
const handleDpadPress = (direction, click) => {
  if (click) {
    isPressed = true;
  }
  held_directions = isPressed ? [direction] : [];

  if (isPressed) {
    removePressedAll();
    document.querySelector(".dpad-" + direction).classList.add("pressed");
  }
};
document.querySelector(".dpad-left").addEventListener("touchstart", e => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", e => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", e => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", e => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", e => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", e => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", e => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", e => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", e => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", e => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", e => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", e => handleDpadPress(directions.down));


var boutonElement = document.getElementById("remove");
boutonElement.addEventListener("click", remframe);

var boutonElement = document.getElementById("removepass");
boutonElement.addEventListener("click", remframepass);

function remframe(){
  document.getElementById('remove').hidden = true;
  document.getElementById('inlineFrameExample').hidden = true;
 };

function remframepass(){
   document.getElementById('removepass').hidden = true;
   document.getElementById('safbox').hidden = true;
  };




 function postest() {
   if (x <= 94 && x >= 82 && y == 112) {  
     if (pd == false && musee == false && character.attributes[1].value === 'down') {
       console.log("quitter");
       pd = true;
     }
   }
   if (x == -8 && musee == false) {  
       console.log("test");
       x = 182
   }
   if (x == 184 && musee == false) {  
       console.log("test");
       x = -6
   }
  if (x <= snx1 && x >= snx2 && y == sny) { 
    if (p == false &&  character.attributes[1].value === 'up') {
      document.getElementById('inlineFrameExample').hidden = false;
      document.getElementById('remove').hidden = false;
      p = true;
    }
  }
  if (x <= shopx1 && x >= shopx2 && y == sny) {  
    if (p == false &&  character.attributes[1].value === 'up') {
      p = true;
      x = 88;
      y = 112;
      document.getElementById("testoto").style.backgroundImage = "url('map33.gif')";
      document.getElementById("testoto1").style.backgroundImage = "url('backgroundhelpshop.png')";
      snx1 = snx2 = shopx1 = shopx2 = asc1 = asc2 = 1000;
      p = false;
      musee = true;
    }
  } else if (x <= 92 && x >= 82 && y == 112) {  
    if (p == false &&  character.attributes[1].value === 'down') {
      if (musee == true) {
      p = true;
      x = 24;
      y = 24;
      snx1 = MA_VALEUR_ORIGINE1;
      snx2 = MA_VALEUR_ORIGINE2;
      shopx1 = MA_VALEUR_ORIGINE3;
      shopx2 = MA_VALEUR_ORIGINE4;
      asc1 = MA_VALEUR_ORIGINE5;
      asc2 = MA_VALEUR_ORIGINE6;
      musee = false;
      document.getElementById("testoto").style.backgroundImage = "url('map333.gif')";
      document.getElementById("testoto1").style.backgroundImage = "url('backgroundhelp.png')";
      }
    }
  }
  if (x <= asc1 && x >= asc2 && y == sny) {  
    if (p == false &&  character.attributes[1].value === 'up') {
      console.log("ascenseur");
      document.getElementById('safbox').hidden = false;
      document.getElementById('removepass').hidden = false;
      p = true;
    }
  }
  if (x <= -6 && x >= -8 && y == sny) {  
    if (p == false &&  character.attributes[1].value === 'up') {
      if (musee == true) {
      console.log("tablo1");
      p = true;
      }
    }
  }
  if (x <= 30 && x >= 18 && y == sny) {  
    if (p == false &&  character.attributes[1].value === 'up') {
      if (musee == true) {
      console.log("tablo2");
      p = true;
      }
    }
  }
  if (x <= 62 && x >= 50 && y == sny) {  
    if (p == false &&  character.attributes[1].value === 'up') {
      if (musee == true) {
      console.log("tablo3");
      p = true;
      }
    }
  }
  if (x <= 126 && x >= 114 && y == sny) {  
    if (p == false &&  character.attributes[1].value === 'up') {
      if (musee == true) {
      console.log("tablo4");
      p = true;
      }
    }
  }
  if (x <= 158 && x >= 146 && y == sny) {  
    if (p == false &&  character.attributes[1].value === 'up') {
      if (musee == true) {
      console.log("tablo5");
      p = true;
      }
    }
  }
  if (x <= 190 && x >= 178 && y == sny) {  
    if (p == false &&  character.attributes[1].value === 'up') {
      if (musee == true) {
      console.log("tablo6");
      p = true;
      }
    }
  }
  if (x <= 94 && x >= 82 && y == sny) {  
    if (p == false &&  character.attributes[1].value === 'up') {
      if (musee == true) {
      console.log("miroir");
      p = true;
      }
    }
  }
  if (musee == true) {
    if ((x >= 104 && y >= 24) || (x <= 72 && y >= 24)) {
      x = 88;
      y = 32;
      character.attributes[1].value = 'down';
    }
  }
};

function reesetd() {
  if (character.attributes[1].value === 'down') {
    p = false;
  }
}

function reesetl() {
  if (character.attributes[1].value === 'left') {
    p = false;
    pd = false;
  }
}

function reesetr() {
  if (character.attributes[1].value === 'right') {
    p = false;
    pd = false;
  }
}

function reesetu() {
  if (character.attributes[1].value === 'up') {
    pd = false;
  }
}

function gamepos(){          
  reesetu();
  reesetd();
  reesetl();
  reesetr();
  postest();
};

let password = '';

function addToPassword(digit) {
  password += digit;
  document.getElementById('password').value = password;
}

function checkPassword() {
  const message = document.getElementById('message');

  if (password === '1234') {
    message.innerHTML = 'La boîte de sécurité a été déverrouillée !';
  } else {
    message.innerHTML = 'Code incorrect. Veuillez réessayer.';
  }

  password = '';
  document.getElementById('password').value = password;
}

const muteButton = document.querySelector('.mute-button');
const audio = document.querySelector('#audioPlayer1');

muteButton.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false;
    muteButton.classList.remove('muted');
  } else {
    audio.muted = true;
    muteButton.classList.add('muted');
  }
});
