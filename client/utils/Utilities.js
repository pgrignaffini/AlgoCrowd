export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function convertEpochToSpecificTimezone(timeEpoch, offset) {
    var d = new Date(timeEpoch);
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
    var nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString();
}

export function calculatePercentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
} 