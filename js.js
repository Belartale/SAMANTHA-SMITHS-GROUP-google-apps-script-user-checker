function onFormSubmit(params) {
    Logger.log('start');
    // Logger.log(`${params} >>> ` + JSON.stringify(params));

    let sheet = SpreadsheetApp.getActiveSheet();

    const getCell = (num) =>
        SpreadsheetApp.getActiveSheet()
            .getRange(1, params.values.length + num)
            .getValue();

    // headers
    getCell(1) &&
        SpreadsheetApp.getActiveSheet()
            .getRange(1, params.values.length + 1)
            .setValue('SID английский язык');
    getCell(2) &&
        SpreadsheetApp.getActiveSheet()
            .getRange(1, params.values.length + 2)
            .setValue('SID иностранные языки');
    getCell(3) &&
        SpreadsheetApp.getActiveSheet()
            .getRange(1, params.values.length + 3)
            .setValue('статус из базы англ.яз');
    getCell(4) &&
        SpreadsheetApp.getActiveSheet()
            .getRange(1, params.values.length + 4)
            .setValue('статус из базы ин.яз');

    // cells
    SpreadsheetApp.getActiveSheet()
        .getRange(params.range.rowEnd, params.values.length + 1)
        .setValue('111'); // SID английский язык
    SpreadsheetApp.getActiveSheet()
        .getRange(params.range.rowEnd, params.values.length + 2)
        .setValue('2222'); // SID иностранные языки
    SpreadsheetApp.getActiveSheet()
        .getRange(params.range.rowEnd, params.values.length + 3)
        .setValue('procc'); // статус из базы англ.яз
    SpreadsheetApp.getActiveSheet()
        .getRange(params.range.rowEnd, params.values.length + 4)
        .setValue('can'); // статус из базы ин.яз

    function getDataFromAnotherSheet() {
        const spreadsheetId = ''; // Replace with actual ID
        const ss = SpreadsheetApp.openById(spreadsheetId);
        const sourceSheet = ss.getSheetByName('Sheet2'); // Replace with actual sheet name

        const data = sourceSheet.getDataRange().getValues();

        return data; // [ [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5] ]
    }

    // Logger.log(getDataFromAnotherSheet());

    const dataCurentSheet = sheet.getDataRange().getValues(); // [ [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5] ]
    Logger.log(dataCurentSheet);

    const isFind = getDataFromAnotherSheet().find((arrayItem) =>
        arrayItem[21].some(
            (itemForFinding) =>
                itemForFinding ===
                dataCurentSheet.some(
                    (arrayItemOfDataCurentSheet) =>
                        arrayItemOfDataCurentSheet === itemForFinding
                )
        )
    );

    Logger.log(`isFind >>> ${isFind}`);

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
