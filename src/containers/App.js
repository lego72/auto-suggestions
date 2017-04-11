import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as suggestionsActions from '../actions/Suggestions'
import RenderSuggestions from '../components/RenderSuggestions'


class App extends Component {
    constructor(props) {
        super(props)
    }


    render = () => {
        const { suggestions, fetching : suggestionsFetching } = this.props.suggestions
        const { fetchSuggestions } = this.props.suggestionsActions
        return <RenderSuggestions suggestions={suggestions}
                                  fetching={suggestionsFetching}
                                  fetchSuggestionsValue={fetchSuggestions}/>
    }
}

function mapStateToProps(state) {
    return {
        suggestions: state.suggestions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        suggestionsActions: bindActionCreators(suggestionsActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)