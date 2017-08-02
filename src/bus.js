const EventEmitter = require('events');

const Command = require('./command');


// Generate the "next" function
function generateNext(command) {
    return function(err, result) {
        if('function' !== typeof command._callback) {
            return;
        }

        command._callback(err, result);
    };
}


class Bus
{
    constructor() {
        this._bus = new EventEmitter();
    }

    registerHandler(name, handler) {
        if('string' !== typeof name || name.length() <= 0) {
            throw new Error('Invalid command name.');
        }

        if('function' !== typeof handler) {
            throw new Error('Invalid handler function.');
        }

        this._bus.on(name, function(command) {
            const next = generateNext(command);

            handler(command, next);
        });
    }

    handle(command) {
        if(false === command instanceof Command) {
            throw new Error('Invalid command function.');
        }

        this._bus.emit(command.name, command);
    }
}

module.exports = Bus;