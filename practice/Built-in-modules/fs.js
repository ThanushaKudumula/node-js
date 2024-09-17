const fs = require('fs');
fs.readFileSync('fs.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err.message);
    } else {
        console.log('File contents:', data);
    }
});
fs.appendFileSync('fs.txt', 'fs module works on file system', 'utf-8', (err) => {
    if (err) {
        console.log('Error writing file:', err.message);
    } else {
        console.log('Written to file successfully');
    }
});
fs.readFileSync('fs.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err.message);
    } else {
        console.log('File contents:', data);
    }
});
fs.rename('fs.txt', 'sample.txt', (err)=>{
    if(err)console.log('error occured', +err.message);
});
