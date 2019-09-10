// ***************************************************
// ************** Utitilities *************************
// ***************************************************

import num2fraction from 'num2fraction'
import {
    Fraction
} from 'fractional'

// // Import UIelements
import {
    elements
} from '../views/base'

// ?? Clear Search input
// ?? Takes no arguments
export const clearSearchForm = () => {
    elements.searchInput.value = ''
}

// ?? Clear Recipe Search Results
// ?? Takes no arguments
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

// ?? Clear Recipe Search Results
// ?? Takes no arguments
export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
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

export const formatCount = count => {

    if (count) {
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10))

        if (!dec) return count
        if (int === 0) {
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`
        } else {
            const fr = new Fraction(count - int);
            return `${int} ${fr.numerator}/${fr.denominator}`
        }
    }

}