// ***************************************************
// ************** Main Application *******************
// ***************************************************

// // Gets UI elements
import {
    createButton,
    elements,
    recipeLI
} from './base'

// ************** private Functions ******************

// ?? Render Single Item
// ?? takes a recipe object as argument
const renderRecipe = obj => {

    // ## Create a templaet string, pass in ID, title, author and image url
    const template = recipeLI(obj.recipe_id, obj.title, obj.publisher, obj.image_url)

    // ## Insert template into Dom
    elements.searchResList.insertAdjacentHTML('beforeend', template)
}

// ?? Render recipe index buttons
// ?? Takes in page(number) which
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage)
    let button;

    if (page === 1 && pages > 1) {
        // ## Only Render next button
        button = createButton(page, 'next')
    } else if (page < pages) {
        // ## Render both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    } else if (page == pages && pages > 1) {
        // ## Only Render previous button
        button = createButton(page, 'prev')
    }

    elements.searchResPages.insertAdjacentHTML('afterBegin', button)
}

// ************** Public Functions *******************

// ?? Get input from search
// ?? No input
// ?? Returns a value type string
export const getInput = () => {
    return elements.searchInput.value
}

// ?? Render Search Results
// ?? Takes in recipes(array), page(number), resPerPage(number)
// ?? Recipes =  a array of recipe objects
// ?? Page = a number that indexes what page of results are being viewed default set to 1
// ?? resPerPage = a number of results per Page default set to 10
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    let start = (page - 1) * resPerPage;
    let end = page * resPerPage;

    // ## Loop through all items and passes each item obj to item generation
    recipes.slice(start, end).forEach(renderRecipe)

    // ## Render pagination buttons
    renderButtons(page, recipes.length, resPerPage)
}