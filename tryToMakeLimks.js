function onFormSubmit(params) { // todo валідація на телефон (убирать пробел та знак "+")
  const idForeignLanguagesSheet = ''; // <<< Это ID из адресной строки браузера. Таблица по иностранным языкам
  const pageForeignLanguagesSheet = 'Sheet1'; // <<< Это страница, где хранятся данные. Таблица по иностранным языкам

  const idEnglishSheet = ''; // <<< Это ID из адресной строки браузера. Таблица по английскому языку
  const pageEnglishSheet  = 'Sheet1'; // <<< Это страница, где хранятся данные. Таблица по английскому языку

  const nameFieldOfEmail = 'Ваш email'; // <<< Это название поля для email студента
  const nameFieldOfPhone = 'Ваш номер телефона'; // <<< Это название поля для телефона студента


  const nameColumnOfSIDFromForeignLanguages = 'SID иностранные языки'; // <<< Это название столбца для SID из таблицы иностранных языков
  const indexColumnOfSIDFromForeignLanguages = 1; // <<< Это индекс, после того как запишутся данные из формы, скрипт сможем вставить нужные данные в отпрядённый индекс (после данных формы). Индексы не должны повторяться

  const nameColumnOfStatusFromForeignLanguages = 'статус из базы ин.яз'; // <<< Это название столбца для "Статуса" из таблицы иностранных языков
  const indexColumnOfStatusFromForeignLanguages = 2; // <<< Это индекс, после того как запишутся данные из формы, скрипт сможем вставить нужные данные в отпрядённый индекс (после данных формы). Индексы не должны повторяться

  const nameColumnOfSIDFromEnglish = 'SID английский язык'; // <<< Это название столбца для SID из таблицы англиского языка
  const indexColumnOfSIDFromEnglish = 3; // <<< Это индекс, после того как запишутся данные из формы, скрипт сможем вставить нужные данные в отпрядённый индекс (после данных формы). Индексы не должны повторяться

  const nameColumnOfStatusFromEnglish = 'статус из базы англ.яз'; // <<< Это название столбца для "Статуса" из таблицы англиского языка
  const indexColumnOfStatusFromEnglish = 4; // <<< Это индекс, после того как запишутся данные из формы, скрипт сможем вставить нужные данные в отпрядённый индекс (после данных формы). Индексы не должны повторяться

  const indexColumnEmailFromForeignLanguagesSheet = 9; // <<< Это номер колонки "Email" из таблицы иностранных языков
  const indexColumnPhoneFromForeignLanguagesSheet = 22; // <<< Это номер колонки "Телефон" из таблицы иностранных языков

  const indexColumnEmailFromEnglishSheet = 8; // <<< Это номер колонки "Email" из таблицы англиского языка
  const indexColumnPhoneFromEnglishSheet = 21; // <<< Это номер колонки "Телефон" из таблицы англиского языка

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////

  // SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Лист1").getRange("A1").setFormula("=HYPERLINK(\"https://www.google.com\");HYPERLINK(\"https://www.google.com\")");

  const inputedEmail = params.namedValues[nameFieldOfEmail][0];
  const inputedPhone = params.namedValues[nameFieldOfPhone][0];

  const sheet = SpreadsheetApp.getActiveSheet();

  const getCell = (num) => sheet.getRange(1, params.values.length + num).getValue();

  // set headers
  !getCell(indexColumnOfSIDFromForeignLanguages) && sheet.getRange(1, params.values.length + indexColumnOfSIDFromForeignLanguages).setValue(nameColumnOfSIDFromForeignLanguages);
  !getCell(indexColumnOfStatusFromForeignLanguages) && sheet.getRange(1, params.values.length + indexColumnOfStatusFromForeignLanguages).setValue(nameColumnOfStatusFromForeignLanguages);
  !getCell(indexColumnOfSIDFromEnglish) && sheet.getRange(1, params.values.length + indexColumnOfSIDFromEnglish).setValue(nameColumnOfSIDFromEnglish);
  !getCell(indexColumnOfStatusFromEnglish) && sheet.getRange(1, params.values.length + indexColumnOfStatusFromEnglish).setValue(nameColumnOfStatusFromEnglish);

  function getDataFromAnotherSheet({spreadSheetId, page}) {
    const ss = SpreadsheetApp.openById(spreadSheetId);
    const sourceSheet = ss.getSheetByName(page);

    const data = sourceSheet.getDataRange().getValues();

    return data;
  }

  function returnTextForcheckingPhone(inputPhone) {
    if (typeof inputPhone !== 'string' || inputPhone.length <= 0) {
      return NaN;
    }

    let result = inputPhone.toLowerCase();
    
    if (/^\+?.*/.test(result)) {
      result = result.replace('+', '');
    }

    if (/^\@?.*/.test(result)) {
      result = result.replace('@', '');
    }

    return result.replaceAll(' ', '');
  }

  const filteredUsersOfForeignLanguages = getDataFromAnotherSheet({
      spreadSheetId: idForeignLanguagesSheet,
      page: pageForeignLanguagesSheet,
    }).filter((arrayItem) => {
    const emailFromAnotherSheet = arrayItem[indexColumnEmailFromForeignLanguagesSheet - 1];
    const phoneFromAnotherSheet = arrayItem[indexColumnPhoneFromForeignLanguagesSheet - 1];
    
    return returnTextForcheckingPhone(emailFromAnotherSheet) === returnTextForcheckingPhone(inputedEmail) 
      || returnTextForcheckingPhone(phoneFromAnotherSheet) === returnTextForcheckingPhone(inputedPhone);
  });
  
  const filteredUsersOfEnglish = getDataFromAnotherSheet({
      spreadSheetId: idEnglishSheet,
      page: pageEnglishSheet,
    }).filter((arrayItem) => {
    const emailFromAnotherSheet = arrayItem[indexColumnEmailFromEnglishSheet - 1];
    const phoneFromAnotherSheet = arrayItem[indexColumnPhoneFromEnglishSheet - 1];
    
    return returnTextForcheckingPhone(emailFromAnotherSheet) === returnTextForcheckingPhone(inputedEmail) 
      || returnTextForcheckingPhone(phoneFromAnotherSheet) === returnTextForcheckingPhone(inputedPhone);
  });

  if (filteredUsersOfForeignLanguages.length > 0 || filteredUsersOfEnglish.length > 0) {
    const funReduce = (arr) => arr.reduce((acc, item) => {
      item.forEach((value, index) => {
        if (!acc[index]) {
          acc[index] = [];
        }
        acc[index].push(value);
      });
      return acc;
    }, []).map(arr => arr.join('\n'));

    const resultForeignLanguages = funReduce(filteredUsersOfForeignLanguages);
    const resultEnglish = funReduce(filteredUsersOfEnglish);

    function addMultipleUrlsToCell(input) {
      const parts = input.split('\n');

      let currentIndex = 0;
      const result = parts.map(part => {
        const start = currentIndex;
        const end = start + part.length;
        currentIndex = end + 1;
        return { start, end };
      });

      // Logger.log(`result >>> ` + JSON.stringify(result));

      const RichTextValue = SpreadsheetApp.newRichTextValue()
      .setText(input)
      // .setLinkUrl(0,2,"https://google.com/").build();

      // result.forEach((objIindexes, index) => {
      //   Logger.log(`objIindexes >>> ` + JSON.stringify(objIindexes));
      
      //   index === 0 && RichTextValue.setLinkUrl(0,2,"https://google.com/");
      // });
      const prom = new Promise();
      
      prom.then(() => {
        result.map((e, index) => {
         RichTextValue.setLinkUrl(e.start,e.end,"https://google.com/")
        });
      }).then((R) => {
        RichTextValue.build();
      });


      sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfSIDFromForeignLanguages).setRichTextValue(RichTextValue);
    }

    sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfSIDFromForeignLanguages).setValue(resultForeignLanguages[0]); // SID from Foreign Languages
    sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfStatusFromForeignLanguages).setValue(resultForeignLanguages[7]); // Status from Foreign Languages
    sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfSIDFromEnglish).setValue(resultEnglish[0]); // SID from English
    sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfStatusFromEnglish).setValue(resultEnglish[6]); // Status from English

    addMultipleUrlsToCell(resultForeignLanguages[0])
  }
}