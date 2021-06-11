function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let threadMap = new Map();
let threadIdIncrementer = 0;

function threadMessageHandler(e) {
    let messageData = e.data;
    switch(messageData[0]){
        case "kill":
            let target = threadMap.get(messageData[1]);
            target.terminate();
            console.log("data: " + messageData[2]);
            break;
    }
}

function createThread(file,data){
    var myWorker = new Worker(file);
    threadMap.set(threadIdIncrementer,myWorker);
    myWorker.postMessage(["setData",threadIdIncrementer,data]);
    myWorker.onmessage = threadMessageHandler;
    threadIdIncrementer++;
    return myWorker;
}

async function main() {
    console.log('worker: Launching thread...');
    let newThread = createThread('innerworker.js',0);
    await sleep(4000);
    newThread.postMessage(["exit"]);
    // myWorker.postMessage("test");
    // myWorker.terminate();
}

// onmessage = function(e) {
//     let messageData = e.data;
//     switch(messageData[0]){
//         case "kill":
//             let target = threadMap.get(messageData[1]);
//             target.terminate();
//             console.log(messageData[2]);
//             break;
//     }
// }



main();