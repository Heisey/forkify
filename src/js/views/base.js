// ***************************************************
// ************** Base *******************************
// ***************************************************

// // Utilities imports
import {
    limitText
} from '../utils/utils'

// ?? Obj of UI elements
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
}

// ?? Obj of UI strings
export const elementStrings = {
    loader: 'loader'
}

// ************** Template Strings *******************

// ?? Returns a Generated template string for Recipe <li></li>
// ?? Takes a ID, title, author, and image as arguments
// ?? ID = string format #0000
// ?? title autor = string plain text
// ?? image = string url
export const recipeLI = (ID, title, author, image) => {
    return `
    <li>
        <a class="results__link" href="#${ID}">
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
const loaderTemplate = `
    <div class=${elementStrings.loader}>
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
`

// ?? Return a Generated template string for button
// ?? takes a page(number), type(string)
// ?? page = number of current page
// ?? type = string of either prev or next
export const createButton = (page, type) => `
    <button 
        class="btn-inline results__btn--${type}"
        data-goto=${type === 'prev' ? page - 1 : page + 1}
    >
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use 
                href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"
            >
            </use>
        </svg>
    </button>
`

// ************** Loading Animation ******************

// ?? Render loading animation from DOM
// ?? Takes parent element as argument
export const renderLoader = parent => {
    parent.insertAdjacentHTML('afterbegin', loaderTemplate)
}

// ?? Clear loading animation from DOM
// ?? Takes no arguments
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader)
}