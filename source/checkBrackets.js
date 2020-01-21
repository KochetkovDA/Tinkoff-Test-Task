/**
    Напишите функцию тестирующую правильность вложенных скобок трех типов(кроме нижеперчисленных символов других в строке нет) - '(' и ')', '[' и ']', '<' и '>': 
    test('[]()<>') // => true
    test('[]()<)') // => false
    test('[(<>)]') // => true
    test('[(<>])') // => false
    Так-же нужно написать тесты на реализацию
 */

/**
*  @param {String} brackets - строка содержащая скобки, которую нужно проверить
*  @returns {Boolean} - результат проверки, если скобки вложены правильно возвращает true, если нет - false
*/
 function checkBrackets(brackets) {
    const open = "([<";
    const close = ")]>";
    let bracketOrder = [];

    if (!brackets.length || brackets.length % 2 ) { return false };

    for (const bracket of brackets)
    {
        const i = open.indexOf(bracket);
        if (i > -1) bracketOrder.push(close[i]);
        if (close.includes(bracket) && bracket != bracketOrder.pop()) return false
    }

    return true;
 }

 export default checkBrackets;