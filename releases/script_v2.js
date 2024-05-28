function onFormSubmit(params) {
  const nameFieldOfEmail = 'Ваш email'; // <<< Это название поля из формы для email студента
  const nameFieldOfPhone = 'Ваш номер телефона'; // <<< Это название поля из формы для Телефона студента
  const nameFieldOfTelegram = 'Ваш контакт telegram в формате @username'; // <<< Это название поля из формы для Telegram @username студента

  const idForeignLanguagesSheet = ''; // <<< Это ID из адресной строки браузера. Таблица по иностранным языкам
  const pageForeignLanguagesSheet = 'База студентов с ин.языками'; // <<< Это страница, где хранятся данные. Таблица по иностранным языкам

  const idEnglishSheet = ''; // <<< Это ID из адресной строки браузера. Таблица по английскому языку
  const pageEnglishSheet  = 'База учеников'; // <<< Это страница, где хранятся данные. Таблица по английскому языку

  const nameColumnOfSIDFromForeignLanguages = 'FID из базы иностранных'; // <<< Это название столбца для SID из таблицы иностранных языков
  const indexColumnOfSIDFromForeignLanguages = 1; // <<< Это индекс, после того как запишутся данные из формы, скрипт сможем вставить нужные данные в отпрядённый индекс (после данных формы). Индексы не должны повторяться

  const nameColumnOfStatusFromForeignLanguages = 'Статус из базы иностранных'; // <<< Это название столбца для "Статуса" из таблицы иностранных языков
  const indexColumnOfStatusFromForeignLanguages = 2; // <<< Это индекс, после того как запишутся данные из формы, скрипт сможем вставить нужные данные в отпрядённый индекс (после данных формы). Индексы не должны повторяться

  const nameColumnOfSIDFromEnglish = 'SID из базы английского языка'; // <<< Это название столбца для SID из таблицы англиского языка
  const indexColumnOfSIDFromEnglish = 3; // <<< Это индекс, после того как запишутся данные из формы, скрипт сможем вставить нужные данные в отпрядённый индекс (после данных формы). Индексы не должны повторяться

  const nameColumnOfStatusFromEnglish = 'Статус из базы английского языка'; // <<< Это название столбца для "Статуса" из таблицы англиского языка
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

  const phoneCodes = [ "+93", "+358", "+355", "+213", "+1684", "+376", "+244", "+1264", "+672", "+1268", "+54", "+374", "+297", "+6", "+43", "+994", "+1242", "+973", "+880", "+1246", "+375", "+32", "+501", "+229", "+1441", "+975", "+591", "+387", "+267", "+55", "+246", "+673", "+359", "+226", "+257", "+855", "+237", "+1", "+238", "+345", "+236", "+235", "+56", "+86", "+57", "+269", "+242", "+243", "+682", "+506", "+225", "+385", "+53", "+357", "+420", "+45", "+253", "+1767", "+1849", "+593", "+20", "+503", "+240", "+291", "+372", "+251", "+500", "+298", "+679", "+33", "+594", "+689", "+241", "+220", "+995", "+49", "+233", "+350", "+30", "+299", "+1473", "+590", "+1671", "+502", "+44", "+224", "+245", "+595", "+509", "+379", "+504", "+852", "+36", "+354", "+91", "+62", "+98", "+964", "+353", "+972", "+39", "+1876", "+81", "+962", "+77", "+254", "+686", "+850", "+82", "+965", "+996", "+856", "+371", "+961", "+266", "+231", "+218", "+423", "+370", "+352", "+853", "+389", "+261", "+265", "+60", "+960", "+223", "+356", "+692", "+596", "+222", "+230", "+262", "+52", "+691", "+373", "+377", "+976", "+382", "+1664", "+212", "+258", "+95", "+264", "+674", "+977", "+31", "+599", "+687", "+64", "+505", "+227", "+234", "+683", "+1670", "+47", "+968", "+92", "+680", "+970", "+507", "+675", "+51", "+63", "+872", "+48", "+351", "+1939", "+974", "+40", "+7", "+250", "+290", "+1869", "+1758", "+508", "+1784", "+685", "+378", "+239", "+966", "+221", "+381", "+248", "+232", "+65", "+421", "+386", "+677", "+252", "+27", "+211", "+34", "+94", "+249", "+597", "+268", "+46", "+41", "+963", "+886", "+992", "+255", "+66", "+670", "+228", "+690", "+676", "+1868", "+216", "+90", "+993", "+1649", "+688", "+256", "+380", "+971", "+598", "+998", "+678", "+58", "+84", "+1284", "+1340", "+681", "+967", "+260", "+263", "+1345", "+1809", "+1829", "+592", "+383", "+1787", "+1721", "+35818", "+441481", "+441624", "+441534", "+870", ];

  const sheet = SpreadsheetApp.getActiveSheet();

  try {
    const inputedEmail = params.namedValues[nameFieldOfEmail][0];
    const inputedPhone = params.namedValues[nameFieldOfPhone][0];
    const inputedTelegram = params.namedValues[nameFieldOfTelegram][0];

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

    const comparisonPhones = (inputTextPhones1, inputTextPhones2) => {
      const clearPhone = (numberPhone) => {
        const clearMainTrash = (input) => input.replaceAll(' ', '').replaceAll('-', '').replaceAll('_', '').replaceAll('(', '').replaceAll(')', '');
        
        const match = phoneCodes.find(prefix => numberPhone.startsWith(prefix) || numberPhone.startsWith(prefix.replace('+', '')));

        if (match) {
          // Logger.log('1')
          // Logger.log(clearMainTrash(numberPhone).replaceAll(match, ''))
          return clearMainTrash(numberPhone).replaceAll(match, '').replaceAll(match.replace('+', ''), '');
        }
          // Logger.log('2')
          // Logger.log(clearMainTrash(numberPhone.replaceAll('+', '')))
        return clearMainTrash(numberPhone.replaceAll('+', ''));
      };

      const findAndSeparatePhones = (inputTextPhones) => {
        if (!inputTextPhones) {
          return null;
        }

        const phohesArray = String(inputTextPhones).match(/\+?\d+([()_\s-]*\d+)*/g);
        Logger.log(phohesArray)
        if (Array.isArray(phohesArray)) {
          return phohesArray.map((phone) => clearPhone(phone))
        }

        return phohesArray;
      };

      const foundPhonesFromTextArray1 = findAndSeparatePhones(inputTextPhones1);
      const foundPhonesFromTextArray2 = findAndSeparatePhones(inputTextPhones2);

      if (foundPhonesFromTextArray1 && foundPhonesFromTextArray2) {
        return foundPhonesFromTextArray1.some(item => foundPhonesFromTextArray2 && item && foundPhonesFromTextArray2.includes(item))
      }

      return null;
    }

    function comparisonTelegrams(inputeTelegram, inputedTelegramFromSheet) {
      
      function extractUsernames(inputedTelegramFromSheetOfExtractUsernames) {
        if (!inputedTelegramFromSheetOfExtractUsernames) {
          return null;
        }
        
        const matches = String(inputedTelegramFromSheetOfExtractUsernames).match(/@\w+/g);
        return matches ? matches : [];
      }

      function compareUsernames(list1, list2) {
        if (!list1 || !list2) {
          return null
        }
        
        for (let username1 of list1) {
          if (list2.includes(username1)) {
            return true;
          }
        }
        return null;
      }

      function hasMatchingUsername(inputeTelegram, inputedTelegramFromSheet) {
        const extractedUsernamesFromList = extractUsernames(inputeTelegram);
        const extractedUsernamesFrominputedTelegramFromSheet = extractUsernames(inputedTelegramFromSheet);
        return compareUsernames(extractedUsernamesFromList, extractedUsernamesFrominputedTelegramFromSheet);
      }

      return hasMatchingUsername(inputeTelegram, inputedTelegramFromSheet);
    }

    const filteredUsersOfForeignLanguages = getDataFromAnotherSheet({
        spreadSheetId: idForeignLanguagesSheet,
        page: pageForeignLanguagesSheet,
      }).filter((arrayItem) => {
      const emailFromAnotherSheet = arrayItem[indexColumnEmailFromForeignLanguagesSheet - 1];
      const phoneAndTelegramFromAnotherSheet = arrayItem[indexColumnPhoneFromForeignLanguagesSheet - 1];

      return comparisonPhones(inputedPhone, phoneAndTelegramFromAnotherSheet) || comparisonTelegrams(inputedTelegram, phoneAndTelegramFromAnotherSheet) || comparisonEmails(inputedEmail, emailFromAnotherSheet)
    });
    
    const filteredUsersOfEnglish = getDataFromAnotherSheet({
        spreadSheetId: idEnglishSheet,
        page: pageEnglishSheet,
      }).filter((arrayItem) => {
      const emailFromAnotherSheet = arrayItem[indexColumnEmailFromEnglishSheet - 1];
      const phoneAndTelegramFromAnotherSheet = arrayItem[indexColumnPhoneFromEnglishSheet - 1];

      return comparisonPhones(inputedPhone, phoneAndTelegramFromAnotherSheet) || comparisonTelegrams(inputedTelegram, phoneAndTelegramFromAnotherSheet) || comparisonEmails(inputedEmail, emailFromAnotherSheet)
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

      sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfSIDFromForeignLanguages).setValue(resultForeignLanguages[0]); // SID from Foreign Languages
      sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfStatusFromForeignLanguages).setValue(resultForeignLanguages[7]); // Status from Foreign Languages
      sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfSIDFromEnglish).setValue(resultEnglish[0]); // SID from English
      sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfStatusFromEnglish).setValue(resultEnglish[6]); // Status from English
    }
  } catch (error) {
    sheet.getRange("A1").setBackground("#ff0000");

    sheet.getRange(params.range.rowEnd, params.values.length + indexColumnOfStatusFromEnglish + 2).setValue(error).setBackground('#ff0000');

    throw error;
  }
}