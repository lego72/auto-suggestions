import { SUGGESTIONS_FETCHED, SUGGESTIONS_FETCHING } from '../constants/Suggestions'
import { filter, includes } from 'lodash'

const languages = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'C#',
        year: 2000
    },
    {
        name: 'C++',
        year: 1983
    },
    {
        name: 'Clojure',
        year: 2007
    },
    {
        name: 'Elm',
        year: 2012
    },
    {
        name: 'Go',
        year: 2009
    },
    {
        name: 'Haskell',
        year: 1990
    },
    {
        name: 'Java',
        year: 1995
    },
    {
        name: 'Javascript',
        year: 1995
    },
    {
        name: 'Perl',
        year: 1987
    },
    {
        name: 'PHP',
        year: 1995
    },
    {
        name: 'Python',
        year: 1991
    },
    {
        name: 'Ruby',
        year: 1995
    },
    {
        name: 'Scala',
        year: 2003
    }
];

export const fetchSuggestions = query => dispatch => {
    dispatch({
        type : SUGGESTIONS_FETCHING
    })
    setTimeout(() => {
        dispatch({
            type : SUGGESTIONS_FETCHED,
            payload : {
                suggestions : query ? filter(languages,lang => includes(lang.name,query)) : []
            }
        })
    },300 + Math.random() * 1000)
}

