'use strict';

class TemplateProcessor {
    constructor(template) {
        this.template = template;
    }
    fillIn(dictionary){
        let returnString = this.template;

        for (const property in dictionary){
            if (Object.hasOwn(dictionary, property)) {
                // ensure undefined/null become empty string, and value is a string
                const val = String(dictionary[property] ?? '');
                returnString = returnString.replaceAll(`{{${property}}}`, val);
            }
        }

        // Safely remove any leftover placeholders without greedy spanning
        // (matches each {{...}} chunk individually)
        const leftover = /{{[^{}]*}}/g;
        returnString = returnString.replaceAll(leftover, "");

        return returnString;
    }
}
