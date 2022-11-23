const request = require('request');
const fs = require('fs');

let input = process.argv;
input.splice(0,2);

const URL = input[0];
const fileName = input[1];

request(URL, (error, response, body) => {
  fs.writeFile(fileName, body, 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      fs.stat(fileName, (err, stats) => {
        if (err) {
          console.log("File doesn't exist.");
        } else {
          console.log(`Downloaded and saved ${stats.size} bytes to ${fileName}`);
        }
      });
    }
  });
});

/**
 * STRETCH
 * edge case 1: file already exists
 * edge case 2: file path is invalid
 * edge case 3: url is invalid
 */