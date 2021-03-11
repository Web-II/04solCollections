// Deel1
const alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const tecoderen = 'Errare humanum est.';
const resultaat = tecoderen
  .toUpperCase()
  .split('')
  .map((value, index, array) => {
    return alfabet.includes(value)
      ? alfabet[(alfabet.indexOf(value) + 3) % 26]
      : value;
  });
console.log(resultaat);

// Deel 2
function camelize(input) {
  return input
    .split('-') // my-long-word -> ['my', 'long', 'word']
    .map((word, index) =>
      index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    ) // ['my', 'long', 'word'] -> ['my', 'Long', 'Word']
    .join(''); // ['my', 'Long', 'Word'] -> myLongWord
}

console.log(camelize('background-color')); // backgroundColor
console.log(camelize('list-style-image')); // listStyleImage
console.log(camelize('-webkit-transition')); // WebkitTransition

// Deel 3
function zijnBuren(word1, word2) {
  let resultaat = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) {
      resultaat++;
    }
  }
  console.log(resultaat);
  return resultaat === 1;
}

const woorden = [
  'KOLDER',
  'HOLDER',
  'HELDER',
  'HERDER',
  'VERDER',
  'VERVER',
  'VERSER',
  'VELSER'
];
console.log(
  woorden.reduce((result, value, index, array) => {
    return (result =
      index < array.length - 1
        ? result && zijnBuren(woorden[index], woorden[index + 1])
        : result);
  }, true)
);

function compareStrings(word1, word2) {
  return (
    1 ===
    word1.split('').reduce((sum, value, index, array) => {
      return word1[index] === word2[index] ? sum : sum + 1;
    }, 0)
  );
}

// Deel 4
let morse = new Map();
morse.set('A', '.-');
morse.set('B', '-...');
morse.set('C', '-.-.');
morse.set('D', '-..');
morse.set('E', '.');
morse.set('F', '..-.');
morse.set('G', '--.');
morse.set('H', '....');
morse.set('I', '..');
morse.set('J', '.---');
morse.set('K', '-.-');
morse.set('L', '.-..');
morse.set('M', '--');
morse.set('N', '-.');
morse.set('O', '---');
morse.set('P', '.--.');
morse.set('Q', '--.-');
morse.set('R', '.-.');
morse.set('S', '...');
morse.set('T', '-');
morse.set('U', '..-');
morse.set('V', '...-');
morse.set('W', '.--');
morse.set('X', '-..-');
morse.set('Y', '-.--');
morse.set('Z', '--..');
morse.set('0', '-----');
morse.set('1', '.----');
morse.set('2', '..---');
morse.set('3', '...--');
morse.set('4', '....-');
morse.set('5', '.....');
morse.set('6', '-....');
morse.set('7', '--...');
morse.set('8', '---..');
morse.set('9', '----.');
morse.set('.', '.-.-.-');
morse.set(',', '--..--');
morse.set('?', '..--..');
morse.set('-', '-....-');
morse.set('/', '-..-.');
morse.set(':', '---...');
morse.set("'", '.----.');
morse.set('-', '-....-');
morse.set(')', '-.--.-');
morse.set(';', '-.-.-');
morse.set('(', '-.--.');
morse.set('=', '-...-');
morse.set('@', '.--.-.');

const tekst = 'I NEED HELP WITH JAVASCRIPT SOS';
const result = tekst
  .toUpperCase()
  .split('')
  .map((value) => {
    return morse.has(value) ? morse.get(value) + ' ' : value;
  });
console.log(result);
