const https = require('https');
const http = require('http');

const TARGET_URL = process.env.RENDER_SERVER_URL || 'https://morisikaproject-4.onrender.com/api/health';
const INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

function pingServer() {
  const client = TARGET_URL.startsWith('https') ? https : http;
  const startedAt = Date.now();

  const req = client.get(TARGET_URL, (res) => {
    res.resume();
    const duration = Date.now() - startedAt;
    console.log(`[${new Date().toISOString()}] Ping OK: ${res.statusCode} (${duration}ms)`);
  });

  req.on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Ping failed: ${err.message}`);
  });

  req.setTimeout(15000, () => {
    req.destroy(new Error('Request timed out'));
  });
}

console.log(`Keep-alive started. Target: ${TARGET_URL}`);
console.log('Pinging every 5 minutes...');

// Run immediately, then every 5 minutes
pingServer();
setInterval(pingServer, INTERVAL_MS);
