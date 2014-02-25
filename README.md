# stream-fifo

A [FIFO](http://en.wikipedia.org/wiki/FIFO) in streams:

```js
var fifo = require('stream-fifo'),
    q = fifo(2);

q.write('hi');
q.write('there');
q.write('nice');
q.write('person');

// says 'nice' 'person'
q.stack().on('data', function(data) {
    console.log(data);
});
```

## api

### `fifo(capacity)`

Creates a writable stream, with a specified capacity.
