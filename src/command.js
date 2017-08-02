
class Command {
    constructor(name, content = {}) {
        if('string' !== typeof name || name.length <= 0) {
            throw new Error('Invalid command name.');
        }

        this._name = name;
        this._content = content;
    }

    get name() {
        return this._name;
    }

    get content() {
        return this._content;
    }

    handled(callback) {
        if('function' !== typeof callback) {
            throw new Error('Invalid callback function.');
        }

        this._callback = callback;
    }
}

module.exports = Command;
