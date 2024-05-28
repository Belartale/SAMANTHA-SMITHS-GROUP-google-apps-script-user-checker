// const comparisonPhones = (inputTextPhones1, inputTextPhones2) => {
//     const clearPhone = (numberPhone) => numberPhone.replaceAll('+', '').replaceAll(' ', '').replaceAll('-', '').replaceAll('_', '').replaceAll('(', '').replaceAll(')', '');

//     const findAndSeparatePhones = (inputTextPhones) => {
//         if (!inputTextPhones) {
//         return null;
//         }

//         const phohesArray = String(inputTextPhones).match(/\+?\d+([()_\s-]*\d+)*/g);
        
//         if (Array.isArray(phohesArray)) {
//         // Logger.log('11111111');
//         return phohesArray.map((phone) => clearPhone(phone))
//         }
//         // Logger.log('22')
//         return phohesArray;
//     };

//     const foundPhonesFromTextArray1 = findAndSeparatePhones(inputTextPhones1);
//     const foundPhonesFromTextArray2 = findAndSeparatePhones(inputTextPhones2);

//     // Logger.log(typeof foundPhonesFromTextArray1);
//     // Logger.log(typeof foundPhonesFromTextArray2);

//     if (foundPhonesFromTextArray1 && foundPhonesFromTextArray2) {
//         return foundPhonesFromTextArray1.some(item => foundPhonesFromTextArray2 && item && foundPhonesFromTextArray2.includes(item))
//     }

//     return null;
// }

const comparisonEmails = (inputTextEmails1, inputTextEmails2) => {
    const clearEmail = (email) => email.toLowerCase();
    
    const findAndSeparateEmails = (inputTextEmails) => {
        if (!inputTextEmails) {
            return null;
        }

        const emailsArray = String(inputTextEmails).match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g);

        if (Array.isArray(emailsArray)) {
            return emailsArray.map((email) => clearEmail(email));
        }

        return emailsArray;
    };

    const foundEmailsFromTextArray1 = findAndSeparateEmails(inputTextEmails1);
    const foundEmailsFromTextArray2 = findAndSeparateEmails(inputTextEmails2);

     if (foundEmailsFromTextArray1 && foundEmailsFromTextArray2) {
        return foundEmailsFromTextArray1.some(item => foundEmailsFromTextArray2 && item && foundEmailsFromTextArray2.includes(item))
    }

    return null;
};


console.log(comparisonEmails("email1@gmail.com, email2@gmail.ru email3@gmail.ua", 'email2@gmail.ru'))