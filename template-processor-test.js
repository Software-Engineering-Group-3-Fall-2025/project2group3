import assert from "assert";
import { TemplateProcessor } from "./template-processor.js";

const template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
const dateTemplate = new TemplateProcessor(template);

// Case: all properties exist
const dictionary = { month: 'July', day: '1', year: '2016' };
let str = dateTemplate.fillIn(dictionary);
assert(str === 'My favorite month is July but not the day 1 or the year 2016');

// Case: property doesn't exist in dictionary -> replaced with empty string
const dictionary2 = { day: '1', year: '2016' };
str = dateTemplate.fillIn(dictionary2);
assert(str === 'My favorite month is  but not the day 1 or the year 2016');
console.log("All tests passed.");
