const Handlebars = require("handlebars");
const _ = require("lodash");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

Handlebars.registerHelper("table", function (rows, options) {
  if (!Array.isArray(rows)) {
    throw new Error("First argument must be an array of rows");
  }

  let tableHtml = '<table border="1">';

  if (rows.length > 0) {
    rows.forEach((row, index) => {
      if (typeof row === "string") {
        try {
          const correctedRow = row
            .replace(/(\w+):/g, '"$1":')
            .replace(/'/g, '"');

          rows[index] = JSON.parse(correctedRow);
        } catch (e) {
          rows[index] = {};
        }
      }
    });

    const headers = Object.keys(rows[0]);
    tableHtml += "<thead><tr>";
    headers.forEach((header) => {
      tableHtml += `<th>${header}</th>`;
    });
    tableHtml += "</tr></thead>";

    tableHtml += "<tbody>";
    rows.forEach((row) => {
      tableHtml += "<tr>";
      headers.forEach((header) => {
        tableHtml += `<td>${row[header] || ""}</td>`;
      });
      tableHtml += "</tr>";
    });
    tableHtml += "</tbody>";
  }

  tableHtml += "</table>";

  return new Handlebars.SafeString(tableHtml);
});

Handlebars.registerHelper("capitalize", function (str) {
  if (!str || typeof str !== "string") {
    throw new Error("Invalid input string");
  }
  return _.capitalize(str);
});

Handlebars.registerHelper("repeat", function (str, times) {
  if (!str || !times || typeof str !== "string" || isNaN(times)) {
    throw new Error("Invalid input");
  }
  return str.repeat(times);
});

Handlebars.registerHelper("camelCase", function (str) {
  if (!str || typeof str !== "string") {
    throw new Error("Invalid input string");
  }
  return _.camelCase(str);
});

Handlebars.registerHelper("kebabCase", function (str) {
  if (!str || typeof str !== "string") {
    throw new Error("Invalid input string");
  }
  return _.kebabCase(str);
});

Handlebars.registerHelper("snakeCase", function (str) {
  if (!str || typeof str !== "string") {
    throw new Error("Invalid input string");
  }
  return _.snakeCase(str);
});

Handlebars.registerHelper("upperCase", function (str) {
  if (typeof str !== "string") {
    throw new Error("Invalid input");
  }
  return _.toUpper(str);
});

Handlebars.registerHelper("lowerCase", function (str) {
  if (typeof str !== "string") {
    throw new Error("Invalid input");
  }
  return _.toLower(str);
});

Handlebars.registerHelper("replace", function (str, search, replace) {
  if (!str || !search || !replace) {
    throw new Error("Invalid arguments");
  }
  return _.replace(str, search, replace);
});

Handlebars.registerHelper("replaceAll", function (str, search, replacement) {
  return String(str).replaceAll(search, replacement);
});

Handlebars.registerHelper("startsWith", function (str, prefix) {
  if (
    !str ||
    !prefix ||
    typeof str !== "string" ||
    typeof prefix !== "string"
  ) {
    throw new Error("Invalid input");
  }
  return str.startsWith(prefix);
});

Handlebars.registerHelper("endsWith", function (str, suffix) {
  if (
    !str ||
    !suffix ||
    typeof str !== "string" ||
    typeof suffix !== "string"
  ) {
    throw new Error("Invalid input");
  }
  return str.endsWith(suffix);
});

Handlebars.registerHelper("uniqueItems", function (array) {
  if (!Array.isArray(array)) {
    throw new Error("Argument must be an array");
  }
  if (array.length === 0) {
    throw new Error("Invalid input");
  }
  const arr = _.uniq(array);
  return arr;
});

Handlebars.registerHelper("split", function (str, separator) {
  if (
    !str ||
    !separator ||
    typeof str !== "string" ||
    typeof separator !== "string"
  ) {
    throw new Error("Invalid input");
  }
  return _.split(str, separator);
});

Handlebars.registerHelper("join", function (array, separator) {
  if (!Array.isArray(array) || typeof separator !== "string") {
    throw new Error("Invalid input");
  }
  return _.join(array, separator);
});

Handlebars.registerHelper("sum", function (...args) {
  args.pop();
  const sum = args.reduce((acc, val) => {
    return acc + val;
  }, 0);
  return sum;
});

Handlebars.registerHelper("random", function (min, max) {
  if (!min || !max) {
    throw new Error("Invalid arguments");
  }
  return _.random(Number(min), Number(max));
});

Handlebars.registerHelper("max", function (array) {
  if (array.length == 0) {
    throw new Error("Invalid input");
  }
  return _.max(array);
});

Handlebars.registerHelper("min", function (array) {
  if (array.length == 0) {
    throw new Error("Invalid input");
  }
  return _.min(array);
});

Handlebars.registerHelper("filterCollection", function (array, condition) {
  if (!Array.isArray(array)) {
    throw new Error("First argument must be an array");
  }
  if (!condition) {
    throw new Error("Second argument must be a condition");
  }

  const [key, value] = condition.split("=");
  let filterCondition = {};

  if (value === "true") {
    filterCondition[key] = true;
  } else if (value === "false") {
    filterCondition[key] = false;
  } else if (!isNaN(value)) {
    filterCondition[key] = Number(value);
  } else {
    filterCondition[key] = value;
  }

  const result = _.filter(array, filterCondition);
  return new Handlebars.SafeString(JSON.stringify(result));
});

Handlebars.registerHelper("and", function (a, b) {
  if (typeof a !== "boolean" || typeof b !== "boolean") {
    throw new Error("Invalid input");
  }
  return a && b;
});

Handlebars.registerHelper("or", function (a, b) {
  if (typeof a !== "boolean" || typeof b !== "boolean") {
    throw new Error("Invalid input");
  }
  return a || b;
});

Handlebars.registerHelper("contains", function (str, substring) {
  if (
    !str ||
    !substring ||
    typeof str !== "string" ||
    typeof substring !== "string"
  ) {
    throw new Error("Invalid input");
  }
  return str.includes(substring);
});

Handlebars.registerHelper("now", function (format) {
  const date = new Date();
  switch (format) {
    case "toDate":
      return date.toDateString();
    case "toGMT":
      return date.toGMTString();
    case "toUTC":
      return date.toUTCString();
    case "toISO":
      return date.toISOString();
    case "toTime":
      return date.toTimeString();
    default:
      return date.getTime();
  }
});

Handlebars.registerHelper("fromNow", function (date) {
  if (!date) {
    throw new Error("Invalid input");
  }
  return moment(date).fromNow();
});

Handlebars.registerHelper("addDays", function (date, format, days) {
  if (
    !date ||
    typeof days !== "number" ||
    !format ||
    typeof format !== "string"
  ) {
    throw new Error("Invalid input");
  }
  return moment(date, format).add(days, "days").format(format);
});

Handlebars.registerHelper("subtractDays", function (date, format, days) {
  if (
    !date ||
    typeof days !== "number" ||
    !format ||
    typeof format !== "string"
  ) {
    throw new Error("Invalid input");
  }
  return moment(date, format).subtract(days, "days").format(format);
});

Handlebars.registerHelper("formatDate", function (date, format) {
  if (!date) {
    return moment().format(format);
  }
  return moment(date).format(format);
});

Handlebars.registerHelper("diffDate", function (date1, date2, unit) {
  if (!date1 || !date2 || !unit) {
    throw new Error("Invalid input");
  }
  const moment1 = moment(date1, "YYYYMMDD");
  const moment2 = moment(date2, "YYYYMMDD");
  return moment2.diff(moment1, unit);
});

Handlebars.registerHelper("toFixed", function (number, decimals) {
  if (!number || !decimals) {
    throw new Error("Invalid input");
  }
  return number.toFixed(decimals);
});

Handlebars.registerHelper("encodeURI", function (str) {
  if (!str || typeof str !== "string") {
    throw new Error("Invalid input");
  }
  return encodeURI(str);
});

Handlebars.registerHelper("escape", function (str) {
  if (!str || typeof str !== "string") {
    throw new Error("Invalid input");
  }
  return _.escape(str);
});

Handlebars.registerHelper("jsonStringify", function (obj) {
  if (obj === null || typeof obj !== "object") {
    throw new Error("Invalid input");
  }
  const result = JSON.stringify(obj);
  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper("uuid", function () {
  return uuidv4();
});

Handlebars.registerHelper("list", function (items, options) {
  if (!items || !Array.isArray(items)) {
    throw new Error("Invalid input, Not an array");
  }
  const itemsAsHtml = items.map((item) => "<li>" + options.fn(item) + "</li>");
  return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
});

Handlebars.registerHelper("ol", function (items) {
  if (!items || !Array.isArray(items)) {
    throw new Error("Invalid input, Not an array");
  }
  let out = "<ol>\n";
  items.forEach((item) => {
    const escapedItem = Handlebars.escapeExpression(item);
    out += `  <li>${escapedItem}</li>\n`;
  });
  out += "</ol>";
  return new Handlebars.SafeString(out);
});

Handlebars.registerHelper("ul", function (items) {
  if (!items || !Array.isArray(items)) {
    throw new Error("Invalid input, Not an array");
  }
  let out = "<ul>\n";
  items.forEach((item) => {
    const escapedItem = Handlebars.escapeExpression(item);
    out += `  <li>${escapedItem}</li>\n`;
  });
  out += "</ul>";
  return new Handlebars.SafeString(out);
});

Handlebars.registerHelper("italic", function (text) {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid input");
  }
  const escapedText = Handlebars.escapeExpression(text);
  return new Handlebars.SafeString(`<i>${escapedText}</i>`);
});

Handlebars.registerHelper("bold", function (text) {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid input");
  }
  const escapedText = Handlebars.escapeExpression(text);
  return new Handlebars.SafeString(`<b>${escapedText}</b>`);
});

Handlebars.registerHelper("size", function (array) {
  if (!Array.isArray(array)) {
    throw new Error("Argument must be an array");
  }
  return _.size(_.flatten(array));
});

Handlebars.registerHelper("findInCollection", function (array, condition) {
  if (!Array.isArray(array)) {
    throw new Error("First argument must be an array");
  }
  if (!condition) {
    throw new Error("Second argument must be a condition");
  }

  const [key, value] = condition.split("=");
  let findCondition = {};

  if (value === "true") {
    findCondition[key] = true;
  } else if (value === "false") {
    findCondition[key] = false;
  } else if (!isNaN(value)) {
    findCondition[key] = Number(value);
  } else {
    findCondition[key] = value;
  }

  const result = _.find(array, findCondition);
  return new Handlebars.SafeString(JSON.stringify(result));
});

Handlebars.registerHelper("trim", function (string, chars) {
  if (!string || typeof string !== "string") {
    throw new Error("Invalid input");
  }
  const result = _.trim(string, chars || " \t\v\n\r\0");
  return new Handlebars.SafeString(JSON.stringify(result));
});
Handlebars.registerHelper(
  "truncate",
  function (string, length, ending, wordBreak) {
    if (!string || !length || typeof string !== "string") {
      throw new Error("Invalid Input");
    }
    if (typeof ending === "object") {
      wordBreak = true;
      ending = "...";
    }
    length = Number(length);
    let result;
    if (string.length <= length) {
      result = string;
    }

    if (wordBreak) {
      result = string.slice(0, length) + ending;
    } else {
      let truncated = string.slice(0, length);
      let lastSpaceIndex = truncated.lastIndexOf(" ");
      if (lastSpaceIndex > -1) {
        truncated = truncated.slice(0, lastSpaceIndex);
      }
      result = truncated + ending;
    }
    return new Handlebars.SafeString(JSON.stringify(result));
  }
);

Handlebars.registerHelper("blockHelperMissing", function () {
  const options = arguments[arguments.length - 1];
  const res = "Helper '" + options.name + "' not found.";
  return new Handlebars.SafeString(res);
});

Handlebars.registerHelper("helperMissing", function () {
  const options = arguments[arguments.length - 1];
  const res = "Inline helper '" + options.name + "' not found.";
  return new Handlebars.SafeString(res);
});
module.exports = Handlebars;
