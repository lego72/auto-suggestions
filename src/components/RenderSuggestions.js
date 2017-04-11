import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const styles = {
    container      : {
        padding: 10
    },
    suggestions    : {
        width   : 256,
        position: 'relative'
    },
    input          : {
        width               : '100%',
        height              : 30,
        padding             : '10px 20px',
        fontFamily          : 'Helvetica, sans-serif',
        fontWeight          : 300,
        fontSize            : 16,
        border              : '1px solid #aaa',
        borderTopLeftRadius : 4,
        borderTopRightRadius: 4
    },
    inputOpen      : {
        borderBottomLeftRadius : 0,
        borderBottomRightRadius: 0
    },
    inputClosed    : {
        borderBottomLeftRadius : 4,
        borderBottomRightRadius: 4
    },
    suggestionsList: {
        fontFamily             : 'Helvetica, sans-serif',
        fontWeight             : 300,
        fontSize               : 16,
        position               : 'absolute',
        width                  : 296,
        top                    : 51,
        left                   : 0,
        border                 : '1px solid #aaa',
        borderBottomLeftRadius : 4,
        borderBottomRightRadius: 4,
        margin                 : 0,
        padding                : 0,
        listStyleType          : 'none'
    },
    suggestionItem : {
        cursor : 'pointer',
        padding: '10px 20px'
    }
}

export default class Suggestions extends Component {

    static propTypes = {
        suggestions          : PropTypes.array.isRequired,
        fetching             : PropTypes.bool.isRequired,
        fetchSuggestionsValue: PropTypes.func.isRequired,

    }

    constructor(props) {
        super(props)
        this.state = {
            query          : '',
            showSuggestions: false
        }
    }

    _handleChanges = (event) => {
        this.setState({query: event.target.value})
    }

    componentDidMount() {
        document.addEventListener('mousedown', this._onDocumentMouseDown);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this._onDocumentMouseDown);
    }

    _onDocumentMouseDown = event => {
        let node = event.target
        if (node.getAttribute('data-key') != 'query-input' && node.getAttribute('data-key') != 'suggestion-container') {
            this.setState({showSuggestions: false})
        }
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (this.state.query != nextState.query) this.props.fetchSuggestionsValue(nextState.query)

    }

    render = () => {
        const { suggestions,fetching } = this.props
        const status      = fetching ? 'fetching' : suggestions.length ? 'fetched' : 'N/A'
        const inputStyles = _.assign(styles.input, suggestions.length && this.state.showSuggestions ? styles.inputOpen : styles.inputClosed)
        return <div style={styles.container}>
            <h3>Suggestions</h3>

            <div>Status : {status}</div>
            <div style={styles.suggestions}>
                <input data-key="query-input"
                       style={{...inputStyles}}
                       value={this.state.query}
                       onChange={this._handleChanges}
                       onFocus={() => this.setState({showSuggestions : true})}/>
                {suggestions.length > 0 && this.state.showSuggestions && <ul style={styles.suggestionsList}>
                    {_.map(suggestions, suggestion => <li style={styles.suggestionItem}
                                                          onClick={() => this.setState({query : suggestion.name, showSuggestions : false})}
                                                          data-key='suggestion-container'
                                                          key={suggestion.name}>{suggestion.name}</li>)}
                </ul>}
            </div>
        </div>
    }
}
