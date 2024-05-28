function onFormSubmit(params) {
  Logger.log('start');
  Logger.log(`params >>> ` + JSON.stringify(params));

  const inputedEmail = params.namedValues['Ваш email'][0];
  const inputedPhone = params.namedValues['Ваш номер телефона'][0];

  const sheet = SpreadsheetApp.getActiveSheet();

  const getCell = (num) => SpreadsheetApp.getActiveSheet().getRange(1, params.values.length + num).getValue();

  // headers
  getCell(1) && SpreadsheetApp.getActiveSheet().getRange(1, params.values.length + 1).setValue('SID английский язык');
  getCell(2) && SpreadsheetApp.getActiveSheet().getRange(1, params.values.length + 2).setValue('SID иностранные языки');
  getCell(3) && SpreadsheetApp.getActiveSheet().getRange(1, params.values.length + 3).setValue('статус из базы англ.яз');
  getCell(4) && SpreadsheetApp.getActiveSheet().getRange(1, params.values.length + 4).setValue('статус из базы ин.яз');

  function getDataFromAnotherSheet({spreadSheetId, page}) {
    const ss = SpreadsheetApp.openById(spreadSheetId);
    const sourceSheet = ss.getSheetByName(page); // Replace with actual sheet name

    const data = sourceSheet.getDataRange().getValues();

    return data; // [ [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5] ]
  }

  // const dataCurentSheet = sheet.getDataRange().getValues(); // [ [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5] ]

  const filteredUsersOfForeignLanguages = getDataFromAnotherSheet({
      spreadSheetId: "",
      page: "Sheet1",
    }).filter((arrayItem) => { // [] or [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5]]
    // Logger.log(`arrayItem[21] >>> ${JSON.stringify(arrayItem[21])}`);
    const emailFromAnotherSheet = arrayItem[8];
    const phoneFromAnotherSheet = arrayItem[21];
    
    return emailFromAnotherSheet === inputedEmail || phoneFromAnotherSheet === inputedPhone;
  });
  // Logger.log(`filteredUsersOfForeignLanguages >>> ${JSON.stringify(filteredUsersOfForeignLanguages)}`);
  
  const filteredUsersOfEnglish = getDataFromAnotherSheet({
      spreadSheetId: "",
      page: "Sheet1",
    }).filter((arrayItem) => { // [] or [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5]]
    const emailFromAnotherSheet = arrayItem[7];
    const phoneFromAnotherSheet = arrayItem[20];
    
    return emailFromAnotherSheet === inputedEmail || phoneFromAnotherSheet === inputedPhone;
  });
  Logger.log(`filteredUsersOfEnglish >>> ${JSON.stringify(filteredUsersOfEnglish)}`);

  if (filteredUsersOfForeignLanguages.length > 0 || filteredUsersOfEnglish.length > 0) {
    Logger.log(`ifffffffffffffffffffff`);
    const funReduce = (arr) => arr.reduce((acc, item) => {
      item.forEach((value, index) => {
        if (!acc[index]) {
          acc[index] = [];
        }
        acc[index].push(value);
      });
      return acc;
    }, []).map(arr => arr.join(', '))


    const resultForeignLanguages = funReduce(filteredUsersOfForeignLanguages);
    const resultEnglish = funReduce(filteredUsersOfEnglish);

    SpreadsheetApp.getActiveSheet().getRange(params.range.rowEnd, params.values.length + 2).setValue(resultForeignLanguages[0]); // SID иностранные языки
    SpreadsheetApp.getActiveSheet().getRange(params.range.rowEnd, params.values.length + 4).setValue(resultForeignLanguages[7]); // статус из базы ин.яз

    SpreadsheetApp.getActiveSheet().getRange(params.range.rowEnd, params.values.length + 1).setValue(resultEnglish[0]); // SID английский язык
    SpreadsheetApp.getActiveSheet().getRange(params.range.rowEnd, params.values.length + 3).setValue(resultEnglish[6]); // статус из базы англ.яз
  } else {
    Logger.log(`eleseese`);
  }

  // var data = sheet.getDataRange().getValues();
  // for (var i = 0; i < data.length; i++) {
  //   Logger.log('Product name: ' + data[i][0]);
  //   Logger.log('Product number: ' + data[i][1]);
  // }
}

// >>> params <<<
// {
//     "authMode": "FULL",
//     "namedValues": {
//         "": [
//             "Вариант 2",
//             "да я подт"
//         ],
//         "email": [
//             "657"
//         ],
//         "Вопрос без заголовка": [
//             ""
//         ],
//         "name": [
//             "567"
//         ],
//         "Отметка времени": [
//             "20.05.2024 21:25:52"
//         ]
//     },
//     "range": {
//         "columnEnd": 6,
//         "columnStart": 1,
//         "rowEnd": 33,
//         "rowStart": 33
//     },
//     "source": {},
//     "triggerUid": "30791039",
//     "values": [
//         "20.05.2024 21:25:52",
//         "",
//         "567",
//         "657",
//         "Вариант 2",
//         "да я подт"
//     ]
// }