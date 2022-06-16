export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


export function calculatePercentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
} 