const http=require('http');
const fs=require("fs");
const url=require("url");
// const replacehtml=require('./CustomModule');
const event=require("events");
// let myemitter=new event.EventEmitter();
const user=require('./classevent');
let myemitter=new user();
myemitter.on('userCreated', (id, name)=>{
    console.log(`a new user id ${id} and name ${name} is created`);
})
myemitter.on('emitter 1', (id, name)=>{
    console.log(`a new user id ${id} and name ${name} is created emitter 1`);
})
myemitter.emit('userCreated', 10, 'honey');
myemitter.emit('emitter 1',21, 'bheem' );

