import jsTPS_Transaction from './jsTPS_Transaction'

class RemoveItemTransaction extends jsTPS_Transaction {
    constructor(key, item, callback, oldItem) {
        super();
        this.key = key;
        this.item = item;
        this.callback = callback;
        this.oldItem = oldItem;
    }

    doTransaction() {
        this.callback(this.key, this.item);
    }

    undoTransaction() {
        this.callback(this.key, this.oldItem);
    }
}

export default RemoveItemTransaction;