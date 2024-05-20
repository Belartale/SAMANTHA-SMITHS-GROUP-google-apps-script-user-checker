function onFormSubmit(params) {
  Logger.log('start');
  Logger.log(`${params} >>> ` + JSON.stringify(params));

  const inputedName = params.namedValues.name[0];
  const inputedEmail = params.namedValues.email[0];


  Logger.log(JSON.stringify(inputedName));
  Logger.log(JSON.stringify(inputedEmail));


  addItem(params);

  // var sheet = SpreadsheetApp.getActiveSheet();
  // var data = sheet.getDataRange().getValues();
  // for (var i = 0; i < data.length; i++) {
  //   Logger.log('Product name: ' + data[i][0]);
  //   Logger.log('Product number: ' + data[i][1]);
  // }
}

function addItem(params) {
  // const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('result');
  
  function creteRow() {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('result').appendRow([ Object.values(params.namedValues).map(e => e[0]), 'test']);
  }

  Logger.log(JSON.stringify(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('result') !== null));

  if (!!SpreadsheetApp.getActiveSpreadsheet().getSheetByName('result')) {
    Logger.log('if');
    creteRow();
  } else {
    Logger.log('else');
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('result');
    creteRow();
  }
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
