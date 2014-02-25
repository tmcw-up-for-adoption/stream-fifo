var Stream = require('stream');

function StreamArray(stack) {
    Stream.Readable.call(this, { objectMode: true });
    this._stack = stack.slice();
}

StreamArray.prototype = Object.create(Stream.Readable.prototype, {
    constructor: { value: StreamArray }
});

StreamArray.prototype._read = function(size) {
    this.push(this._stack.shift());
};

module.exports = function fifo(capacity) {
    var stream = new Stream();
    var stack = [];
    stream.writable = true;
    stream.write = write;
    stream.stack = dump;
    function write(data) {
        stack.push(data);
        if (stack.length > capacity) stack.shift();
    }
    function dump() {
        return new StreamArray(stack);
    }
    return stream;
}
