// main.js
const Handlebars = require("./handlebarsHelpers");

const context = {
  myArray: ["Hello", "world", "India", "world"],
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
};

const templateSource = `
capitalize: {{capitalize sentence}}
upperCaes:  {{upperCase sentence}}
lowecase:   {{lowerCase sentence}}
ucFirst:    {{ucfirst sentence}}
lcFirst:    {{lcfirst sentence}}

CamelCase: {{camelCase sentence}}
KebabCase: {{kebabCase sentence}}
SnakeCase: {{snakeCase sentence}}

replace:     {{replace sentence "world" "Handlebars"}}
replcaeALL:  {{replaceAll "Hello World World" "World" "Universe"}}

uniqueItems: {{uniqueItems myArray}}
escape: {{escape "<div>hello</div>"}}
split: {{split "1,2,3,4,5" "3"}}
join: {{join myArray "---"}}
sum: {{sum 1 2 3 4 5}}
random: {{random 1 100}}
max: {{max num}}
min: {{min (split "1,2,3,4,5" ",")}}
Size: {{size myArray}}
repeat: {{repeat "hello" 3}}
Event Date: {{formatDate eventDate "MMMM Do YYYY, h:mm:ss a"}}



filterCollection:  {{filterCollection users "active"}}
FindInCollection:  {{findInCollection users condition='{"active": false}'}}

Trimmed: "{{trim inputString}}"

<p>Truncated (15 chars, word break, custom ending): "{{truncate inputString 15 '...' true}}"</p>
<p>Truncated (15 chars, no word break, custom ending): "{{truncate inputString 15 '...' false}}"</p>






  <p>jsonStringfy: {{{jsonStringify user1}}}</p>

  <p>now: {{now "toISO"}}</p>

  <p>uuid: {{uuid}}</p>


  ifequal:
  {{#ifEqual user1 user2}}
    Values are equal.
  {{else}}
    Values are not equal.
  {{/ifEqual}}

ifnotequal:
{{#ifNotEqual "a" "b"}}
  Values are not equal.
{{else}}
  Values are equal.
{{/ifNotEqual}}

and: 
{{#if (and true false)}}
  Both are true.
{{else}}
  At least one is false.
{{/if}}

or: 
{{#if (or false true)}}
  At least one is true.
{{else}}
  Both are false.
{{/if}}


contains: 
{{#if (contains "hello world" "world")}}
  String contains "world".
{{else}}
  String does not contain "world".
{{/if}}


{{toFixed 3.14159 2}}

{{formatDate "2024-07-23" "MMMM DD YYYY"}}

{{default user.name "Guest"}}



<p>{{safeHTML "<strong>Bold Text</strong>"}}</p>
<p>{{encodeURI "https://example.com/path?name=Priyanshu Singh"}}</p>
<p>{{escapeAttribute 'He said, "Hello!"'}}</p>
<p>{{startsWith "Hello World" "Hello"}}</p>
<p>{{endsWith "Hello World" "World"}}</p>

<p>{{fromNow "2022-01-01"}}</p>
<p>{{addDays "2022-01-01" 5}}</p>


{{#list myArray}}{{this}}{{/list}}



{{ol myArray}}

{{{ul myArray}}}

{{italic "Italic Text"}}
{{bold "Bold Text"}}




{{#if isActive}}
  <p>Welcome back!</p>
{{else}}
  <p>Please log in.</p>
{{/if}}


{{#unless isActive}}
  <p>Please log in.</p>
{{/unless}}



{{table rows}}





`;

// Compile the template
const template = Handlebars.compile(templateSource);

// Generate HTML using the template and some context
const result = template(context);
console.log(typeof result);

// Log the result
console.log(result);
