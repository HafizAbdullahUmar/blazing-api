import { Request, Response } from 'express';
import { exec } from 'child_process';
import cron from 'node-cron';

export const deploy = async (req: Request, res: Response) => { 
    console.log('Deploying canisters');
    cron.schedule('*/1 * * * * *', () => {
        console.log('running a task every 10 seconds');
        return res.json({ message: 'Deploying canisters' });
    // exec('dfx deploy NFTStudio24 --network ic', (error, stdout, stderr) => {
    //     console.log(stderr, "DDD::::DDDD")
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return res.status(500).json({ error: 'Failed to execute command' });
    //     }
    //     console.log(`stderr: ${stderr}`);
    //     console.log(`stdout: ${stdout}`);
    //     return res.json({ message: 'Command executed successfully', output: stdout, errors: stderr });
    // });
});
};