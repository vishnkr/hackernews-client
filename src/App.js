
import React, { Component } from 'react';
import './App.css';




const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


function isSearched(searchTerm){
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

const Search = ({value, onChange, children})=> //functional stateless components changed from an ES6 class component

    <form>
      {children+' : '} 
          <input 
          type="text" 
          value = {value} 
          onChange = {onChange} />
          
    </form>


class Button extends Component{    //ES6 Class component
  render(){
    const {onClick, className ='', children} = this.props;
    return (
      <button onClick = {onClick} className={className} type="button">
        {children}
      </button>

    )

  }
}


const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{width:'40%'}}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{width:'30%'}}>{item.author}</span>
        <span style={{width:'10%'}}>{item.num_comments}</span>
        <span style={{width:'10%'}}>{item.points}</span>
        <span style={{width:'10%'}}>
        <Button
      onClick={() => onDismiss(item.objectID)} className="button-inline">
         Dismiss
        </Button>
        </span>
</div>
)}
</div>


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
};
  this.setSearchTopStories = this.setSearchTopStories.bind(this);
  this.onDismiss = this.onDismiss.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);

}

setSearchTopStories(result){
  this.setState({ result });
}

componentDidMount(){
  const {searchTerm } = this.state;
  fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
  .then(response => response.json())
  .then(result=>this.setSearchTopStories(result))
  .catch(error=>error);}

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId); 
    this.setState({ list: updatedHits });
    }

    render() {
      const { searchTerm, result } = this.state;
      if (!result) {return null;}
      return (
        <div className="page">
          <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}>
              Search 
            </Search>
          </div>
          <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        </div> );
} }

export default App;
  