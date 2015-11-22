import cluster from 'cluster';

// Code to run if we're in the master process
if (cluster.isMaster) {
	const seerEngine = require('seer-fyi-api');
    const cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    cluster.on('exit',  (worker) => {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });
} else {
    let seerEngine = require('seer-fyi-engine');
}