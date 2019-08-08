
import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Header from './Header'


const DEFAULT_QUERY = '';
const DEFAULT_HPP = 100; 

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


class Search extends Component {
  componentDidMount(){
    if(this.input){
      this.input.focus();
    }
  }
  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;
return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref = {(node)=>{this.input = node;}}
        />
        <button type="submit">
        {children}
        </button>
</form>
); }
}

class Loading extends Component{
  render(){
    return (
      
      <p>Loading..</p>
    );
  }
}

class Button extends Component{    //ES6 Class component
  render(){
    const {onClick, className ='', children} = this.props;
    return (
      <button onClick = {onClick} className={className} type="button">
        {children}
      </button>
    );

  }
}

const Table = ({ list, onDismiss }) =>
  <div className="table">    
    {list.map(item =>
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


const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />
const ButtonWithLoading = withLoading(Button);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading : false,
};
  this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
  this.setSearchTopStories = this.setSearchTopStories.bind(this);
  this.onDismiss = this.onDismiss.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
  this.onSearchSubmit = this.onSearchSubmit.bind(this);
  this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
}
needsToSearchTopStories(searchTerm){
  return !this.state.results[searchTerm];  //checks cache if results are already stores
}
setSearchTopStories(result){

  const { hits , page}=result;
  const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
        isLoading: false
}
});

}

fetchSearchTopStories(searchTerm, page=0) {
  this.setState({ isLoading: true });
  axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${
  PARAM_HPP}${DEFAULT_HPP}`).then(result => this.setSearchTopStories(result.data))
    .catch(error => this.setState({error}));
  
}


componentDidMount(){
  const {searchTerm } = this.state;
  this.setState({searchKey: searchTerm});
  this.fetchSearchTopStories(searchTerm);}

onSearchSubmit(event){
  const {searchTerm }=this.state;
  this.setState({searchKey: searchTerm});
  if(this.needsToSearchTopStories(searchTerm)){
    this.fetchSearchTopStories(searchTerm);
  }
  
  event.preventDefault();
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey]
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId); 
    this.setState({
      results: { ...results, [searchKey]:{hits: updatedHits, page}}
  }); }

    render() {
      const { searchTerm, results, searchKey, error, isLoading } = this.state;
      const page = (results && results[searchKey] &&
        results[searchKey].page)||0;
      const list = (
        results &&
        results[searchKey] &&
        results[searchKey].hits) || [];

      if (error){
        return <h1>Something went wrong!</h1>;
      }

      return (
        
        <div className="page">
          <div className="interactions">
          <Header />
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit = {this.onSearchSubmit}>
              Search 
            </Search>
          </div>
          { error ? <div className = "interactions">
            <p>Something went wrong!!!!</p>}
            </div> : 
          <Table 
          list={list}
          onDismiss={this.onDismiss}
      /> }
        
        <div className="interactions">
          <ButtonWithLoading 
          isLoading={isLoading}
          onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </ButtonWithLoading>

        </div>
          
        </div> );
} }

export default App;
  

export{
  Button, Search, Table,
};