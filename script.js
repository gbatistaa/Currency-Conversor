//Declaração das variáveis DOM dos nomes e valores das moedas, e do botão de confirmar:

let submitButton = document.getElementById('submit');
let resultBox = document.getElementById('result-box');

//Função assíncrona para pegar os dados do input do usuário e associá-los as moedas:

async function currencyValues (c1, c2, v1) {
    try {
        if (typeof c1 == "string" && typeof c2 == "string" && typeof v1 == "number") {
            const data = await fetch('https://open.er-api.com/v6/latest/USD', {mode: 'cors', method: 'GET'});
            const dataFormated = await data.json();
            console.log(dataFormated)
            const coin1 = Number(dataFormated.rates[c1.toUpperCase()]);
            const coin2 = Number(dataFormated.rates[c2.toUpperCase()]);
            const resultElement = document.getElementById('result-element')
            const resultText = document.createTextNode(`${Number(((coin2 / coin1) * v1).toFixed(2))} $ ${c2.toUpperCase()}`);
            if (resultElement.innerText.length == 0) {
                resultElement.appendChild(resultText);
                resultBox.appendChild(resultElement);
            };
        } else {
            console.log(new Error('Os valores passados devem ter caracteres alfabéticos'));
        };
    } catch (error) {
        console.error(error);
        
    };
};

submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    resultBox.style.animationName = 'aparecer';
    resultBox.style.animationDuration = '0.25s';
    resultBox.style.visibility = 'visible';
    let currency1 = String(document.getElementById('currency1').value);
    let currency2 = String(document.getElementById('currency2').value);
    let value1 = Number(document.getElementById('value1').value);
    currencyValues(currency1, currency2, value1);
});
