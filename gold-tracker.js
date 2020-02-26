function getGoldValueFromElement(element){
    return parseInt(element.match(/\d+/g, '').join(''));
}

const threshHold = Number(window.prompt("Enter the gold notification threshold amount." +
    " This is the minimum amount of gold that needs to added to in order to trigger the beep", 100000));

let goldTextElement = document.querySelector("#gold-tooltip span");
let lastGoldGain = getGoldValueFromElement(goldTextElement.innerHTML) ;

let observerOptions = {
    childList: true,
    attributes: false,
    characterData: true,
    subtree: true
};


function callback (mutations) {
    for (let mutation of mutations) {
        if (mutation.type === 'characterData') {
            let currentGold = getGoldValueFromElement(mutation.target.data);
            console.log("current " +currentGold);
            console.log("threshold " + threshHold);
            let difference = currentGold - lastGoldGain;
            if (difference > threshHold){
                console.log("threshholdpassed");
                console.log("you have gained " + difference);
            }
            lastGoldGain = getGoldValueFromElement(goldTextElement.innerHTML)
        }
    }
}

let observer = new MutationObserver(callback);
observer.observe(goldTextElement, observerOptions);

