const fs=require('fs');
console.log("event loop execution starts");
//stored in 1st phase
setTimeout(()=>{
    console.log("timer callback ")
}, 0);
// stored in 2nd phase
fs.readFile('/big.file',()=>{
    console.log("file read has completed")
})
//stored in 3rd phase of event loop
setImmediate(()=>{
    console.log("setimmediate call back function is called")
})
process.nextTick(()=>{
    console.log("process.nexttick function is executed")
});
console.log("event looop completed")