export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


export function calculatePercentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}

export function convert2seconds(hours, minutes) {
    const timestamp = hours * 3600 + minutes * 60;
    return timestamp
}

export function dateToTimestamp(dateStr) {

    // 👇️ Formatted as YYYY-MM-DD hh:mm
    const [dateComponents, timeComponents] = dateStr.split('T');
    console.log(dateComponents);
    console.log(timeComponents);

    const [year, month, day] = dateComponents.split('-');
    const [hours, minutes] = timeComponents.split(':');

    const date = new Date(+year, month - 1, +day, +hours, +minutes,);
    console.log(date);

    // ✅ Get Unix timestamp
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    console.log(unixTimestamp);
    return unixTimestamp * 1000
}