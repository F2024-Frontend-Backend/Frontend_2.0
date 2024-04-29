export function isValidLuhn(number: string) {
    let sum = 0
    let double = false
    for(let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i), 10)
        if(double){
            digit *= 2;
            if(digit > 9){
                digit -= 9
            }
        }
        sum += digit
        double = !double;
    }
    return sum % 10 === 0
}

export function getCardType(number: string){
    const visaPattern =  /^4[0-9]{12}(?:[0-9]{3})?$/
    const masterCardPattern = /^(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    const dankortPattern = /^4[0-9]{3}5019\d{8}$/

    if (visaPattern.test(number)) return 'Visa';
    if (masterCardPattern.test(number)) return 'MasterCard';
    if (dankortPattern.test(number)) return 'Dankort';
    return 'Unknown';
}

export function isValidCardNumber(number: string) {
    const cleanNumber = number.replace(/\s+/g, '');
    const cardType = getCardType(cleanNumber);

    if (cardType === 'Unknown') {
        return { isValid: false, message: 'Unsupported card type' };
    }

    if (!isValidLuhn(cleanNumber)) {
        return { isValid: false, message: 'Invalid card number' };
    }

    return true;
}

export const isValidDate = (date: string) => {
    return /^((0[1-9]|1[0-2])\/([0-9]{2}))$/.test(date);
}

export function isValidCvv(number: string) {
    if(number.length === 3 && /^[0-9]*$/.test(number)) {
        return true;
    } else {
        return false;
    }
}
