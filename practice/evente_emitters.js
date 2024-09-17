
const { EventEmitter } = require('events');
const ee = new EventEmitter();

const listener1 = () => {
    console.log('I am the first listener');
};

const listener2 = () => {
    console.log('I am the second listener');
};

ee.on('myevent', listener1);
ee.on('myevent', listener2);

ee.removeListener('myevent', listener1);
ee.removeListener('myevent', listener2);

ee.emit('myevent'); 
