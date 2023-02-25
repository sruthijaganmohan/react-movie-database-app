import React from "react";
import { useEffect, useState, useContext } from "react";
import './App.css';
import MovieCard from './MovieCard'
import { ThemeContext } from "./Theme";

const API_URL = "http://www.omdbapi.com?apikey="

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search)
    }

    const {theme, toggleTheme} = useContext(ThemeContext);


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
            </div>

            <div className="search">
                <input
                    placeholder="search for a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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