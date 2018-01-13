import setCounterOfTo from './movies-counter.js';
import MoviesStorage from './movies-storage.js';

var moviesStorage = new MoviesStorage();
var form = document.getElementById('add-new-movie-form');

form.onsubmit = function(event) {
  event.preventDefault();

  if (validateForm()) {
    var randomlyIndex = generateUniqueId();
    var title = capitalizeFirstLetter(document.forms['add-new-movie-form']['title'].value);
    var year = document.forms['add-new-movie-form']['year'].value;
    var genre = document.forms['add-new-movie-form']['genre'].value;
    var summary = document.forms['add-new-movie-form']['summary'].value;

    moviesStorage.set({
      "id": randomlyIndex,
      "title": title,
      "year": year,
      "genre": genre,
      "summary": summary,
      "seen": "F"
    });

    showAlert(success);
    form.reset();

    /** Generating unique movie id **/
    function generateUniqueId() {
      var randomlyIndex = Math.floor((Math.random() * 1000) + 1);

      if (moviesStorage.get(randomlyIndex)) {
        randomlyIndex = generateUniqueId();
      }

      return randomlyIndex;
    }

    /** Capitalize first letter **/
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  } else {
    showAlert(failure);
  }

  /** Alerts management **/
  function showAlert(alert) {
    alert.style.display = 'block';
    setTimeout(hideAlert, 4000);

    function hideAlert() {
      alert.style.display = 'none';
    }
  }
}

moviesCounter(moviesStorage.movies);

function moviesCounter(moviesStorage) {
  let all = moviesStorage.length;
  let viewed = 0;

  function countSeenMovies(item) {
    if (item.seen === 'T') {
      viewed++;
    }
  }

  moviesStorage.forEach(countSeenMovies);

  setCounterOfTo(anotherMoviesCounterAll, all);
  setCounterOfTo(anotherMoviesCounterSeen, viewed);
}

function validateForm() {
  var title = document.forms['add-new-movie-form']['title'].value;
  var year = document.forms['add-new-movie-form']['year'].value;
  var genre = document.forms['add-new-movie-form']['genre'].value;

  /** title validation **/
  if (title === '') {
    alert('Title must be filled out, also should be unique');
    return false;
  } else {
    let myTitle = title.trim();

    if (moviesStorage.movies.find(findOneByTitle)) {
      alert('Title must be unique');
      return false;
    }

    function findOneByTitle(movie) {
      return movie.title === myTitle;
    }

  }

  /** year validation **/
  if (year === '') {
    alert('Year must be filled out');
    return false;
  } else if (! /^\d{4}$/.exec(year)) {
    alert('Year must contain four digits e.g. 1992');
    return false;
  }

  /** genre validation **/
  if (genre === '') {
    alert('Genre must be filled out, please choose one');
    return false;
  }

  console.log('validated');
  return true;
}
