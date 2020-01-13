export default function debounce(callBack, delay) {
    let tempoEspera;
    return (...args) => {
        if (tempoEspera) clearTimeout(tempoEspera);
        tempoEspera = setTimeout(() => {
            callBack(...args);
            tempoEspera = null;
        }, delay);
    };
}