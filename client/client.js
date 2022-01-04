
function appendSolution(parent,solution,index) {
  let element = document.createElement('div');
  element.className = 'results-item';
  if (solution.tuti) element.className+=" tuti";
  element.innerHTML = `<span>${index+1}</span> <span>${solution.word}</span> <span>${solution.points}</span>`;
  parent.appendChild(element);
}

function appendSolutions(parent,solutions) {
  parent.innerHTML = '';
  solutions.forEach( (s,i) => appendSolution(parent,s,i) );
}

function setletters(letters){
  /*<!--div id="letters-grid">
      <div class="letter-out"><p class="letter-in">1</p></div>
      <div class="letter-out"><p class="letter-in">2</p></div>
      <div class="letter-out"><p class="letter-in">3</p></div>
      <div class="letter-out"><p class="letter-in">4</p></div>
      <div class="letter-out"><p class="letter-in">5</p></div>
      <div class="letter-out"><p class="letter-in">6</p></div>
      <div class="letter-out"><p class="letter-in">7</p></div>
  </div--> */
  letters = letters.toUpperCase();
  document.getElementById("question-letters").innerHTML = `<strong>${letters[0]}</strong>${letters.slice(1)}`;
  let figures = document.getElementById("figures");
  figures.style.visibility = 'visible';
  let figuresDom = figures.contentDocument;
  let mainletterText = figuresDom.getElementById('letter-main');
  mainletterText.children[0].textContent = letters[0];
  for (let i = 1; i < 7; i++) {
    let letterText = figuresDom.getElementById('letter-' + i);
    letterText.children[0].textContent = letters[i] ? letters[i] : '';
  }




}

document.body.onload = function () {

  fetch('/info')
    .then(response => response.json())
    .then(data => {
      document.getElementById('dictionary-name').textContent = data.dictionaryname;
      document.getElementById('dictionary-entries').textContent = data.dictionaryentries;
    });

  document.getElementById('letters-input').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.getElementById('place-button').click();
      return true;
    } else {
      return false;
    }
  })
  
  document.getElementById('place-button').onclick = function () {
    let letters = document.getElementById('letters-input').value;
    setletters(letters);
    document.getElementById('letters-input').value = '';
    fetch(`/words/${letters}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('results-info').innerHTML = `<strong>${data.total}</strong> paraules`;
        appendSolutions(document.getElementById('results-list'),data.solutions);
      })
  }

}



