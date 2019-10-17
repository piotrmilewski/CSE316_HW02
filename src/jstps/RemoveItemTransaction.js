import jsTPS_Transaction from './jsTPS_Transaction'

class RemoveItemTransaction extends jsTPS_Transaction {
    constructor(key, index, callback1, callback2, item) {
        super();
        this.key = key;
        this.index = index;
        this.callback1 = callback1;
        this.callback2 = callback2;
        this.item = item;
    }

    doTransaction() {
        this.callback1(this.key, this.index);
    }

    undoTransaction() {
        this.callback2(this.key, this.index, this.item);
    }
}

export default RemoveItemTransaction;