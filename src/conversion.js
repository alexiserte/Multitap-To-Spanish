const { numbers, words } = require("./arrays");

function normalToMultimap(phrase) {
  if (typeof phrase === "string") {
    let charArray = sanitizeWord(phrase).split("");
    let res = [];
    let sum = 0;

    for (let i = 0; i < charArray.length; i++) {
      if (typeof numbers[charArray[i]] !== "number") {
        if (sum === 0) {
          res.push(charArray[i]);
        } else {
          res.push(sum);
          res.push(charArray[i]);
          sum = 0;
        }
      } else if (charArray[i] == " ") {
        res.push(sum);
        sum = 0;
        continue;
      } else {
        sum = sum + numbers[charArray[i]];
        if (i === charArray.length - 1) {
          res.push(sum);
        }
      }
    }
    return res;
  } else {
    throw new Error("No es un string");
  }
}

function multimapToNormal(phrase) {
  let res = [];
  for (let i = 0; i < phrase.length; i++) {
    if (typeof phrase[i] === "number") {
      let possibleWords = translateWord(phrase[i]);
      if (possibleWords.length > 0) {
        if (res.length === 0) {
          res = possibleWords;
        } else {
          let temp = [];
          for (let j = 0; j < res.length; j++) {
            for (let k = 0; k < possibleWords.length; k++) {
              temp.push(res[j] + " " + possibleWords[k]);
            }
          }
          res = temp;
        }
      }
    } else {
      res.push(phrase[i]);
    }
  }
  return res;
}

function sanitizeWord(word) {
  return word
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function translateWord(originalWord) {
  let possibleWords = [];
  for (let word of words) {
    processedWord = normalToMultimap(sanitizeWord(word)).pop();
    if (processedWord === originalWord) {
      possibleWords.push(word);
    }
  }
  return possibleWords;
}
