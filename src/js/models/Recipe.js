// ***************************************************
// ************** Search Module **********************
// ***************************************************

// // Vendor Imports
import axios from 'axios';

// // Import API access key
import {
    apiKey
} from '../config'

// // Import mesaurment arrays
import {
    unitsLong,
    unitsShort
} from '../utils/measurements'

// ?? Single Recipe Search Coontroller takes a search id(number) as argument
// ?? Id = number to search by recipe id
export default class Recipe {
    constructor(id) {
        // ^^ Search Query
        this.id = id

        // ^^ Api Key
        this.key = apiKey

        // ^^ Api Endpoint
        this.endpoint = 'https://www.food2fork.com/api/get?'
    }

    // ?? Get Sarch Results for recipe by ID
    // ?? Takes no arguments
    // ^^ Request to api
    async getResults() {
        // ^^ Request to Api for Recipe
        try {
            // ^^ Api Endpoint
            const res = await axios(`${this.endpoint}key=${this.key}&rId=${this.id}`)

            // ^^ Query Results
            this.results = res.data.recipe

        } catch (err) {

            // ~~ Error Handler General
            console.log(err)
        }
    }

    // ?? Calculates the cook time
    // ?? Takes no arguments
    calcTime() {
        // ## Assuming that we need 15 min for each 3 ingredients
        const numIng = this.results.ingredients.length;
        const periods = Math.ceil(numIng / 3)
        this.results.time = periods * 15
    }

    // ?? Calculates the number of servings
    // ?? Takes no arguments
    calcServings() {
        this.results.servings = 4
    }

    // ??
    // ?? Takes no arguments
    parseIngredients() {
        let ingredients = this.results.ingredients;

        const newIngredients = ingredients.map(el => {

            // ## Uniform units
            let ingredient = el.toLowerCase()
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // ## Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // ## Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
            let objIng;

            // ## If unit and and number are true
            if (unitIndex > -1) {
                const arrCount = arrIng.slice(0, unitIndex)
                let count;

                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

                // ## If no unit but number in 1st position
            } else if (parseInt(arrIng[0], 10)) {
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }

                // ## If no unit and no number in 1st position
            } else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                }
            }

            return objIng
        })

        this.results.ingredients = newIngredients
    }

    updateServings(type) {
        const newServings = type === 'dec' ? this.results.servings - 1 : this.results.servings + 1;


        this.results.ingredients.forEach(el => {
            el.count = (newServings / this.results.servings)
        })

        this.results.servings = newServings;
    }
}