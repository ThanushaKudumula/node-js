 let fs= require('fs');
// fs.writeFile('myfile.txt', "this is the fs built in module", (err)=>{
//     if(err){
//      throw err;
//     }
// } );
// /* write file method overwrites the text */

// // fs.writeFile('myfile.txt', "this is a fs built in module", (err)=>{
// //     if(err){
// //      throw err;
// //     }
// // } );
// fs.readFile('myfile.txt', (err, data)=>{
//     if(err)throw err;
//     console.log(data);
// });
// fs.readFile('myfile.txt', 'utf-8', (err, data)=>{
//     if(err)throw err;
//     console.log(data);
// });
// fs.writeFile('myfile1.txt', " this is another file", (err)=>{
//     if(err)throw err;
// })

fs.readFile('myfile.txt', 'utf-8', (err, data)=>{
    if(err)throw err;
    fs.appendFile('myfile1.txt', `\n${data}`, (err)=> {
        if(err)throw err;
    });
});

fs.unlink('deletefile.txt', (err)=>{
    if(err)throw err;
    console.log('file deleted')
} );


