'use strict';
/**
 * makes a filter function that repeatedly applies multiple filters to an array
 * @param {Array} originalArray - array to be filtered
 * @returns {Function} arrayFilterer - function for applying filters and getting results
 */
function MakeMultiFilter(originalArray) {
    let currentArray = originalArray;
    /**
     * filter function
     * @param {Function} filterCriteria - determines if an element stays.
     * @param {Function} callback - used with currentArray after filtering
     * @returns {Function|Array} - returns itself or currentArray if no filterCriteria
     */
    function arrayFilterer(filterCriteria, callback) {
        // if no criteria, return current array
        if (typeof filterCriteria !== "function") {
            return currentArray;
        }

        // filter
        currentArray = currentArray.filter(filterCriteria);

        // if callback is a function, call it with currentArray
        if (typeof callback === "function") {
            callback.call(originalArray, currentArray);
        }
        return arrayFilterer;
    }

    return arrayFilterer;
}