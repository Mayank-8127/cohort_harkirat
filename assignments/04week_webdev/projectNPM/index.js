const { Command } = require('commander');
const fs = require('fs');
const program = new Command();

program
  .name('countWords')
  .description('CLI to count words in a file')
  .version('0.0.1');

program.command('count')
  .description('Count words in the file present at the given path')
  .argument('<file>', 'file path')
  .action((file) => {
    let data = fs.readFileSync(file, 'utf-8')
    JSON.stringify(data);
    let words = data.split(' ');
    let lines = data.split('\n');
    let count = lines.length + words.length - 1;
    console.log('There are ' + count + ' number of words in the file \'' + file + '\'');
  });

program.parse();