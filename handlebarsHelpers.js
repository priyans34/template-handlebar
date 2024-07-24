const Handlebars = require("handlebars");
const _ = require("lodash");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");


Handlebars.registerHelper("capitalize", function (str) {
  return _.capitalize(str);
});

Handlebars.registerHelper("repeat", function (str, times) {
  return str.repeat(times);
});

Handlebars.registerHelper("camelCase", function (str) {
  return _.camelCase(str);
});

Handlebars.registerHelper("kebabCase", function (str) {
  return _.kebabCase(str);
});

Handlebars.registerHelper("snakeCase", function (str) {
  return _.snakeCase(str);
});

Handlebars.registerHelper("upperCase", function (str) {
  return _.toUpper(str);
});

Handlebars.registerHelper("lowerCase", function (str) {
  return _.toLower(str);
});

Handlebars.registerHelper("ucfirst", function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

Handlebars.registerHelper("lcfirst", function (str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
});

Handlebars.registerHelper("replace", function (str, search, replace) {
  return str.replace(new RegExp(search, "g"), replace);
});

Handlebars.registerHelper("replaceAll", function (str, search, replacement) {
  return str.split(search).join(replacement);
});

Handlebars.registerHelper("startsWith", function (str, prefix) {
  return str.startsWith(prefix);
});

Handlebars.registerHelper("endsWith", function (str, suffix) {
  return str.endsWith(suffix);
});


Handlebars.registerHelper("uniqueItems", function (array) {
  const arr = _.uniq(array);
  return arr;
});

Handlebars.registerHelper("split", function (str, separator) {
  return _.split(str, separator);
});

Handlebars.registerHelper("join", function (array, separator) {
  return _.join(array, separator);
});

Handlebars.registerHelper("sum", function (...args) {
  args.pop();
  return _.sum(args.map(Number));
});

Handlebars.registerHelper("random", function (min, max) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
});

Handlebars.registerHelper("max", function (array) {
  return _.max(array);
});

Handlebars.registerHelper("min", function (array) {
  return _.min(array);
});


Handlebars.registerHelper("map", function (array, fn) {
  return array.map(fn);
});

Handlebars.registerHelper("filterCollection",function (array, condition, options) {
    if (!Array.isArray(array)) {
      throw new Error("First argument must be an array");
    }

    const filterVal = _.isPlainObject(condition)
      ? condition
      : { [condition]: true };
      const result = _.filter(array, filterVal);

      // Convert result to JSON string for display purposes
      return new Handlebars.SafeString(JSON.stringify(result));
  }
);

// Logic Helpers
Handlebars.registerHelper("ifEqual", function (a, b, options) {
  return _.isEqual(a, b) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("ifNotEqual", function (a, b, options) {
  return !_.isEqual(a, b) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("and", function (a, b) {
  return a && b;
});

Handlebars.registerHelper("or", function (a, b) {
  return a || b;
});

Handlebars.registerHelper("contains", function (str, substring) {
  return str.includes(substring);
});

Handlebars.registerHelper("default", function (value, defaultValue) {
  return value != null ? value : defaultValue;
});

// Date and Time Helpers
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
  return moment(date).fromNow();
});

Handlebars.registerHelper("addDays", function (date, days) {
  return moment(date).add(days, "days").format("YYYY-MM-DD");
});

Handlebars.registerHelper("formatDate", function (date, format) {
  return moment(date).format(format);
});

Handlebars.registerHelper("toFixed", function (number, decimals) {
  return number.toFixed(decimals);
});

Handlebars.registerHelper("safeHTML", function (html) {
  return new Handlebars.SafeString(html);
});

Handlebars.registerHelper("encodeURI", function (str) {
  return encodeURI(str);
});

Handlebars.registerHelper("escapeAttribute", function (str) {
  return str.replace(/"/g, "&quot;");
});

Handlebars.registerHelper("escape", function (str) {
  return _.escape(str);
});

Handlebars.registerHelper("jsonStringify", function (obj) {
  return JSON.stringify(obj);
});

Handlebars.registerHelper("uuid", function () {
  return uuidv4();
});

Handlebars.registerHelper("list", function (items, options) {
  const itemsAsHtml = items.map((item) => "<li>" + options.fn(item) + "</li>");
  return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
});

Handlebars.registerHelper("ol", function (items) {
  let out = "<ol>\n";
  items.forEach((item) => {
    const escapedItem = Handlebars.escapeExpression(item);
    out += `  <li>${escapedItem}</li>\n`;
  });
  out += "</ol>";
  return new Handlebars.SafeString(out);
});


Handlebars.registerHelper("ul", function (items) {
  let out = "<ul>\n";
  items.forEach((item) => {
    const escapedItem = Handlebars.escapeExpression(item);
    out += `  <li>${escapedItem}</li>\n`;
  });
  out += "</ul>";
  return new Handlebars.SafeString(out);
});

Handlebars.registerHelper("italic", function (text) {
  const escapedText = Handlebars.escapeExpression(text);
  return new Handlebars.SafeString(`<i>${escapedText}</i>`);
});

Handlebars.registerHelper("bold", function (text) {
  const escapedText = Handlebars.escapeExpression(text);
  return new Handlebars.SafeString(`<b>${escapedText}</b>`);
});

Handlebars.registerHelper("size", function (array) {
  if (!Array.isArray(array)) {
    throw new Error("Argument must be an array");
  }
  return _.size(_.flatten(array));
});

Handlebars.registerHelper("findInCollection", function (array, options) {
  if (!Array.isArray(array)) {
    throw new Error("First argument must be an array");
  }

  // Parse the condition from options.hash
  const condition = JSON.parse(options.hash.condition);
  console.log("condition", condition);

  // Find the item in the array that matches the condition
  const result =  _.find(array, condition);
  return new Handlebars.SafeString(JSON.stringify(result));
});

Handlebars.registerHelper("trim", function (string, chars) {
  return _.trim(string, chars || " \t\v\n\r\0");
});
Handlebars.registerHelper(
  "truncate",
  function (string, length, ending, wordBreak) {
    if(typeof ending === 'object') {
      wordBreak = true;
      ending = '...';
    }
  
    if (string.length <= length) {
      return string;
    }

    if (wordBreak) {
      return string.slice(0, length) + ending;
    } else {
      let truncated = string.slice(0, length);
      let lastSpaceIndex = truncated.lastIndexOf(" ");
      if (lastSpaceIndex > -1) {
        truncated = truncated.slice(0, lastSpaceIndex);
      }
      return truncated + ending;
    }
  }
);

Handlebars.registerHelper("table", function (rows, options) {
  if (!Array.isArray(rows)) {
    throw new Error("First argument must be an array of rows");
  }

  let tableHtml = '<table border="1">';

  if (rows.length > 0) {
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



module.exports = Handlebars;
