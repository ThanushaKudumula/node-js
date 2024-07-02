const { createReadStream, createWriteStream } =require('fs');
const [,, src, dest] = process.argv; 
const srcStream = createReadStream(src);
const destStream = createWriteStream(dest);
srcStream.pipe(destStream);
srcStream.on('data', (chunk) => destStream.write(chunk));
srcStream.on('error', (err) => {
  console.error('Error reading source file:', err);
});
destStream.on('error', (err) => {
  console.error('Error writing to destination file:', err);
});
destStream.on('finish', () => {
  console.log('File has been copied successfully.');
});
