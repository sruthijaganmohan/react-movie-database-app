import React from "react";
import { useEffect, useState, useContext } from "react";
import './App.css';
import MovieCard from './MovieCard'
import { ThemeContext } from "./Theme";
import { API_KEY } from "./config";

const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('');
    const {theme, toggleTheme} = useContext(ThemeContext);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search)
        //console.log(data.Search);
        //console.log(sortType);
        //console.log(movie)
    }

    const sortArray = (type, movies) => {
        const types = {
            Year: 'Year',
            Title: 'Title',
            Type: 'Type',
        };
        const sortProperty = types[type];
        movies = movies.sort((a, b) => {
            if (a[sortProperty] < b[sortProperty]) {
              return -1;
            }
          });
        setMovies(movies);
    };
    //sortArray(sortType);


    useEffect(() => {
        searchMovies('');
        
    }, []);

    return (
        <div className={`app ${theme}`}>

            <h1>Movie DB</h1>
            
            <div className="theme">
                <button 
                    id="theme"
                    onClick={() => toggleTheme()}
                >{theme}</button>

                <select 
                    name="sort-movies" 
                    id="sort-movies"
                    onChange={(e) => {
                        setSortType(e.target.value)
                        sortArray(e.target.value, movies);
                        }}>
                    <option selected="true" disabled="true" >sort</option>
                    <option value="Year">Year</option>
                    <option value="Title">Title</option>
                    <option value="Type">Type</option>
                </select>
            </div>

            

            <div className="search">
                <input
                    placeholder="search for a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                        {
                            searchMovies(e.target.value);
                        }
                    }}
                        
                ></input>
                <button
                    id="search-button"
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                >search</button>
            </div>

                       

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                )
                : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    )
}

export default App;