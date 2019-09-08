// ** Documnet Title and notes
// // sub notes
// ?? Function overview
// ## Function Note
// ^^ Requests
// ~~ Error
// !! bug in Code
// todo 

// ***************************************************
// ************** Main Application *******************
// ***************************************************
// // API Route = https://www.food2fork.com/api/search
// // API KEY =  1f13d64c7f06a32dafbd3eec085a978a


// ************** Imports ****************************
// // Model Imports
import Search from './models/Search';

// // Views Imports
import * as searchView from './views/SearchView'

// // Utities Imports
import {
    clearSearchForm,
    clearResults
} from './utils/utils';

// // Base Imports
import {
    clearLoader,
    elements,
    renderLoader
} from './views/base'

// ************** Controller *************************

// // Application Global State
const state = {}

// ?? Main Search Function
// ?? No input
// ?? No return value
const controlSearch = async () => {
    const query = searchView.getInput()

    // ## Check for a query
    if (query) {

        // ## Render Loading Animation
        renderLoader(elements.searchRes)

        // ^^ Perfom a new Search
        // ## Store Search Class to state
        state.search = new Search(query)

        // ## Clear Input
        clearSearchForm()
        clearResults()

        // ## Get Data from class
        await state.search.getResults()

        // ## Clear Loading Animation
        clearLoader()

        // ## Generate UI and insert into DOM
        searchView.renderResults(state.search.results)


    }
}

// ************** Event Listeners ********************

// ?? Event Listener for submit of search form
// ?? Calls Main Search Function
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        clearResults()
        const goTo = btn.dataset.goto * 1;
        searchView.renderResults(state.search.results, goTo)
    }
})