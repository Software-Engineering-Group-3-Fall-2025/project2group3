'use strict';

function TemplateProcessor(template) {
  this.template = String(template ?? '');
}

TemplateProcessor.prototype.fillIn = function (dictionary) {
  let result = this.template;

  if (dictionary && typeof dictionary === 'object') {
    for (const property in dictionary) {
      if (Object.hasOwn(dictionary, property)) {
        const val = String(dictionary[property] ?? '');
        result = result.replaceAll(`{{${property}}}`, val);
      }
    }
  }

  // Remove any remaining {{...}} placeholders
  result = result.replace(/{{[^{}]*}}/g, '');
  return result;
};

// UMD-style exposure (browser + Node)
if (typeof globalThis !== 'undefined') {
  globalThis.TemplateProcessor = TemplateProcessor;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TemplateProcessor;
}
