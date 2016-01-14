
// Initializing vars for status
var isLocked = "isLocked";
var isOn = "isOn";
var deviceID = "26001c000247343337373738";
var accessToken = "aa0358abcb3e3ba75775ba6c65a02f9099145d44";
var baseURL = "https://api.particle.io/v1/devices/";

requestURLLock = baseURL + deviceID + "/" + isLocked + "/?access_token=" + accessToken;
requestURLLight = baseURL + deviceID + "/" + isOn + "/?access_token=" + accessToken;

var flagS = false;
var flagF = false;



function ajaxCall(URL, status1, status2, name) {
  $.ajax({
    method: "GET",
    url: requestURLLight,
    dataType: "json",
    data: accessToken,
    timeout: 2000, // adjust the time to getJSON
    success: function () {
      $('.status').css('display','none');
      $('#connected').css('display','inline');
      if (!flagS) {
        console.log('Connected to Photon!');
        flagS = true;
      }
      flagF = false;
      status = json.result;
      if (status === true){ // locked - lightOn
        status1();
      }
      else if (status === false){ // unlocked - lightOff
        status2();
      }
      console.log(name + ": " + status);
    },
    error: function () {
      $('.status').css('display','none');
      $('#disconnected').css('display','inline');
      if (!flagF) {
        console.log('Disconnected from Photon!');
        flagF = true;
      }
      flagS = false;
    }
  });
}



/***** LOCKSTATUS *****/
ajaxCall(requestURLLock, locked, unlocked, isLocked);
/***** LIGHTSTATUS *****/
ajaxCall(requestURLLight, lightOn, lightOff, isOn);

/***** REFRESH status *****/
function refresh() {
  // LOCK STATUS
  ajaxCall(requestURLLock, locked, unlocked, isLocked);
  // LIGHTSTATUS
  ajaxCall(requestURLLight, lightOn, lightOff, isOn);
}



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
function lock() { // function that runs onClick
  var img = document.getElementById("lock_pad");
  if (img.src.match("unlocked")) {
    // locked();
    doorLock("LOCK");
  } else {
    // unlocked();
    doorLock("UNLOCK");
  }
  refresh();
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
function light() { // function that runs onClick
  var img = document.getElementById("light_bulb");
  if (img.src.match("light_off")) {
    // lightOn();
    lightSwitch("ON");
  } else {
    // lightOff();
    lightSwitch("OFF");
  }
  refresh();
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
  if (value == true) {
    doorLock("LOCK");
    lightSwitch("OFF");
  }
  else if (value == false) {
    doorLock("UNLOCK");
    lightSwitch("ON");
  }
  // refresh();
}



// Continuosly running refresh function, every 10 ms
// setInterval(refresh, 100);

