import jsTPS_Transaction from './jsTPS_Transaction'

class NameChangeTransaction extends jsTPS_Transaction {
    constructor(key, oldName, newName, callback) {
        super();
        this.key = key;
        this.oldName = oldName;
        this.newName = newName;
        this.callback = callback;
    }

    doTransaction() {
        this.callback(this.key, this.newName);
    }

    undoTransaction() {
        this.callback(this.key, this.oldName);
    }
}

export default NameChangeTransaction;