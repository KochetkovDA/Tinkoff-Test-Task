/**
  Напишите функцию для поиска анаграмм. Так-же нужно написать тесты на реализацию
  const data = [
    "вертикаль",
    "кильватер",
    "апельсин",
    "спаниель",
    "австралопитек",
    "ватерполистка",
    "кластер",
    "сталкер",
    "стрелка",
    "корабль"
]
// Результат:
const result = [
    ["вертикаль", "кильватер"],
    ["апельсин", "спаниель"],
    ["австралопитек", "ватерполистка"],
    ["кластер", "сталкер", "стрелка"],
    ["корабль"]
] 
 */

 /**
  *  @param {string[]} data - массив слов для поиска анаграмм
  *  @returns {Array[]} - массив с массивами содержащими слова анаграммы 
  */
function anagramm(data) {
  if (!Array.isArray(data) && data.length ) { return []; }

  const result = {};

  for (let i = 0; i <= data.length - 1; i++) {
    if(typeof data[i] !=='string') { continue; }
    
    const sortedString = data[i].toLowerCase().split('').sort().join('');
    result[sortedString] = result[sortedString] ? [...result[sortedString], data[i]] : [data[i]] ;
  } 

  return Object.values(result);
}

export default anagramm;