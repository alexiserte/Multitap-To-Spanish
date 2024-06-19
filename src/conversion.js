const { numbers } = require("./arrays");

function normalToMultimap(phrase) {
    if (typeof(phrase) === 'string') {
        let charArray = phrase.toUpperCase().split('');
        
        let res = [] ; let sum = 0
        
        for (let i = 0; i < charArray.length; i++) {
            if(typeof(numbers[charArray[i]]) !== 'number'){
                if(sum === 0){
                    res.push(charArray[i]);
                }
                else{
                    res.push(sum);
                    res.push(charArray[i]);
                    sum = 0 ;
                }
                
            }
            else if(charArray[i] == ' '){
                res.push(sum)
                sum = 0
                continue
            }
            else{
                sum = sum + numbers[charArray[i]]
                if(i === charArray.length - 1){
                    res.push(sum)
                }
            }
        }
        return res;
    } else {
        return -1;
    }
}




console.log(normalToMultimap('hola! como te llamas??'))

