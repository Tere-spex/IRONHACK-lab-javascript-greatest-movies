const movies = require('../src/data')
// Iteration 1: All directors? - Get the array of all directors.

//NO FUNCIONA
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// function getAllDirectors(moviesArray) {
//   const result = [];
//   moviesArray.forEach((movie) => {
//     if (result.indexOff(movie.director) === -1) {
//       result.push(movie.director)
//     }
//   });
//   return result;
// }
// getAllDirectors(movies);

//OK
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directors = moviesArray.map((movie) => movie.director)
  return directors;
}
getAllDirectors(movies);

//OK
// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter((movie) => movie.genre.includes('Drama') && movie.director === 'Steven Spielberg').length;
}
howManyMovies(movies);

//
// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (movies.length === 0) return 0;

  const sumaDeTot = moviesArray.reduce((acc, movie) => {
    if(movie.score !== undefined ){
    return movie.score + acc;
    }else{
      return acc;
    }
  }, 0);
  const resultat = ((sumaDeTot * 1 )/ moviesArray.length)

  return Number(resultat.toFixed(2));
}
scoresAverage(movies);

//OK
// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let drama = moviesArray.reduce((acc, movie) => { 
    if (movie.genre.includes("Drama")) {
      return acc + movie.score / moviesArray.length
    }
  }, 0);
  return drama; 
}

//
// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let moviesByYear =  moviesArray.map((movie) => movie).sort((a, b) => {
    if (a.year > b.year) { 
     return 1;
    }else if (a.year < b.year) {
      return -1;
    }else{ //Si el año es igual, quiero que me los ordene alfabeticamente//No quiero que me retorne 0.
     if (a.title > b.title) {
       return 1;
     }else if (a.title < b.title) {
       return -1;
     }else{
       return 0;
     }
    }
  })
  return moviesByYear;
}
orderByYear(movies);

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let moviesByNameAlphabetically = moviesArray.map((movie) => movie.title).sort();
  let moviesAlphabeticallyFirstTwenty = moviesByNameAlphabetically.slice(0, 20);
  return moviesAlphabeticallyFirstTwenty;
}
orderAlphabetically(movies);
 
// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let moviesDuration = movies.map((movie) => movie.duration);
  for (let i = 0; i < moviesDuration.length; i++) {
    let horas = moviesDuration[i].substring(0, moviesDuration[i].search("h"));
    let minutos = moviesDuration[i].substring(moviesDuration[i].search("h") + 1, moviesDuration[i].search("min")) * 1;
    let horasEnMinutos = horas * 60 + minutos;
    return horasEnMinutos; 
  }
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
