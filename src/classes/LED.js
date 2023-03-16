const Gpio = require('onoff').Gpio;       //Blink on and off --> onoff 'library'
var led;

module.exports = class LED {
    
    constructor(pin) {
        led = new Gpio(pin, 'out');
    }

    On() {
        led.writeSync(1);
    }

    Off() {
        led.writeSync(0);
    }

}