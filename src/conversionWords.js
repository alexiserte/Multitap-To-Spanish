import { numbers, words } from "./arrays";

function normalToMultimap(phrase){
    let res = []
    let currentWord = []
    modifiedPhrase = sanitizeWord(phrase)
    console.log(modifiedPhrase)
    phraseAsCharArray = modifiedPhrase.split(" ")
    for (let i = 0; i < phraseAsCharArray.length; i++) {
        currentWord = []
        wordInChar = phraseAsCharArray[i].split(" ")
        for (let j = 0; j < wordInChar.length; j++) {
            let charCode = numbers[wordInChar[j]]
            if(typeof(charCode) === "undefined"){
                res.push(currentWord)
                currentWord = []
                currentWord.push(wordInChar[j])
            }
            else{
                currentWord.push(charCode)
            }
        }

    }

    console.log(res)
}

function sanitizeWord(word) {
    return word
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }


normalToMultimap("Hola? soy Federico")