export function createArray(length) {
    const array = []
    for (let i = 0; i < length; i++) {
        array[i] = Math.floor(Math.random() * 100)
    }
    return array    
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}