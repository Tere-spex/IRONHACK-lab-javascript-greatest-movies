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
  if (moviesArray.length === 0) return 0;

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

// function scoresAverage(moviesArray = []) {
//   if (moviesArray.length === 0) {
//     return 0;
//   }
//   return round(
//     moviesArray
//       .filter((m) => m.score)
//       .reduce((acc, curr) => acc + curr.score, 0) / moviesArray.length,
//     2
//   );
// }

//OK
// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  // let drama = moviesArray.reduce((acc, movie) => { 
  //   if (movie.genre.includes("Drama")) {
  //     return acc + movie.score / moviesArray.length
  //   }
  // }, 0);
  // return drama; 
  return scoresAverage(moviesArray.filter((movie) => movie.genre.includes('Drama')));
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
// function turnHoursToMinutes(moviesArray) {
//   const newArr = moviesArray.map(movie => {
//     return calc(movie.duration);
//   });
//   console.log(newArr);
// }
// const calc = () => {
//   const hourInString = element;
//   const splitHour = hourInString.split(' ');
//   let hours = 0;
//   let minutes = 0;
//   if (splitHour[0]) {
//     hours = splitHour[0].match(/\d+/)[0];
//   }
//   if (condition) {
//     minutes = parseFloat(splitHour[0].match(/\d+/)[0]);  
//   }
//   const sum = hours * 60 + minutes; 
//   return sum;
// }
// turnHoursToMinutes(movies);

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
let turnHoursToMinutes = (arr) => {
  let modifiedMovies = [];
  modifiedMovies = arr.map((movie) => {
      let newMovieObject = {};
      let time = movie.duration.split(" ");
      newMovieObject = { ...movie };
      if (time.length === 1 && movie.duration.includes('h')) {
          newMovieObject.duration = parseInt(time[0].split("h")) * 60;
      } else if (time.length === 1 && movie.duration.includes('min')) {
          newMovieObject.duration = parseInt(time[0].split("min"));
      } else {
          newMovieObject.duration = parseInt(time[0].split("h")) * 60 + parseInt(time[1].split("min"));
      }
      return newMovieObject;
  });
  return modifiedMovies;
};

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
// function bestYearAvg(moviesArray = []) {
//   if (!moviesArray || moviesArray.length === 0) {
//     return null;
//   }
//   let averagesPerYear = averageScoresPerYear(mapYearToScores(moviesArray));
//   const besYear = findMax(averagesPerYear);
//   return `The best year was ${besYear.year} with an average score of ${besYear.score}`;
// }

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
let bestYearAvg = (arr) => {
  if (arr.length === 0) return null;
  let bestYearAvg = { year: 0, avg: 0 };
  let yearsMapped = [];
  arr
    .map((movie) => movie.year)
    .forEach((year) => {
      if (!yearsMapped.includes(year)) {
        yearsMapped.push(year);
      }
    });
  yearsMapped.forEach((year) => {
    //Get all movies for year
    let moviesOfYear = arr.filter((movie) => {
      return movie.year === year;
    });
    //Calc Avg of year movies
    let yearAvg = moviesOfYear.reduce((acc, movie) => {
      acc += movie.score / moviesOfYear.length;
      return acc;
    }, 0);
    //Compare values
    if (yearAvg > bestYearAvg.avg) {
      bestYearAvg.avg = yearAvg;
      bestYearAvg.year = year;
    } else if (yearAvg === bestYearAvg.avg) {
      if (bestYearAvg.year > year) {
        bestYearAvg.year = year;
      }
    }
  });
  return `The best year was ${bestYearAvg.year} with an average score of ${bestYearAvg.avg}`;
};

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
