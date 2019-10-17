import jsTPS_Transaction from './jsTPS_Transaction'

class NewItemTransaction extends jsTPS_Transaction {
    constructor(key, item, callback1, callback2) {
        super();
        this.key = key;
        this.item = item;
        this.callback1 = callback1;
        this.callback2 = callback2;
    }

    doTransaction() {
        this.callback1(this.item, this.key);
    }

    undoTransaction() {
        this.callback2(this.item, this.key);
    }
}

export default NewItemTransaction;