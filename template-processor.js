'use strict';

// Constructor + prototype (no ES6 `class` per spec)
function TemplateProcessor(template) {
  this.template = String(template ?? '');
}

TemplateProcessor.prototype.fillIn = function (dictionary) {
  let result = this.template;

  if (dictionary && typeof dictionary === 'object') {
    for (const property in dictionary) {
      if (Object.hasOwn(dictionary, property)) {
        // Coerce undefined/null to empty string; everything to string
        const val = String(dictionary[property] ?? '');
        result = result.replaceAll(`{{${property}}}`, val);
      }
    }
  }

  // Remove any leftover well-formed placeholders {{...}} individually
  result = result.replace(/{{[^{}]*}}/g, '');

  return result;
};