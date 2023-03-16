const Gpio = require('pigpio').Gpio;
var motor;
var plantas = [500, 1500, 2500];

module.exports = class SERVO {

    constructor(pin) {
      motor = new Gpio(pin, { mode: Gpio.OUTPUT });
    }

    Mover(planta) {
        motor.servoWrite(plantas[planta]);

        setTimeout(() => {
            motor.servoWrite(plantas[planta]);
        }, 2000);
    }
}
