export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


export function calculatePercentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}

export function convert2seconds(days, hours, minutes, seconds) {
    const timestamp = days * 86400 + hours * 3600 + minutes * 60 + seconds * 1;
    return timestamp
}