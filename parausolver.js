/* Pal Barcelona <palbcn@yahoo.com> */
import fs from "fs";

//****************************************************
function properUpperCaseLetters(s) {
  const UPPERCASE_NO_DIACRITICS_00C0_017F = /* replace the diacritics section at 00C0 */
    /* ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ     ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß
       àáâãäåæçèéêëìíîï     ðñòóôõö÷øùúûüýþÿ
       ĀāĂăĄąĆćĈĉĊċČčĎď     ĐđĒēĔĕĖėĘęĚěĜĝĞğ
       ĠġĢģĤĥĦħĨĩĪīĬĭĮį     İıĲĳĴĵĶķĸĹĺĻļĽľĿ
       ŀŁłŃńŅņŇňŉŊŋŌōŎŏ     ŐőŒœŔŕŖŗŘřŚśŜŝŞş
       ŠšŢţŤťŦŧŨũŪūŬŭŮů     ŰűŲųŴŵŶŷŸŹźŻżŽžſ  */
    "AAAAAAACEEEEIIII" + "DNOOOOOXOUUUUYIS" +  //00C0
    "AAAAAAACEEEEIIII" + "DNOOOOO/OUUUUYBY" +  //00E0
    "AAAAAACCCCCCCCDD" + "DDEEEEEEEEEEGGGG" +  //0100
    "GGGGHHHHIIIIIIII" + "IIJJJJKKKLLLLLLL" +  //0120
    "LLLNNNNNNNNNOOOO" + "OOOORRRRRRSSSSSS" +  //0140
    "SSTTTTTTUUUUUUUU" + "UUUUWWYYYZZZZZZZ";   //0160

  return s
    .toUpperCase()
    .split('')
    .map(c =>
      (c.charCodeAt() >= 0x00c0 &&
        c.charCodeAt() <= 0x0017f) ?
        UPPERCASE_NO_DIACRITICS_00C0_017F[
        c.charCodeAt() - 0x00c0]
        : c
    )
    .join('');
};


//****************************************************
/*  Les paraules de 3 lletres donen 1 punt. Les de 4 lletres, 2 punts.
    A partir de 5 lletres, tants punts com lletres tingui la paraula.
    si s’usen totes les lletres o ‘tuti’ obteniu 10 punts extra!
*/
export function solutionPoints(solution) {
  let c = solution.word.length;
  if (c == 3) return 1;
  if (c == 4) return 2;
  if (solution.tuti) c += 10;  // tuti
  return c;
}

//****************************************************
function removeDupesInSortedArray(arr, equalfunc) {
  let res = [];
  if (arr.length < 2) return arr;
  let i = 0;
  while (i < arr.length - 1) {
    if (!equalfunc(arr[i], arr[i + 1])) res.push(arr[i]);
    i++;
  }
  return res;
}

//****************************************************
function matchingOfSortedArrays(arrA, arrB) {
  let res = [];
  let i = 0;
  let j = 0;
  while (i < arrA.length && j < arrB.length) {
    if (arrA[i] == arrB[j]) {
      res.push(arrA[i]);
      j++;
    } else if (arrA[i] < arrB[j]) i++
    else j++
  }
  return res;
}


//****************************************************
const MINMATCH = 3;

function checkMatch(mainletter, letters, dictionaryEntry) {
  /* paraulogic rules:
  - les lletres es poden repetir
  - només paraules que figurin al DIEC  ---> construim diccionari a partir del dict base de softcatala
  - verbs només infinitius 
  - noms i adjectius només masc i fem (no plurals).
  */
  if (!dictionaryEntry.letters.includes(mainletter)) return null;
  let result = matchingOfSortedArrays(letters, dictionaryEntry.letters);
  if (result.length < MINMATCH) return null;
  let placed = [];
  let missing = letters.slice(0);
  for (let i = 0; i < dictionaryEntry.letters.length; i++) {
    let letter = dictionaryEntry.letters[i];
    if (!letters.includes(letter)) return null;
    placed.push(letter);
    let index = missing.indexOf(letter);
    if (index !== -1) missing.splice(index, 1);
  }
  let solution = { ...dictionaryEntry, placed, missing };
  solution.tuti = (missing.length==0);
  solution.points = solutionPoints(solution);
  return solution;
}


//****************************************************
export function findWords(dictionary, letters) {
  letters = properUpperCaseLetters(letters).split('');
  let mainletter = letters[0];
  letters.sort();
  let results = dictionary
    .map(entry => checkMatch(mainletter, letters, entry))
    .filter(element => element !== null)
    .sort((a, b) => b.points - a.points )
  return results;
}

//****************************************************
export function prepareDictionary(dictText) {
  let dictionaryWords = dictText.split(/\r?\n/);
  let dictionary = dictionaryWords.map(word => {
    let plainword = properUpperCaseLetters(word);
    return { word, plainword, letters: plainword.split('').sort() }
  });
  dictionary.sort( (a,b) => a.word.localeCompare(b.word) );
  dictionary = removeDupesInSortedArray(dictionary, (a,b) => a.word==b.word);
  return dictionary;
}


