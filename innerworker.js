function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var threadId = -1;

var incrementingVariable = 0;

async function main() {
    console.log('innerworker: Taking a break...');
    await sleep(2000);
    console.log('innerworker: Two seconds later, showing sleep in a loop...');

    // Sleep in loop
    for (let i = 0; i < 5; i++) {
        incrementingVariable = i;
        if (i === 3)
            await sleep(2000);
        console.log("innerworker: " + i);
    }
}

onmessage = function(e) {
    let messageData = e.data;
    switch(messageData[0]){
        case "setData":
            this.threadId = messageData[1];
            this.incrementingVariable = messageData[2];
            break;
        case "exit":
            postMessage(["kill",this.threadId,this.incrementingVariable]);
            break;
        default:
            console.log(messageData);
            break;
    }
}



main();