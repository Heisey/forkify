// ***************************************************
// ************** Search Module **********************
// ***************************************************

// // API Route = https://www.food2fork.com/api/search
// // API KEY =  1f13d64c7f06a32dafbd3eec085a978a

// // Vendor Imports
import axios from 'axios';

import {
    apiKey
} from '../config'


// ?? All Recipes Search Coontroller takes a query(string) paramater as argument
// ?? query = string of search input
export default class Search {
    constructor(query) {

        // ^^ Search Query
        this.query = query;

        // ^^ Api Key
        this.key = apiKey

        // ^^ Api Endpoint
        this.endpoint = 'https://www.food2fork.com/api/search?'
    }

    // ?? Get Sarch Results for all recipes by query
    // ?? Takes no arguments
    // ^^ Request to api
    async getResults() {

        // ^^ Request to Api for all Recipes
        try {
            // ^^ Api Endpoint
            const res = await axios(`${this.endpoint}key=${this.key}&q=${this.query}`)

            // ^^ Query Results
            this.results = res.data.recipes
        } catch (err) {

            // ~~ Error Handler General
            console.log(err)
        }
    }
}