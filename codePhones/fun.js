const codesPhone = [ "+93", "+380", "+355", "+213", "+1684", "+376", "+244", "+1264", "+672", "+1268", "+54", "+374" ];

const removeCodeOfNumberPhone = (number) => {
    let result = number;
    let isFinish = false;

    // for (let i = 0; i < codesPhone.length; i++) {
    //     if (result.startsWith(codesPhone[i])) {
    //         result = result.replace(codesPhone[i], "");
    //         break;
    //     }
    // }

    for (let index = 0; index < codesPhone.length; index++) { // forEach >>> codesPhone
        const codePhone = codesPhone[index];
        // console.log('removeCodeOfNumberPhone => codePhone:', codePhone) // +380

        for (let index = 0; index < codePhone.length; index++) { // forEach >>> codePhone + 3 8 0
            const number = codePhone[index];
            // console.log('removeCodeOfNumberPhone => number:', number) // + 3 8 0

            if (number[0] === number) {
                
            }

            // if (result.startsWith(codesPhone[index])) {
            //     result = result.replace(codesPhone[index], "");
            //     console.log(`11111111111111111111111111111`)
            //     break;
            // }
        }
    }



    // for (let index = array.length; index > 0; index--) {
    //     const element = array[index];
    // }

    return result;
};

// console.log('removeCodeOfNumberPhone(+380963392099)', removeCodeOfNumberPhone('+380963392099'));

console.log('removeCodeOfNumberPhone(0963392099)', removeCodeOfNumberPhone('0963392099'));
// console.log('removeCodeOfNumberPhone(963392099)', removeCodeOfNumberPhone('963392099'));

const clearNumber = (numberPhone) => numberPhone.replaceAll(' ', '').replaceAll('-', '').replaceAll('_', '').replaceAll('(', '').replaceAll(')', '');

function comparisonNumbers(phone1, phone2) {
    // todo треба якось знайти ці номера в строках "+380963392099, +380 963 392 097 telegram 0963392099 096 3392 091+380-963-392-097 096-339-2097"
    let isSamePhone = true;

    const newPhone1 = [];
    const newPhone2 = [];

    const reversedPhone1 = clearNumber(phone1).split("").reverse().join("");
    const reversedPhone2 = clearNumber(phone2).split("").reverse().join("");

    for (let index = 0; index < reversedPhone1.length; index++) { // 7
        // if (!isSamePhone) {
        //     break;
        // }
        
        const number1 = reversedPhone1[index];
        const number2 = reversedPhone2[index];
        
        if (number1 === number2) {
            newPhone1.unshift(number1);
            newPhone2.unshift(number2);
        } else {
            isSamePhone = false;
            break;
        }
    }

    console.log(`newPhone1 >>> ${newPhone1} | newPhone2 >>> ${newPhone2}`)



    //
    //
    //
    //

    // вход +380963392099
    //todo >>> remove +380 >>> 963392099

    // таблиця 0963392099

    // look to +380
    // +380 check each number in 0963392099 if true remove number >>> repeat it !!!

    // got 963392099 >>> 963392099 === 963392099
}

// Пример использования функции
const str1 = "+380963392091, watchsp +380-963-3920-94 tel +380963392091 0963392091";
const str2 = "Телеграм +380963392091 или @belart, Вайбер +380 963 392 092, Ватсап +380-9633-920-93 0963392091";

const result = comparisonNumbers('0987654321', '+380987654321');
