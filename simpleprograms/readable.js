//flowing mode

// const {createReadStream }= require('fs');
// const file = createReadStream(process.argv[2], { encoding: 'utf-8' })
// let counter = 0
// file.on('data', chunk => {
//   for (const char of chunk.toString('utf8')) {
//       counter++
//   }
// })
// file.on('end', () => console.log(`Found ${counter} strings`))
// file.on('error', err => console.error(`Error reading file: ${err}`))

//paused mode

const {createReadStream}= require('fs');
// const file = createReadStream(process.argv[2], { encoding: 'utf-8' })
const file=createReadStream('big.file', 'utf-8');
let cnt=0;
let s="";
file.on('readable', ()=>{
    let chunk;
    while((chunk=file.read())!=null){
       
        for(const char of chunk.toString()){
            s=s.concat(char);
            cnt++;
        }
    }
});
file.on('end', ()=>{
    console.log(`${s}`);
    console.log(`found ${cnt} strings`);
});
file.on('error', err => console.error(`Error reading file: ${err}`));
file.on('finish', ()=>{
    console.log("finish reading file");
    // process.exit();
})
