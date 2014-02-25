var test = require('tape').test,
    concat = require('concat-stream'),
    Fifo = require('../');

test('fifo', function(t) {
    t.plan(3);
    var q = Fifo(3);
    for (var i = 0; i < 3; i++) {
        q.write(i);
    }
    q.stack().pipe(concat(function(res) {
        t.deepEqual(res.toString(), '012');
    }));
    q.stack().pipe(concat(function(res) {
        t.deepEqual(res.toString(), '012');
    }));
    for (var i = 3; i < 20; i++) {
        q.write(i);
    }
    q.stack().pipe(concat(function(res) {
        t.deepEqual(res.toString(), '171819');
    }));
});
