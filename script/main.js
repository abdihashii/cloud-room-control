ajaxCall(requestURLLock, locked, unlocked, isLocked);


$("#refresh-icon").rotate({ 
   bind: 
     { 
        click: function(){
            $(this).rotate({ angle: 0, animateTo:180, duration: 350})
        }
     } 
});

$('.status').css('display','none');
$('#waiting').css('display','inline');

var dots = 0;
setInterval(waiting, 800);
function waiting() {
  if (dots < 3) {
    $('#dots').append('.');
    dots++;
  } else {
    $('#dots').html('');
    dots = 0;
  }
}

// Initializing vars for status
var isLocked = "isLocked";
var isOn = "isOn";
var deviceID = "26001c000247343337373738";
var accessToken = "aa0358abcb3e3ba75775ba6c65a02f9099145d44";
var baseURL = "https://api.particle.io/v1/devices/";

var requestURLLock = baseURL + deviceID + "/" + isLocked;
var requestURLLight = baseURL + deviceID + "/" + isOn;



/***** POST *****/
function doorLock(value) {
  var url = "https://api.particle.io/v1/devices/26001c000247343337373738/lockDoor";
  var accessToken = "aa0358abcb3e3ba75775ba6c65a02f9099145d44";
  
  $.post( url, { params: value, access_token: accessToken });
}
function lightSwitch(value) {
  var url = "https://api.particle.io/v1/devices/26001c000247343337373738/lightSwitch";
  var accessToken = "aa0358abcb3e3ba75775ba6c65a02f9099145d44";
  
  $.post( url, { params: value, access_token: accessToken });
}



/***** door LOCK *****/
function lock() {
  var img = document.getElementById("lock_pad");
  if (img.src.match("unlocked")) {
    // locked();
    doorLock("LOCK");
  } else {
    // unlocked();
    doorLock("UNLOCK");
  }
  ajaxCall(requestURLLight, lightOn, lightOff, isOn);
  // refresh();
}
function locked() {
  var img = document.getElementById("lock_pad");
  img.src = "img/locked.svg";
  // refresh();
}
function unlocked() {
  var img = document.getElementById("lock_pad");
  img.src = "img/unlocked_col.svg";
  // refresh();
}

/***** LIGHT switch *****/
function light() {
  var img = document.getElementById("light_bulb");
  if (img.src.match("light_off")) {
    // lightOn();
    lightSwitch("ON");
  } else {
    // lightOff();
    lightSwitch("OFF");
  }
  ajaxCall(requestURLLight, lightOn, lightOff, isOn);
  // refresh();
}
function lightOn() {
  var img = document.getElementById("light_bulb");
  img.src = "img/light_on_col.svg";
  // refresh();
}
function lightOff() {
  var img = document.getElementById("light_bulb");
  img.src = "img/light_off.svg";
  // refresh();
}



/***** home AUTOMATION *****/
function home(value) {
  if (value === true) {
    doorLock("LOCK");
    lightSwitch("OFF");
  }
  else if (value === false) {
    doorLock("UNLOCK");
    lightSwitch("ON");
  }
  // refresh();
}



var flagSuccess = false;
var flagFail = false;
function ajaxCall(URL_address, state1, state2, name) {
  "use strict";
  $.ajax({
    url: URL_address,
    async: true,
    type: "GET",
    dataType: "json",
    data: {access_token: accessToken},
    success: function (data) {
      $('.status').css('display','none');
      $('#connected').css('display','inline');
      if (!flagSuccess) {
        console.log('Connected to Photon!');
        flagSuccess = true;
      }
      flagFail = false;
      status = data.result;
      if (status === true) { // locked - lightOn
        locked();
      } else if (status === false) { // unlocked - lightOff
        unlocked();
      }
      console.log(name + ": " + status);
    },
    error: function () {
      $('.status').css('display','none');
      $('#disconnected').css('display','inline');
      if (!flagFail) {
        console.log('Disonnected from Photon!');
        flagFail = true;
      }
      flagSuccess = false;
    }
  });
}

ajaxCall(requestURLLock, locked, unlocked, isLocked);
ajaxCall(requestURLLight, lightOn, lightOff, isOn);

/***** REFRESH status *****/
function refresh() {
  ajaxCall(requestURLLock, locked, unlocked, isLocked);
  ajaxCall(requestURLLight, lightOn, lightOff, isOn);
  // LOCK STATUS
  $.getJSON(requestURLLock, function(json) {
    if (json.result === true){ // locked
      locked();
    }
    else if (json.result === false){ // unlocked
      unlocked();
    }
  });
  // LIGHTSTATUS
  $.getJSON(requestURLLight, function(json) {
    if (json.result === true){ // light on
      lightOn();
    }
    else if (json.result === false){ // light off
      lightOff();
    }
  });
}



// Continuosly running refresh function, every 10 ms
setInterval(refresh, 10);
