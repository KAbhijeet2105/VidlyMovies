import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import Like from './common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';


class Vidly extends Component {
    state = { 
        movieList : [],
        genres: [],
        pageSize : 4,
        currentPage : 1
       // count : this.state.movieList.length
     };


     componentDidMount(){
            this.setState({ movieList : getMovies(), genres : getGenres()  });
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

        console.log("genere: "+genre);

    }; 


    render() { 

        const {length: count} = this.state.movieList;
        const {pageSize, currentPage , movieList : allMovies} = this.state; 



        if(this.state.movieList.length <= 0)
        {
            return <h2>No movies in database !!!</h2>;
        }
        
        const movieList = paginate(allMovies, currentPage, pageSize); // render paginated movie list 

        return (
            <div className='row'>

                <div className="col-3">

                    <ListGroup 
                    items = {this.state.genres} 
                    textProperty = "name"
                    valueProperty = "_id"
                    onItemSelect = {this.handleGenreSelect}
                    
                    />

                </div>
                
            
                
                <div className="col">

                <h3>Showing {this.state.movieList.length} movies from database</h3>

<table className = "table">
    <thead>
        <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th/>
            <th/>

        </tr>
    </thead>

    <tbody>

           
                { 
                        movieList.map( movie => (
                            <tr key = {movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like 
                                liked = {movie.liked}
                                onClick = { () => this.handleLike(movie)}
                                />
                            </td>
                            <td> <button onClick = { () => this.handleDelete(movie)} className='btn btn-danger btn-sm'> Delete </button> </td>

                        </tr>
                        )  )
                  }
            
           

    </tbody>

    </table>

        <Pagination 
            itemsCount = {this.state.movieList.length} 
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