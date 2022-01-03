
function appendSolution(parent,solution) {
  let element = document.createElement('p');
  element.innerHTML = `${solution.word} - ${solution.points}`;
  parent.appendChild(element);
}

function appendSolutions(parent,solutions) {
  solutions.forEach( s => appendSolution(parent,s) );
}

document.body.onload = function () {

  fetch('/info')
    .then(response => response.json())
    .then(data => {
      document.getElementById('dictionary-name').textContent = data.dictionaryname;
      document.getElementById('dictionary-entries').textContent = data.dictionaryentries;
    });

  document.getElementById('place-button').onclick = function () {
    let letters = document.getElementById('letters-input').value;
    fetch(`/words/${letters}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('results-info').textContent = data.total;
        appendSolutions(document.getElementById('results-list'),data.solutions);
      })
  }

}



