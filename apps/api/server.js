const http = require('http');
const app = require('./app');
const config = require('./config');

const PORT = parseInt(process.env.PORT || config.port, 10);

const server = http.createServer(app);

server.listen(PORT, function() {
    console.log(`SERVER LISTEN ON PORT [${PORT}]`);
});

process.on("uncaughtException", function(ex) {
    console.log(`PROCESS Uncaught Exception : ${ex.stack || ex.message}`);
});

process.on('SIGTERM', function() {
    console.log('PROCESS RECEIVED [SIGTERM]');
    process.exit(0);
});

process.on('SIGINT', function() {
    console.log('PROCESS RECEIVED [SIGINT]');
    process.exit(0);
});
