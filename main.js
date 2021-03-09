// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// An array of all card companies
const companies = [{digit: 3, name: 'Amex'}, {digit: 4, name: 'Visa'}, {digit: 5, name: 'Mastercard'}, {digit: 6, name: 'Discover'}];


// Add your functions below:

// Converts a card string to an array of numbers
const convertToArray = cardString => cardString.split('').map(x => parseInt(x));

// Validates the Credit Card
const validateCred = cardToCheck => {
    let size = cardToCheck.length - 1;
    let luhnArray = [];
    let sum = 0;

    for (let i = size; i >= 0; i--) {
        if (!((size - (1 - i)) % 2)) {
            let aux = cardToCheck[i] * 2;
            if (aux > 9)
                aux -= 9;

            luhnArray.unshift(aux);
        }
        else
            luhnArray.unshift(cardToCheck[i]);
    }

    sum = luhnArray.reduce((acc, currentValue) => acc + currentValue);

    return !(sum % 10);
}

// Finds all the invalid cards from a determined batch
const findInvalidCards = cardBatch => cardBatch.filter(card => !validateCred(card));

// Identifies the invalid cards manufactors
const idInvalidCardCompanies = invalidArr => {
    let cardToCheck = [];

    for (let i = 0; i < invalidArr.length; i++) {
        for (let j = 0; j < companies.length; j++) {
            if (invalidArr[i][0] === companies[j].digit && !cardToCheck.includes(companies[j].name))
                cardToCheck.push(companies[j].name);
        }
    }

    return cardToCheck;
}



console.log(validateCred(convertToArray('5020630329778616')));

let checkedCards = batch.map(card => validateCred(card));
console.log(`From the batch we conclude: `);
console.log(checkedCards);

let invalidCards = findInvalidCards(batch);
console.log(`This are the invalid cards: `);
console.log(invalidCards);

let companiesID = idInvalidCardCompanies(invalidCards);
console.log(`This are the id's from the companies that mailed out the invalid cards: `);
console.log(companiesID);







