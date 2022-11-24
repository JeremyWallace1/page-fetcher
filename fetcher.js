const request = require('request');
const fs = require('fs');
const readline = require('readline');

let input = process.argv;
input.splice(0,2);

const URL = input[0];
const fileName = input[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



request(URL, (error, response, body) => {
  // edge case 3: url is invalid
  if (error) {
    if (error.code === 'ENOTFOUND') {
      console.log(`${URL} is not a valid URL.`)
      process.exit();
    } else {
      console.log(error);
    }
  } else if (fs.existsSync(fileName)) {   // edge case 1: file already exists
    rl.question(`File already exists. Would you like to override ${fileName}?\n Press 'Y' then enter to confirm or enter to exit.\n`, (input) => {
      if (input === 'Y') {
        writeTheFile(fileName, body);
      } else {
        rl.close();
      }
    });
  } else { // file doesn't already exist so okay to write
    writeTheFile(fileName, body);
  }
});

function writeTheFile(fileName, body) {
  fs.writeFile(fileName, body, 'utf8', (err) => {
    if (err) {
      // edge case 2: file path is invalid
      if (err.code === 'ENOENT') {
        console.log("File path is invalid.");
        process.exit();
      } else {
        console.log(err);
        process.exit();
      }
    } else {
      fs.stat(fileName, (err, stats) => {
        console.log(`Downloaded and saved ${stats.size} bytes to ${fileName}`);
        process.exit();
      })
    }
  })
};

