// ***************************************************
// ************** Utitilities *************************
// ***************************************************

import {
    elements
} from '../views/base'

// ?? Clear Search input
export const clearSearchForm = () => {
    elements.searchInput.value = ''
}

// ?? Clear Recipe Search Results
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

// ?? Shorten Text 
// ?? takes in a text(string) and limit(number)
// ?? text is string to be shortened
// ?? limit is desired length of text default = 17
export const limitText = (text, limit = 17) => {

    if (text.length > limit) {
        text = text.substr(0, limit);
        return `${text.substr(0, text.lastIndexOf(' '))} ...`
    }

    // ## return original text if under limit
    return text;
}