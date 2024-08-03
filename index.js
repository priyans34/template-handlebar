const Handlebars = require("./handlebarsHelpers");

const data = {
  myArray: ["Hello", "world", "India", "world", "Hello", "My"],
  separator: "-",
  sentence: "Hello world!",
  user1: {
    name: "John Doe",
    user3: {
      name: "Jane Doe",
    },
  },
  user2: {
    name: "John Doe",
  },
  users: [
    { name: "John", active: true },
    { name: "Jane", active: false },
    { name: "Jim", active: true },
  ],
  num: [1, 2, 3, 4, 5],
  inputString: "   This is a long string that needs to be truncated.    ",
  eventDate: new Date(),
  rows: [
    { Name: "John Doe", Age: 30, Occupation: "Engineer" },
    { Name: "Jane Doe", Age: 25, Occupation: "Designer" },
    { Name: "Jim Beam", Age: 35, Occupation: "Manager" },
  ],
  date1: "20111031",
  date2: "20240731"
}

const templateSource = `

[[ol myArray]]
[[ul myArray]]



[[#list users]]
  [[this.name]]
[[/list]]



[[table users]]


capitalize: [[capitalize sentence]]
upperCaes:  [[upperCase sentence]]
lowecase:   [[lowerCase sentence]]
ucFirst:    [[ucfirst sentence]]
lcFirst:    [[lcfirst sentence]]
CamelCase: [[camelCase sentence]]
KebabCase: [[kebabCase sentence]]
SnakeCase: [[snakeCase sentence]]
replace:     [[replace "Hello world world" "world" "Handlebars"]]
uniqueItems: [[uniqueItems myArray]]
escape: [[escape "<div>hello</div>"]]
split: [[split "hello world" ""]]
join: [[join myArray ""]]
sum: [[sum 2 3 1]]
random: [[random 1 8]]
max: [[max num]]
min: [[min num]]
Size: [[size users]]
now: [[now toISO]]
jsonStringfy: [[jsonStringify user1]]

repeat: [[repeat "hello" 3]]
Event Date: [[formatDate eventDate "MMMM Do YYYY, h:mm:ss a"]]

filterCollection:  [[filterCollection users "active=true"]]
FindInCollection:  [[findInCollection users "name=Jim"]]

Trimmed: [[trim inputString]]
[[trim "   Hello, World!   "]]
[[trim ">>>Hello, World!<<<" ">>><<"]]


<p>Truncated (15 chars, word break, custom ending): [[truncate inputString 15 '...' true]]</p>
<p>Truncated (15 chars, no word break, custom ending): [[truncate inputString 15 ""]]</p>

<p>uuid: [[uuid]]</p>

startsWIth:      [[startsWith "hello" " "]]



contains  [[contains "a" "a"]]

contains: 
[[#if (contains "hello world" "world")]]
  String contains "world".
[[else]]
  String does not contain "world".
[[/if]]

tofixed: [[toFixed 3.14159 2]]

formatDate: ........ [[formatDate  "August 1st 2024, 1:55:36 am" 'MMMM Do YYYY, h:mm:ss a' "DD-MM-YYYY"]]
[[formatDate  "20111031" "YYYYMMDD" "DD-MM-YYYY"]]

[[formatDate 'llll']]
  diffDate: [[diffDate "01-01-2022" "04-01-2022" "DD-MM-YYYY" 'days']]
addDays      [[addDays "01/01/2022" "DD/MM/YYYYY" 5]]
subDays      [[subtractDays "01-01-2022" "DD-MM-YYYYY" 5]]
fromNow:    [[fromNow "01/08/2020" "DD/MM/YYYY"]] 

<p>[[encodeURI "https://example.com/path?name=Priyanshu Singh"]]</p>

<p>[[endsWith "Hello World" "World"]]</p>


[[#list myArray]][[this]][[/list]]

[[#hello]]
  [[firstname]] [[lastname]]
[[/hello]]

[[priyanshu]]



replcaeALL:  [[replaceAll "Hello world world" "world" "Handlebars"]]
[[and (startsWith "Hello World" "Hello") (startsWith "Hello World" "Hello") ]]

and: 
[[#if (and true false)]]
  Both are true.
[[else]]
  At least one is false.
[[/if]]


or: 
[[#if (or false true)]]
  At least one is true.
[[else]]
  Both are false.
[[/if]]

`;

function replaceDelimiters(template, openDelim, closeDelim) {
  const openDelimRegex = new RegExp(openDelim, "g");
  const closeDelimRegex = new RegExp(closeDelim, "g");
  return template.replace(openDelimRegex, "{{").replace(closeDelimRegex, "}}");
}
const handlebarsTemplateSource = replaceDelimiters(
  templateSource,
  "\\[\\[",
  "\\]\\]"
)

const template = Handlebars.compile(handlebarsTemplateSource);

const result = template(data);

console.log(result);
