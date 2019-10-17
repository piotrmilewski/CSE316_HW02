import jsTPS_Transaction from './jsTPS_Transaction'

class MoveItemTransaction extends jsTPS_Transaction {
    constructor(ItemKey, key, callback1, callback2) {
        super();
        this.ItemKey = ItemKey;
        this.key = key;
        this.callback1 = callback1;
        this.callback2 = callback2;
    }

    doTransaction() {
        this.callback1(this.ItemKey, this.key);
    }

    undoTransaction() {
        this.callback2(this.ItemKey, this.key);
    }
}

export default MoveItemTransaction;