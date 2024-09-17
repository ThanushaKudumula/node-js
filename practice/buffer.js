const {Buffer} =require('buffer');
const buff1=Buffer.from('hello world ');
console.log(buff1.toString());

const buff2=Buffer.alloc(10, '[10,9,7,8]');
console.log(buff2.toString());
const buff3=Buffer.concat([buff1,buff2]);
console.log(buff3.toString());

const buf = Buffer.from([1, 2, 3]);

for (const b of buf) {
  console.log(b);
}                             
