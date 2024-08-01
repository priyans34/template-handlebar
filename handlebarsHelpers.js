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
  if (typeof str !== "string") {
    throw new Error("A valid string argument is required");
  }
  if (str === "") {
    throw new Error("The string argument cannot be empty");
  }
  return _.capitalize(str);
});

Handlebars.registerHelper("repeat", function (str, times) {
  if (typeof str !== "string") {
    throw new Error("The first argument must be a string");
  }
  if (typeof times !== "number" || isNaN(times) || times < 1) {
    throw new Error("The second argument must be a positive number");
  }
  return str.repeat(times);
});

Handlebars.registerHelper("camelCase", function (str) {
  if (typeof str !== "string") {
    throw new Error("A valid string argument is required");
  }
  if (str.trim() === "") {
    throw new Error("The string argument cannot be empty");
  }
  return _.camelCase(str);
});

Handlebars.registerHelper("kebabCase", function (str) {
  if (typeof str !== "string") {
    throw new Error("A valid string argument is required");
  }
  if (str.trim() === "") {
    throw new Error("The string argument cannot be empty");
  }
  return _.kebabCase(str);
});

Handlebars.registerHelper("snakeCase", function (str) {
  if (typeof str !== "string") {
    throw new Error("A valid string argument is required");
  }
  if (str.trim() === "") {
    throw new Error("The string argument cannot be empty");
  }
  return _.snakeCase(str);
});

Handlebars.registerHelper("upperCase", function (str) {
  if (typeof str !== "string") {
    throw new Error("A valid string argument is required");
  }
  if (str.trim() === "") {
    throw new Error("The string argument cannot be empty");
  }
  return _.toUpper(str);
});

Handlebars.registerHelper("lowerCase", function (str) {
  if (typeof str !== "string") {
    throw new Error("A valid string argument is required");
  }
  if (str.trim() === "") {
    throw new Error("The string argument cannot be empty");
  }
  return _.toLower(str);
});

Handlebars.registerHelper("replace", function (str, search, replace) {
  if (typeof str !== "string") {
    throw new Error("The first argument must be a valid string");
  }
  if (typeof search !== "string") {
    throw new Error("The second argument must be a valid string or RegExp");
  }
  if (typeof replace !== "string") {
    throw new Error("The third argument must be a valid string");
  }
  return _.replace(str, search, replace);
});

Handlebars.registerHelper("replaceAll", function (str, search, replacement) {
  if (!str || !search || !replacement) {
    throw new Error("One of the arguments is missing");
  }
  if (
    typeof str !== "string" ||
    typeof search !== "string" ||
    typeof replacement !== "string"
  ) {
    throw new Error("String type arguments are expected");
  }
  return String(str).replaceAll(search, replacement);
});

Handlebars.registerHelper("startsWith", function (str, prefix) {
  if (!str || typeof str !== "string") {
    throw new Error("The first argument must be a valid non empty string");
  }
  if (!prefix || typeof prefix !== "string") {
    throw new Error("The second argument must be a valid non empty string");
  }
  return str.startsWith(prefix);
});

Handlebars.registerHelper("endsWith", function (str, suffix) {
  if (!str || typeof str !== "string") {
    throw new Error("The first argument must be a valid non empty string");
  }
  if (!suffix || typeof suffix !== "string") {
    throw new Error("The second argument must be a valid non empty string");
  }
  return str.endsWith(suffix);
});

Handlebars.registerHelper("uniqueItems", function (array) {
  if (!Array.isArray(array)) {
    throw new Error("Argument must be an array");
  }
  if (array.length === 0) {
    throw new Error("Array must not be empty");
  }
  const arr = _.uniq(array);
  return arr;
});

Handlebars.registerHelper("split", function (str, separator) {
  if (!str || typeof str !== "string") {
    throw new Error("The first argument must be a valid non empty string");
  }
  if (typeof separator !== "string") {
    throw new Error("The second argument must be a string");
  }
  return _.split(str, separator);
});

Handlebars.registerHelper("join", function (array, separator) {
  if (!Array.isArray(array)) {
    throw new Error("First argument must be an array");
  }
  if (typeof separator !== "string") {
    throw new Error("Second argument must be a string");
  }
  return _.join(array, separator);
});

Handlebars.registerHelper("sum", function (...args) {
  args.pop();
  if (args.length === 0 || args.length === 1) {
    throw new Error("At least two integer arguments are required");
  }
  const sum = args.reduce((acc, val) => {
    if (typeof val !== "number") {
      throw new Error("All arguments must be integers");
    }
    return acc + val;
  }, 0);
  return sum;
});

Handlebars.registerHelper("random", function (min, max) {
  if (!min || typeof min !== "number") {
    throw new Error("The first argument must be a number");
  }
  if (!max || typeof max !== "number") {
    throw new Error("The second argument must be a number");
  }
  return _.random(Number(min), Number(max));
});

Handlebars.registerHelper("max", function (array) {
  if (!Array.isArray(array)) {
    throw new Error("Argument must be an array");
  }
  if (array.length == 0) {
    throw new Error("Array must not be empty");
  }
  return _.max(array);
});

