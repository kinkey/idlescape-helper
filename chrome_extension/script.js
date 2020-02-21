function addStyle(selector, style) {
    let styles = document.styleSheets;
    for (i = 0; i < styles.length; i++) {
        if ((!!styles[i].href) && styles[i].href.includes('https://idlescape.com/static/css/main')) {
            styles[i].addRule(selector, style, styles[i].rules.length);
        }
    }
}
addStyle(".navbar1", "grid-template-columns: 1fr 1fr 1fr .2fr .2fr .5fr .5fr .6fr");

let sellDisabled = false;

let soundDisableInnerHtml = '<button class=\"new-buttons enable-sound-notification\">Enable No Food Beep</button>';

let disableSellButtonContainer = document.createElement('div');
disableSellButtonContainer.innerHTML = "<button class=\"new-buttons disable-sell-button\">Disable Sell</button>";
document.getElementsByClassName('navbar1')[0].appendChild(disableSellButtonContainer);

let enableSoundNotification = document.createElement('div');
enableSoundNotification.innerHTML = soundDisableInnerHtml;
document.getElementsByClassName('navbar1')[0].appendChild(enableSoundNotification);

let disableSellButton = function () {
    if (sellDisabled) {
        alert('Sell Button already disabled. To enable please refresh the page');
    } else {
        sellDisabled = true;
        disableSellButtonContainer.innerHTML = "SELL DISABLED";
        addStyle(".item-dialogue-button-div .sell-button", "display:none");
        alert('Sell Button disabled. Please refresh page to enable it again');
    }
};

let soundEnabled = false;

const audioContext = new AudioContext();

function beep(vol, freq, duration) {
    let oscillator = audioContext.createOscillator();
    let gain = audioContext.createGain();
    oscillator.connect(gain);
    oscillator.frequency.value = freq;
    oscillator.type = "sine";
    gain.connect(audioContext.destination);
    gain.gain.value = vol * 0.01;
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration * 0.001)
}

let noFood = function() {
    let emptySlots = document.querySelectorAll('.combat-empty-slot').length;
    if (emptySlots >= 25) {
        beep(15, 550, 100);
    }
}
let beepInterval;
function activateSound(){
    if (soundEnabled) {
        soundEnabled = false;
        alert('Disabling beeping.');
        clearInterval(beepInterval);
        enableSoundNotification.innerHTML = soundDisableInnerHtml;
    } else {
        soundEnabled = true;
        alert('Beeping enabled. Please refresh page to disable it.');
        enableSoundNotification.innerHTML = "<button>BEEPING ENABLED</button>";
        beepInterval =setInterval(noFood, 10000);
    }

}

disableSellButtonContainer.addEventListener('click', disableSellButton, false);
enableSoundNotification.addEventListener('click', activateSound, false);