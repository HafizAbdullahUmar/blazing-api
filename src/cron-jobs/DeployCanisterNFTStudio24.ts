import { exec } from 'child_process';
import cron from 'node-cron';

let isRunning = false;

export const DeployCanisterNFTStudio24 = async () => { 
    cron.schedule('0 0 * * *', () => {
        if (isRunning) {
            console.log('r:::::::::;Already running')
            return;
        }
        console.log('running a task every 10 seconds');
        isRunning = true;
    exec('dfx deploy entry', (error, stdout, stderr) => {
        console.log('Deploying canisters');
       
        if (error) {
            console.log(`error: ${error.message}`);
        }
        console.log(`stderr: ${stderr}`);
        console.log(`stdout: ${stdout}`);
        isRunning = false;
        return
    });
});
};