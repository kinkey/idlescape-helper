function addStyle(selector, style) {
    let styles = document.styleSheets;
    for (i = 0; i < styles.length; i++) {
        if ((!!styles[i].href) && styles[i].href.includes('https://idlescape.com/static/css/main')) {
            styles[i].addRule(selector, style, styles[i].rules.length);
        }
    }
}

let disabled = false;

addStyle(".navbar1", "grid-template-columns: 1fr 1fr 1fr .5fr .5fr .5fr .5fr;");
let disableSellButtonContainer = document.createElement('div');
disableSellButtonContainer.innerHTML = "<button class=\"disable-sell-button\">Disable Sell</button>";
document.getElementsByClassName('navbar1')[0].appendChild(disableSellButtonContainer);

let disableSellButton = function () {
    if (disabled) {
        alert('Sell Button already disabled. To enable please refresh the page');
    } else {
        disabled = true;
        disableSellButtonContainer.innerHTML = "SELL DISABLED";
        addStyle(".item-dialogue-button-div .sell-button", "display:none");
        alert('Sell Button disabled. Please refresh page to enable it again');
    }
}

disableSellButtonContainer.addEventListener('click', disableSellButton, false);