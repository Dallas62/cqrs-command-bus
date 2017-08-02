
const Command = require('./command');

class Handler {
    constructor(name, handler) {
        if('string' !== typeof name || name.length() <= 0) {
            throw new Error('Invalid command name.');
        }

        if('function' !== typeof handler) {
            throw new Error('Invalid callback function.');
        }

        this._name = name;
        this._handler = handler;
    }

    get name() {
        return this._name;
    }

    handle(command, next) {
        if(false === command instanceof Command) {
            throw new Error('Invalid command function.');
        }

        this._handler(next);
    }
}

module.exports = Handler;
