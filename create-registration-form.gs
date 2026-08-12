/**
 * 滨海林氏青年团 羽毛球赛 — 报名表格自动生成
 * Badminton Tournament Registration Form Generator
 *
 * 用法 How to use:
 *   1. Go to https://script.google.com → New project
 *   2. Delete the placeholder code, paste this whole file
 *   3. Click Run ▶ (function: createTournamentForm) → authorize with your Google account
 *   4. Open the Execution log (View → Logs) — it prints:
 *        - 报名链接 Form link (share this in WhatsApp/WeChat)
 *        - 表格编辑链接 Form edit link
 *        - Google Sheet link (responses land here automatically)
 */

function createTournamentForm() {
  // ---------- The form ----------
  const form = FormApp.create('滨海林氏青年团 羽毛球友谊赛 报名表 Badminton Tournament Registration');

  form.setDescription(
    '欢迎报名参加羽毛球友谊赛！赛后备有晚宴。\n' +
    'Welcome! Dinner will be served after the games.\n\n' +
    '• 每人只可报名 1 个项目 (One category per person)\n' +
    '• 双打项目请填写搭档姓名，没有搭档可留空，我们帮你配对\n' +
    '  (For doubles, write your partner\'s name; leave blank and we will pair you up)'
  );
  form.setConfirmationMessage('报名成功！我们会通过 WhatsApp 通知赛程详情。Thank you — schedule details will follow via WhatsApp.');

  // 姓名 Name
  form.addTextItem()
    .setTitle('姓名 Full Name (as per IC)')
    .setRequired(true);

  // IC — 12 digits, dashes optional
  form.addTextItem()
    .setTitle('身份证号码 IC Number')
    .setHelpText('例如 Example: 990101-01-1234 或 990101011234')
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('请输入有效的身份证号码 (12位数字，可带 "-") Please enter a valid 12-digit IC')
        .requireTextMatchesPattern('^\\d{6}-?\\d{2}-?\\d{4}$')
        .build()
    );

  // 电话 Phone
  form.addTextItem()
    .setTitle('联络电话 Phone Number (WhatsApp)')
    .setHelpText('例如 Example: 012-3456789')
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('请输入有效电话号码 Please enter a valid phone number')
        .requireTextMatchesPattern('^\\+?[0-9][0-9\\-\\s]{8,14}$')
        .build()
    );

  // Email
  form.addTextItem()
    .setTitle('电子邮件 Email')
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('请输入有效电邮 Please enter a valid email address')
        .requireTextIsEmail()
        .build()
    );

  // 晚宴 Dinner
  form.addMultipleChoiceItem()
    .setTitle('赛后晚宴 Post-game Dinner')
    .setHelpText('晚宴免费招待所有参赛者 Dinner is provided for all participants')
    .setChoiceValues(['出席 Attending', '不出席 Not attending'])
    .setRequired(true);

  // 比赛项目 Category — one per person (single choice)
  form.addMultipleChoiceItem()
    .setTitle('比赛项目 Category (每人只可选 1 项 · choose one)')
    .setChoiceValues([
      '男单 Men\'s Singles (MS)',
      '女单 Women\'s Singles (WS)',
      '男双 Men\'s Doubles (MD)',
      '女双 Women\'s Doubles (WD)',
      '混双 Mixed Doubles (XD)'
    ])
    .setRequired(true);

  // 双打搭档 Doubles partner (optional)
  form.addTextItem()
    .setTitle('双打搭档姓名 Doubles Partner Name (如有 if any)')
    .setHelpText('报名双打/混双才需填写。没有搭档？留空，我们帮你安排。Only for doubles/mixed. Leave blank to be paired by us.')
    .setRequired(false);

  // ---------- Linked Google Sheet ----------
  const ss = SpreadsheetApp.create('羽毛球赛报名回复 Badminton Registration Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // Summary tab — live counts to feed into the tournament simulator.
  // Formulas reference the response sheet by column; they activate once
  // the first response arrives (column G = categories, F = dinner).
  const summary = ss.insertSheet('统计 Summary');
  summary.getRange('A1:B10').setValues([
    ['统计 Summary', ''],
    ['总报名人数 Total sign-ups', '=COUNTA(\'Form Responses 1\'!B2:B)'],
    ['晚宴出席 Dinner attending', '=COUNTIF(\'Form Responses 1\'!F2:F,"*出席 Attending*")'],
    ['男单 MS (players)', '=COUNTIF(\'Form Responses 1\'!G2:G,"*男单*")'],
    ['女单 WS (players)', '=COUNTIF(\'Form Responses 1\'!G2:G,"*女单*")'],
    ['男双 MD (players)', '=COUNTIF(\'Form Responses 1\'!G2:G,"*男双*")'],
    ['女双 WD (players)', '=COUNTIF(\'Form Responses 1\'!G2:G,"*女双*")'],
    ['混双 XD (players)', '=COUNTIF(\'Form Responses 1\'!G2:G,"*混双*")'],
    ['', ''],
    ['注: 双打队伍数 = 人数 ÷ 2 (Doubles teams = players ÷ 2)', '']
  ]);
  summary.setColumnWidth(1, 280);

  // ---------- Print the links ----------
  Logger.log('======================================');
  Logger.log('报名链接 SHARE THIS LINK: ' + form.shortenFormUrl(form.getPublishedUrl()));
  Logger.log('表格编辑 Form editor:    ' + form.getEditUrl());
  Logger.log('回复表格 Google Sheet:   ' + ss.getUrl());
  Logger.log('======================================');
}
