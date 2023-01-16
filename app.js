const inp1 = document.querySelector("#inp1");
const inp2 = document.querySelector("#inp2");
const inp3 = document.querySelector("#inp3");

const resetButton = document.querySelector("#resetButton");
const form = document.querySelector("form");

const heading = document.querySelector("h3");

const resDiv = document.querySelector("#resDiv");

const res0 = document.querySelector("#res0");
const res1 = document.querySelector("#res1");

const select = document.querySelector("select");

function calculator(vedPris, virkningsGrad, spotPris) {
    // console.log(vedPris, virkningsGrad, spotPris)
    const virkningsGradFac = virkningsGrad / 100;
    const netEffect = virkningsGradFac * 65;
    const elPris = (netEffect * spotPris) / 100;
    if (Number(elPris) === Number(vedPris)) { res1.style.display = "none"; return res0.textContent = "Lik pris!" }
    else if (Number(elPris) > Number(vedPris)) {
        const difference = (elPris - vedPris).toFixed(2);
        res0.textContent = `I dette tilfellet er det rimeligere å fyre med ved!`;
        res1.textContent = `Man sparer ${difference.toLocaleString()} kr per sekk.`;
    } else {
        const difference = (vedPris - elPris.toFixed(2));
        res0.textContent = "I dette tilfellet er elektrisk oppvarming rimeligere!";
        res1.textContent = `Ved er ${difference.toLocaleString()} kr dyrere per sekk.`;
    }
    resetButton.style.display = "inline";
    resDiv.classList.add("resDivAfter");
}

async function selectArea(area) {
    const dateNow = new Date;
    const year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    let day = dateNow.getDate();
    if (String(day).length === 1) {
        day = "0" + day;
    };
    if (String(month).length === 1) {
        month = "0" + month;
    };
    const strømPris = await axios.get(`https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_${area}.json`);
    for (let pris of strømPris.data) {
        const timeNow = new Date(pris.time_start);
        if (timeNow.getHours() === dateNow.getHours()) {
            if (area === "NO4") {
                inp3.value = (pris.NOK_per_kWh * 100).toFixed(2);
            } else {
                inp3.value = (pris.NOK_per_kWh * 100 * 1.25).toFixed(2);
            };
        };
    };
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
    select.value = "";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculator(inp1.value, inp2.value, inp3.value);
})

select.addEventListener("change", () => {
    if (!select.value) { inp3.value = null; }
    else selectArea(select.value);
})

resetButton.addEventListener("click", (e) => {
    resetValues();
})
