/**
 * Raajlaxmi website → Google Sheets lead collector.
 *
 * Setup (once):
 *   1. Create a Google Sheet, then Extensions → Apps Script, and paste this file.
 *   2. Project Settings → Script properties, add:
 *        SHARED_SECRET  = same value as GOOGLE_SCRIPT_SECRET in the website's .env
 *        NOTIFY_EMAILS  = (optional) comma-separated emails to alert on every lead;
 *                         defaults to DEFAULT_NOTIFY_EMAILS below
 *   3. Run testNotify once from the editor to grant the "send email" permission.
 *   4. Deploy → New deployment → type "Web app"
 *        Execute as: Me      Who has access: Anyone
 *   5. Copy the /exec URL into GOOGLE_SCRIPT_URL in the website's .env.
 *
 * After editing this file: Deploy → Manage deployments → edit → Version: New version,
 * so the existing /exec URL picks up the change.
 *
 * Each website form writes to its own tab ("Acacia Leads", "Redevelopment", …).
 * Tabs and header columns are created automatically; new fields add new columns.
 * Column order can be rearranged freely in the sheet: rows are matched by header name.
 */

/** Every lead is emailed here unless the NOTIFY_EMAILS script property overrides it. */
var DEFAULT_NOTIFY_EMAILS = 'info@raajlaxmigroup.com';

var BASE_COLUMNS = [
  'submittedAt', 'name', 'phone', 'email', 'project', 'interest',
  'location', 'units', 'message', 'consent', 'form', 'pageUrl', 'pageTitle',
  'referrer', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
  'utm_content', 'gclid', 'fbclid', 'timestamp'
];

var HEADER_LABELS = {
  submittedAt: 'Date & Time (IST)', name: 'Name', phone: 'Mobile', email: 'Email',
  project: 'Project', interest: 'Interested In', location: 'Location',
  units: 'Total Flats & Shops', message: 'Message', consent: 'Consent',
  form: 'Form', pageUrl: 'Page URL', pageTitle: 'Page Title', referrer: 'Referrer',
  timestamp: 'Timestamp (UTC)'
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty('SHARED_SECRET');
    if (secret && data.secret !== secret) {
      return json_({ ok: false, error: 'unauthorized' });
    }
    delete data.secret;

    lock.waitLock(20000);
    var sheet = getSheet_(String(data.sheet || 'Leads'));
    delete data.sheet;
    var keys = ensureColumns_(sheet, data);
    var row = keys.map(function (key) {
      var value = data[key] == null ? '' : String(data[key]);
      // Keep phone numbers as text so Sheets doesn't drop leading digits or format them.
      return key === 'phone' && value ? "'" + value : value;
    });
    sheet.appendRow(row);
    lock.releaseLock();

    // The lead is already saved, so a mail failure must not report an error (the visitor would resubmit).
    try {
      notify_(props.getProperty('NOTIFY_EMAILS') || DEFAULT_NOTIFY_EMAILS, sheet.getName(), data);
    } catch (mailErr) {
      console.error('Lead email failed: ' + mailErr);
    }
    return json_({ ok: true });
  } catch (err) {
    try { lock.releaseLock(); } catch (ignored) {}
    return json_({ ok: false, error: String(err) });
  }
}

/** Lets you open the /exec URL in a browser to confirm the deployment is live. */
function doGet() {
  return json_({ ok: true, service: 'raajlaxmi-leads' });
}

function labelOf_(key) {
  return HEADER_LABELS[key] || key;
}

function keyOf_(label) {
  for (var key in HEADER_LABELS) {
    if (HEADER_LABELS[key] === label) return key;
  }
  return label;
}

function getSheet_(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, BASE_COLUMNS.length)
      .setValues([BASE_COLUMNS.map(labelOf_)])
      .setFontWeight('bold')
      .setBackground('#0e1a33')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Returns the field key for each column, appending a column for any field the sheet hasn't seen yet. */
function ensureColumns_(sheet, data) {
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var labels = sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(String);
  Object.keys(data).forEach(function (key) {
    var label = labelOf_(key);
    if (labels.indexOf(label) === -1) {
      labels.push(label);
      sheet.getRange(1, labels.length).setValue(label).setFontWeight('bold');
    }
  });
  return labels.map(keyOf_);
}

function notify_(emails, sheetName, data) {
  if (!emails) return;
  var keys = Object.keys(data).filter(function (k) { return data[k] && k !== 'timestamp'; });
  var lines = keys.map(function (k) { return labelOf_(k) + ': ' + data[k]; });
  var rows = keys.map(function (k) {
    var value = escape_(data[k]);
    if (k === 'phone') value = '<a href="tel:+91' + value + '">' + value + '</a>';
    if (k === 'email') value = '<a href="mailto:' + value + '">' + value + '</a>';
    return '<tr><td style="padding:6px 12px;border:1px solid #ddd;background:#f6f6f6;font-weight:bold;white-space:nowrap">' +
      escape_(labelOf_(k)) + '</td><td style="padding:6px 12px;border:1px solid #ddd">' + value + '</td></tr>';
  });
  var message = {
    to: emails,
    name: 'Raajlaxmi Website',
    subject: 'New lead – ' + sheetName + ' – ' + (data.name || '') + ' ' + (data.phone || ''),
    body: lines.join('\n'),
    htmlBody: '<p>New enquiry from the <b>' + escape_(sheetName) + '</b> form:</p>' +
      '<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">' + rows.join('') + '</table>',
  };
  // Hitting "Reply" answers the visitor directly when they left an email address.
  if (data.email) message.replyTo = data.email;
  MailApp.sendEmail(message);
}

function escape_(value) {
  return String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Run once from the Apps Script editor to authorise sending mail and check delivery. */
function testNotify() {
  var emails = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAILS') || DEFAULT_NOTIFY_EMAILS;
  notify_(emails, 'Test', {
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: 'Test Lead', phone: '9876543210', email: 'test@example.com', message: 'Test email from Apps Script.',
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
