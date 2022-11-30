#!/bin/sh
const spawnedShell = require('child_process').spawn('/bin/sh', {shell:false});
const readline = require('readline');
const {spawnSync} = require('child_process');
spawnedShell.stdout.on('data', (data) => {
 console.log(`${data}`);
});
spawnedShell.stderr.on('data', (data) => {
 console.error(`${data}`);
});
spawnedShell.on('exit', function (code, signal) {
 console.log('spawned shell exited with ' +
             `code ${code} and signal ${signal}`);
});       
const getInput = () => {
   const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   });
  
   rl.question("", (command) =>{
       if (command === 'exit'){
           spawnedShell.stdin.end();
           rl.close();
       }
       else{
           spawnedShell.stdin.write(`${command} \n`);
           rl.close();
           getInput();
       }
   });
}
spawnedShell.stdin.write('cd /home \n');
getInput();
 
 

