import cron from 'node-cron';
import https from 'https';

function pingServer() {
    
    console.log('Pinging server to keep it alive...');
    
    const options = {
        hostname: 'shoelaa-363c.onrender.com',
        method: 'GET',
        timeout: 60000 
    };

    const req = https.request(options, (res) => {
        console.log(`Ping response: ${res.statusCode}`);
    });

    req.on('timeout', () => {
        req.destroy();
        console.error('Request timed out');
    });

    req.on('error', (err) => {
        console.error('Ping error:', err.message);
    });

    req.end();
}

const job = cron.schedule('*/13 * * * *', pingServer);
job.start();

export { job };
