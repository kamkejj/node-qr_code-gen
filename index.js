import * as fs from 'node:fs';
import generateName from 'sillyname';
import inquirer from 'inquirer';
import qr from 'qr-image';

const sName = generateName();
let url = '';

inquirer
  .prompt([
    {
      message: 'Enter URL to generate QR code:',
      name: 'URL',
    },
  ])
  .then((answers) => {
    url = answers.URL;

    var qr_png = qr.image(url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('qr.png'));

    writeUrlFile('qr.txt', url);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment.");
    } else {
      console.log(error);
    }
  });

function writeUrlFile(fileName, text) {
  fs.writeFile(fileName, text, (err) => {
    if (err) throw err;
  });
}
