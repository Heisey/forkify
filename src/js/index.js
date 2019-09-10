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
import List from "./models/List";
import Recipe from "./models/Recipe";
import Search from "./models/Search";

// // Views Imports
import * as listView from "./views/ListView"
import * as searchView from "./views/SearchView";
import * as recipeView from "./views/RecipeView";

// // Utities Imports
import {
    clearSearchForm,
    clearRecipe,
    clearResults
} from "./utils/utils";

// // Base Imports
import {
    clearLoader,
    elements,
    renderLoader
} from "./views/base";

// ************** Search Controller ******************

// // Application Global State
const state = {};

// ?? Main Search Function
// ?? No input
// ?? No return value
const controlSearch = async () => {
    const query = searchView.getInput();

    // ## Check for a query
    if (query) {
        // ## Render Loading Animation
        renderLoader(elements.searchRes);
        renderLoader(elements.recipe);

        // ^^ Perfom a new Search
        // ## Store Search Class to state
        state.search = new Search(query);

        // ## Clear Input
        clearSearchForm();
        clearResults();

        try {
            // ## Get Data from class
            await state.search.getResults();

            // ## Clear Loading Animation
            clearLoader();

            // ## Generate UI and insert into DOM
            searchView.renderResults(state.search.results);

        } catch (err) {

            // !! Error Handler Alert
            alert('Something wrong with the search...')
            console.log(err)
            // ## Clear Loading Animation
            clearLoader();
        }

    }
};

// ************** Recipe Controller ******************

// ?? Main Recipe Controller
// ?? No input
// ?? No return value
const controlRecipe = async () => {
    // ## Get id from url
    const id = window.location.hash.replace("#", "");
    if (id) {
        // ## Clear Recipe Results
        clearRecipe()

        // ## Render Loading Animation
        renderLoader(elements.searchRes);
        renderLoader(elements.recipe);

        // ## Highlight selected
        if (state.search) {
            searchView.highlightSelected(id)
        }


        // ## Store Recipe Class to state
        state.recipe = new Recipe(id);


        try {

            // ^^ Perfom a recipe Search
            // ## Store results to state
            await state.recipe.getResults();

            // ## Parse Ingredients
            state.recipe.parseIngredients()

            // ## Calculate the cook time
            state.recipe.calcTime();

            // ## Calculate the portion sizes
            state.recipe.calcServings();

            // ## Clear Loading Animation
            clearLoader();

            recipeView.renderRecipe(state.recipe.results)

        } catch (err) {
            // ## Clear Loading Animation
            clearLoader();
            console.log(err)
            // !! Error Handler Alert
            alert('Error proccessing recipe!')
        }
    }
};


// ************** List Controller ********************

const controlList = () => {

    if (!state.list) state.list = new List()

    state.recipe.results.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)

        listView.renderItem(item)
    })
}

// ************** Event Listeners ********************

// ?? Event Listener for submit of search form
// ?? Calls Main Search Function
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

// ?? Event Listener for Single Recipe Retrieval
// ?? Calls Recipe Search Function
elements.searchResPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");

    if (btn) {
        clearResults();
        const goTo = btn.dataset.goto * 1;
        searchView.renderResults(state.search.results, goTo);
    }
});

// ?? Global Event Listener for hash change in url
// ?? Calls the recipe Controller 
window.addEventListener("hashchange", controlRecipe);

// ?? Global Event Listener for page load
// ?? Calls the recipe Controller 
// window.addEventListener('load', controlRecipe);

// ?? Event Listener for Serving Count
// ?? Calls 
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-dec, .btn-dec *')) {
        if (state.recipe.results.servings > 1) {
            state.recipe.updateServings('dec')
            recipeView.updateServingsUI(state.recipe)
        }

    } else if (e.target.matches('.btn-inc, .btn-inc *')) {
        state.recipe.updateServings('inc')
        recipeView.updateServingsUI(state.recipe)

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList()

    }
})

elements.list.addEventListener('click', (e) => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        console.log('fired')
        state.list.deleteItem(id)
        listView.deleteItem(id)
    } else if (e.target.matches('.shopping__count--value')) {
        const val = parseFloat(e.target.value, 10)
        if (val >= 0) state.list.udateCount(id, val)
    }

})