Handlebars.registerHelper("min", function (array) {
  if (!Array.isArray(array)) {
    throw new Error("Argument must be an array");
  }
  if (array.length == 0) {
    throw new Error("Array must not be empty");
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
  if (typeof condition !== "string") {
    throw new Error("Second argument must be a string");
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

Handlebars.registerHelper("and", function (...args) {
  args.pop();
  if (args.length < 2) {
    throw new Error("Expected 2 arguments");
  }
  let a = args[0];
  let b = args[1];
  if (typeof a !== "boolean" || typeof b !== "boolean") {
    throw new Error("Arguments should be boolean");
  }
  return a && b;
});

Handlebars.registerHelper("or", function (...args) {
  args.pop();
  if (args.length < 2) {
    throw new Error("Expected 2 arguments");
  }
  let a = args[0];
  let b = args[1];
  if (typeof a !== "boolean" || typeof b !== "boolean") {
    throw new Error("Arguments should be boolean");
  }
  return a || b;
});

Handlebars.registerHelper("contains", function (str, substring) {
  if (!str) {
    throw new Error("The first argument must be a valid non empty string");
  }
  if (!substring) {
    throw new Error("The second argument must be a valid non empty string");
  }
  if (typeof str !== "string" || typeof substring !== "string") {
    throw new Error("Arguments should be strings");
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

Handlebars.registerHelper("fromNow", function (date, format) {
  if (!date) {
    throw new Error("The first argument must be a valid date");
  }
  if (!format || typeof format !== "string") {
    throw new Error(
      "Second argument must be a non empty string with valid date format"
    );
  }
  return moment(date, format).fromNow();
});

Handlebars.registerHelper("addDays", function (date, format, days) {
  if (!date) {
    throw new Error("The first argument must be a valid date");
  }
  if (!format || typeof format !== "string") {
    throw new Error(
      "The second argument must be a non-empty string representing a valid date format"
    );
  }
  if (!days || typeof days !== "number") {
    throw new Error(
      "The argument must be of type number and cannot be null or undefined"
    );
  }

  return moment(date, format).add(days, "days").format(format);
});

Handlebars.registerHelper("subtractDays", function (date, format, days) {
  if (!date) {
    throw new Error("The first argument must be a valid date");
  }
  if (!format || typeof format !== "string") {
    throw new Error(
      "The second argument must be a non-empty string representing a valid date format"
    );
  }
  if (!days || typeof days !== "number") {
    throw new Error(
      "The argument must be of type number and cannot be null or undefined"
    );
  }
  return moment(date, format).subtract(days, "days").format(format);
});

Handlebars.registerHelper("formatDate", function (...args) {
  args.pop();
  if (args.length === 0) {
    return moment().format();
  } else if (args.length === 1) {
    return moment().format(args[0]);
  } else {
    return moment(args[0], args[1]).format(args[2]);
  }
});

Handlebars.registerHelper("diffDate", function (date1, date2, format, unit) {
  if (!date1 || !date2) {
    throw new Error("The first two arguments should be a valid date");
  }
  if (!format || typeof format !== "string") {
    throw new Error(
      "The third argument must be a non-empty string representing a valid date format"
    );
  }
  if (!unit || typeof unit !== "string") {
    throw new Error(
      "The fourth argument must be a non-empty string represnting a valid unit"
    );
  }
  const moment1 = moment(date1, format);
  const moment2 = moment(date2, format);
  return moment2.diff(moment1, unit);
});

Handlebars.registerHelper("toFixed", function (number, decimals) {
  if (!number || typeof number !== "number") {
    throw new Error("The first argument must be a valid number");
  }
  if (
    typeof decimals !== "number" ||
    decimals < 0 ||
    !Number.isInteger(decimals)
  ) {
    throw new Error("The second argument must be a non-negative integer");
  }
  return number.toFixed(decimals);
});

Handlebars.registerHelper("encodeURI", function (str) {
  if (!str || typeof str !== "string") {
    throw new Error("First argument should be a valid string");
  }
  return encodeURI(str);
});

Handlebars.registerHelper("escape", function (str) {
  if (!str || typeof str !== "string") {
    throw new Error("First argument should be a valid string");
  }
  return _.escape(str);
});

Handlebars.registerHelper("jsonStringify", function (obj) {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    throw new Error(
      "The argument must be a non-null object (arrays are not allowed)"
    );
  }
  const result = JSON.stringify(obj);
  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper("uuid", function () {
  return uuidv4();
});

Handlebars.registerHelper("list", function (items, options) {
  if (!items || !Array.isArray(items)) {
    throw new Error("The first argument must be a valid array");
  }
  if (items.length === 0) {
    return "<ul></ul>";
  }
  const itemsAsHtml = items.map((item) => "<li>" + options.fn(item) + "</li>");
  return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
});

Handlebars.registerHelper("ol", function (items) {
  if (!items || !Array.isArray(items)) {
    throw new Error("Invalid input, Not an array");
  }
  if (items.length === 0) {
    return "<ol></ol>";
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
  if (items.length === 0) {
    return "<ul></ul>";
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
    throw new Error("The argument must be a string");
  }
  const escapedText = Handlebars.escapeExpression(text);
  return new Handlebars.SafeString(`<i>${escapedText}</i>`);
});

Handlebars.registerHelper("bold", function (text) {
  if (!text || typeof text !== "string") {
    throw new Error("The argument must be a string");
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
  if (!condition || typeof condition !== "string") {
    throw new Error("Second argument must be a condition of type string");
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
    throw new Error("The first argument should be a valid string");
  }
  const result = _.trim(string, chars || " \t\v\n\r\0");
  return new Handlebars.SafeString(JSON.stringify(result));
});
Handlebars.registerHelper(
  "truncate",
  function (string, length, ending, wordBreak) {
    if (!string || typeof string !== "string") {
      throw new Error("First argument must be a string");
    }
    if (typeof length !== "number" || length <= 0) {
      throw new Error("The second argument must be a positive number");
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
