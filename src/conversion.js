import {numbers, words} from "./arrays.js";

function splitAPhraseInSubArrays(phrase) {
  let res = [];
  let currentWord = [];
  let modifiedPhrase = sanitizeWord(phrase);
  let phraseAsCharArray = modifiedPhrase.split(" ");
  for (let i = 0; i < phraseAsCharArray.length; i++) {
    currentWord = [];
    let wordInChar = phraseAsCharArray[i].split(" ");
    for (let j = 0; j < wordInChar.length; j++) {
      let charCode = numbers[wordInChar[j]];
      if (typeof charCode === "undefined") {
        res.push(currentWord);
        currentWord = [];
        currentWord.push(wordInChar[j]);
      } else {
        currentWord.push(charCode);
      }
    }
    res.push(currentWord);
  }

  return res;
}

function translateEachWordFromAnArray(array){
  for (let i = 0; i < array.length; i++) {
    if (array[i].length === 0) {continue;} 
    else {
      let word = array[i].pop();
      let chars = word.split("");
      for (let j = 0; j < chars.length; j++) {
        let charCode = numbers[chars[j]];
        if (typeof charCode === "undefined") {
            array[i].push(chars[j]);
        } else {
            array[i].push(charCode);
        }
      }
    }
  }
  array.shift();
  return array;
}

function sanitizeWord(word) {
    return word
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
}


function normalToMultimap(phrase){
    let phraseSplit = splitAPhraseInSubArrays(phrase)
    let translatedArray = translateEachWordFromAnArray(phraseSplit)
    return translatedArray
}

function multimapToNormal(phraseArray) {
  let phraseRes = "";
  for (let i = 0; i < phraseArray.length; i++) {
    for (let j = 0; j < phraseArray[i].length; j++) {
      let charCode = phraseArray[i][j];
      let char = Object.keys(numbers).find((key) => numbers[key] === charCode);
      if (typeof char === "undefined") {
        phraseRes += phraseArray[i][j];
      } else {
        phraseRes += char;
      }
    }
    phraseRes += " ";
  }
  return phraseRes.trim();
}

console.log(multimapToNormal(normalToMultimap("Me gusta comer salmon?")))

export {normalToMultimap, multimapToNormal}


  