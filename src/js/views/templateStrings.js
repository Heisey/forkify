// // Utilities imports
import {
    limitText
} from '../utils/utils'

import {
    elementStrings
} from './base'

// ************** Template Strings *******************

// ?? Returns a Generated template string for Recipe <li></li>
// ?? Takes a ID, title, author, and image as arguments
// ?? ID = string format #0000
// ?? title autor = string plain text
// ?? image = string url
export const recipeLI = (ID, title, author, image) => {
    return `
    <li>
        <a class="results__link results__link--active" href="#${ID}">
            <figure class="results__fig">
                <img src=${image} alt="${limitText(title)}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitText(title)}</h4>
                <p class="results__author">${author}</p>
            </div>
        </a>
    </li>
    `
}


// ?? Returns a Generated template string for Loading Animation
// ?? Takes no arguments
export const loaderTemplate = (className) => {
    return `
        <div class=${className}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `
}



// ?? Return a Generated template string for button
// ?? takes a page(number), type(string)
// ?? page = number of current page
// ?? type = string of either prev or next
export const createButton = (page, type) => ` <
button
class = "btn-inline results__btn--${type}"
data - goto = $ {
        type === 'prev' ? page - 1 : page + 1
    } >
    <
    span > Page $ {
        type === 'prev' ? page - 1 : page + 1
    } < /span> <
svg class = "search__icon" >
    <
    use
href = "img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}" >
    <
    /use> < /
    svg > <
    /button>
`