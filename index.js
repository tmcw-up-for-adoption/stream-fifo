var Stream = require('stream');

function StreamArray(stack) {
    Stream.Readable.call(this, {objectMode:true});
    this._stack = stack.slice();
}

StreamArray.prototype = Object.create(Stream.Readable.prototype, {
    constructor: { value: StreamArray }
});

StreamArray.prototype._read = function(size) {
    var chunk = this._stack.splice(0, size);
    this.push(chunk.length ? chunk : null);
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
