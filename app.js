const inp1 = document.querySelector("#inp1");
const inp2 = document.querySelector("#inp2");
const inp3 = document.querySelector("#inp3");

const resetButton = document.querySelector("#resetButton");
const form = document.querySelector("form");

const heading = document.querySelector("h3");

const resDiv = document.querySelector("#resDiv");

const res0 = document.querySelector("#res0");
const res1 = document.querySelector("#res1");

function calculator(vedPris, virkningsGrad, spotPris) {
    // console.log(vedPris, virkningsGrad, spotPris)
    const virkningsGradFac = virkningsGrad / 100;
    const netEffect = virkningsGradFac * 65;
    const elPris = (netEffect * spotPris) / 100;
    resetButton.style.display = "inline";
    resDiv.classList.add("resDivAfter");
    if (Number(elPris) === Number(vedPris)) { res1.style.display = "none"; return res0.textContent = "Lik pris!" }
    else if (Number(elPris) > Number(vedPris)) {
        const difference = elPris - vedPris;
        res0.textContent = `I dette tilfellet er det rimeligere å fyre med ved!`;
        res1.textContent = `Man sparer ${difference.toLocaleString()} kr per vedsekk.`;
    } else {
        const difference = vedPris - elPris;
        res0.textContent = "I dette tilfellet er elektrisk oppvarming rimeligere!";
        res1.textContent = `Man sparer ${difference.toLocaleString()} kr per vedsekk.`;
    }
}

function resetValues() {
    resDiv.classList.remove("resDivAfter");
    resetButton.style.display = "none";
    res1.style.display = "block";
    res0.textContent = null;
    res1.textContent = null;
    inp1.value = null;
    inp2.value = null;
    inp3.value = null;
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculator(inp1.value, inp2.value, inp3.value);
})



resetButton.addEventListener("click", (e) => {
    resetValues();
})
