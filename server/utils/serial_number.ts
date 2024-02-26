export function generateSerialNumber() {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let serialNumber = '';

    for (let i = 0; i < 10; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        serialNumber += chars[randomIndex];
    }

    return serialNumber;
}


