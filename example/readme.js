var fifo = require('../');

var q = fifo(2);

q.write('hi');
q.write('there');
q.write('nice');
q.write('person');

q.stack().on('data', function(data) {
    console.log(data);
});
