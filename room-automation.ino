Servo myServo;

// Pin initialization
const int butPin = D4;
const int servoPin = A4;
const int relayPin = D5;

// LED
const int redLed = D2;
const int greenLed = D1;
const int yellowLed = D0;

// Button initialization
int butVal;
int butLast = LOW;
int state = LOW;

// Cloud variables
bool isLocked;
bool isOn;

int lockDoor(String command);

void setup() {
    // cloud variables
    Particle.variable("isLocked", &isLocked, BOOLEAN); // bool 
    Particle.variable("isOn", &isOn, BOOLEAN); // bool 
    
    // cloud functions
    Particle.function("lockDoor", lockDoor); // locks and unlocks door
    Particle.function("lightSwitch", lightSwitch);
    Particle.function("leavingHome", leavingHome);

    // initializes SERVO
    myServo.attach(servoPin);
    
    // initializes LEDS
    pinMode(redLed, OUTPUT);
    pinMode(greenLed, OUTPUT);
    pinMode(yellowLed, OUTPUT);
    
    // initializes RELAY
    pinMode(relayPin, OUTPUT);
    
    // initializes BUTTON
    pinMode(butPin, INPUT_PULLUP);
    
    Serial.begin(9600);
    
    // Initially locks and turns off
    lock();
    turnOff();
}

void loop() {
    // Algorithm that fixes the button reverb caused mechanically
    // Will turn light on/off with one press
    butVal = digitalRead(butPin);
    if (isOn == false) {
        if (butVal == HIGH && butLast == LOW){
            turnOn();
            delay(1000);
            butLast = HIGH;
        }
        else if (butVal == LOW){
          butLast = LOW;
        }
    }
    else if (isOn == true){
        if (butVal == HIGH && butLast == LOW){
            turnOff();
            delay(1000);
            butLast = HIGH;
        }
        else if (butVal == LOW){
          butLast = LOW;
        }
    } 
}

/***** CLOUD FUNCTIONS *****/
// door lock
int lockDoor(String command){
    // outputs the current state to dashboard.particle.io/user/logs
    Particle.publish("lock Status: ", command);
    if (command == "LOCK"){
        lock();
        return 1;
    }
    else if (command == "UNLOCK"){
        unLock();
        return 0;
    }
    else {
        Serial.println("Error! Command not found, try again!");
        return -1;
    }
}
// light switch
int lightSwitch(String command) {
    // outputs the current state to dashboard.particle.io/user/logs
    Particle.publish("switch State: ", command);
    if (command == "ON") {
        turnOn();
        return 1;
    }
    else if (command == "OFF") {
        turnOff();
        return 0;
    }
    else {
        Serial.println("Error! Command not found, try again!");
        return -1;
    }
}
// leaving and coming home
int leavingHome(String command) {
    // outputs the current state to dashboard.particle.io/user/logs
    Particle.publish(command, "home");
    if (command == "LEAVE") {
        lock();
        turnOff();
        return 1;
    }
    else if (command == "COME") {
        unLock();
        turnOn();
        return 0;
    }
    else {
        Serial.println("Error! Command not found, try again!");
        return -1;
    }
}


/***** CONTROL FUNCTIONS *****/
// Lock mode
void lock() {
    myServo.write(135);
    isLocked = true;
    numberOfKnocks = 0;
    digitalWrite(redLed, HIGH);
    digitalWrite(greenLed, LOW);
    Serial.println("Locked!");
}

// Unock mode
void unLock() {
    myServo.write(45);
    isLocked = false;
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, HIGH);
    Serial.println("Unlocked!");
}

// Light off
void turnOn() {
    digitalWrite(relayPin, HIGH);
    isOn = true;
    delay(50);
}

// Light on
void turnOff() {
    digitalWrite(relayPin, LOW);
    isOn = false;
    delay(50);
}