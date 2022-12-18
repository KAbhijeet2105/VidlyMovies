import _ from 'lodash';
import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import MoviesTable from './moviesTable';


class Vidly extends Component {
    state = { 
        movieList : [],
        genres: [],
        pageSize : 4,
    
        currentPage : 1,
        sortColumn : { path : 'title',order : 'asc' }
        
       // count : this.state.movieList.length
     };


     componentDidMount(){

        const genres = [{ _id : "", name: 'All Genres ' },...getGenres()]

            this.setState({ movieList : getMovies(), genres });
     };



     printMovieList =  (movieList) =>
     {
        console.log(movieList);
     };

     handleDelete = (movie) => {
        //console.log(movie);

        const movieList = this.state.movieList.filter(m => m._id !== movie._id);
            this.setState({movieList : movieList}); // or  this.setState({movieList}); //in modern js we use this
     };
     

     handleLike = (movie) => {
        console.log(" component liked ", movie)

        const movieList = [...this.state.movieList]; 

        const index = movieList.indexOf(movie);

        movieList[index] = {...movieList[index]}
        
        movieList[index].liked = !movieList[index].liked;

        this.setState({movieList});

     };


     handlePageChange = page =>{

        this.setState({currentPage : page});
     };

    handleGenreSelect = genre => {

        this.setState({selectedGenre : genre, currentPage : 1});

        //console.log("genere: "+genre.name);

    }; 



    handleSort = sortColumn => {
        
       
        this.setState({sortColumn });
        
        //console.log(path);

    };


    getPagedData = () => {

        const {pageSize, currentPage ,   sortColumn, selectedGenre, movieList : allMovies} = this.state; 



        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

         
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order] );


        const movieList = paginate(sorted, currentPage, pageSize); // render paginated movie list 


        return { totalCount: filtered.length, data: movieList};

    };



    render() { 

        const {length: count} = this.state.movieList;
        const {pageSize, currentPage ,   sortColumn, selectedGenre, movieList : allMovies} = this.state; 



        if(this.state.movieList.length <= 0)
        {
            return <h2>No movies in database !!!</h2>;
        }

        //movieList here 

        const {totalCount, data : movieList }  = this.getPagedData();

        return (
            <div className='row'>

                <div className="col-3">

                    <ListGroup 
                    items = {this.state.genres} 
                     selectedItem = { this.state.selectedGenre}
                    onItemSelect = {this.handleGenreSelect}
                    
                    />

                </div>
                
            
                <div className="col">

                <h3>Showing {totalCount} movies from database</h3>

                <MoviesTable 
                 movieList={movieList} 
                 sortColumn = {sortColumn}
                 onLike = {this.handleLike} 
                 onDelete = {this.handleDelete} 
                 onSort= {this.handleSort}
                 />


        <Pagination 
            itemsCount = {totalCount} 
            pageSize = {pageSize}
            currentPage = {currentPage}
            onPageChange = {this.handlePageChange } 
        />


                </div>

                
            </div>
        );
    }
}
 
export default Vidly;