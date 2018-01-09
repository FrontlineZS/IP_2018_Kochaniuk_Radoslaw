import setCounterOfTo from './movies-counter.js';
import MoviesStorage from './movies-storage.js';

var moviesData = JSON.parse(localStorage.getItem("movies"));
var moviesStorage = new MoviesStorage(moviesData);

// console.log(moviesStorage.get());

// console.log(moviesStorage.get(3));

// moviesStorage.set({
//           "id": 4,
//           "title": "ADDED BY SET METHOD",
//           "year": 2018,
//           "genre": "drama",
//           "summary": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//           "seen": "T"
//       });

// moviesStorage.set(1, {
//           "id": 4,
//           "title": "ADDED BY SET METHOD",
//           "year": 2018,
//           "genre": "drama",
//           "summary": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//           "seen": "T"
//       });

moviesCounter(moviesStorage.movies);
moviesStorage.movies.forEach(generateNewListElement);

function moviesCounter(moviesStorage) {
  let all = moviesStorage.length;
  let viewed = 0;

  function moviesCounterSeen(item) {
    if (item.seen === 'T') {
      viewed++;
    }
  }

  moviesStorage.forEach(moviesCounterSeen);

  setCounterOfTo('moviesCounterAll', all);
  setCounterOfTo('moviesCounterSeen', viewed);
}

function generateNewListElement(item) {
  var li = document.createElement('li');
  li.setAttribute('id', 'movie-list');

  var containerDiv = document.createElement('div');
  containerDiv.setAttribute('id', item.id);
  containerDiv.setAttribute('class', 'container-div')

  var titleAndYear = document.createElement('div');
  titleAndYear.textContent = item.title + ' ' + `${item.year}`;

  var genre = document.createElement('span');
  genre.textContent = item.genre;

  var summary = document.createElement('p');
  summary.textContent = item.summary;

  var isSeen = document.createElement('span');
  isSeen.textContent = 'have I seen ?';
  isSeen.setAttribute('style', 'margin: 0 20px 0 0;');

  var seen = document.createElement('button');
  seen.setAttribute('id', `button-${item.id}`);
  seen.addEventListener('click', function() {
    handleIconChange(item.id)
  });

  if (item.seen === 'T') {
    seen.setAttribute('class', 'seen');
  } else {
    seen.setAttribute('class', 'not-seen');
  }

  containerDiv.appendChild(titleAndYear);
  containerDiv.appendChild(genre);
  containerDiv.appendChild(summary);
  containerDiv.appendChild(isSeen);
  containerDiv.appendChild(seen);

  li.appendChild(containerDiv);
  document.getElementById('moviesList').appendChild(li);
}

function handleIconChange(itemId) {
  function findOneById(movie) {
    return movie.id === itemId;
  }

  let filteredMovie = moviesStorage.movies.find(findOneById);
  let button = document.getElementById(`button-${filteredMovie.id}`);

  (filteredMovie.seen === 'T') ? (button.setAttribute('class', 'not-seen')) : (button.setAttribute('class', 'seen'));
  (filteredMovie.seen === 'T') ? (filteredMovie.seen = 'F') : (filteredMovie.seen = 'T');

  moviesCounter(moviesData);
}
