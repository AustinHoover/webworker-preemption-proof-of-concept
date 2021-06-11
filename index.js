

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    var myWorker = new Worker('worker.js');
}



main();
