
function dictionaryLookup(character) {
    const lookup = _.find(dictionary, function (o) {
        return _.get(o, 'value', '').includes(character);
    });
    return lookup && lookup.key ? lookup.key : ' ';
}

function isAlpha(character) {
    return /^([a-z0-9])$/.test(character);
}

function stringTo2dArray(string, delimiter1, delimiter2) {
    return string.split(delimiter1).map(function (x) {
        const characters = x.split(delimiter2);
        const resultArray = [];
        let tempAlphaText = '';
        for (let i = 0; i < characters.length; i++) {
            if (isAlpha(characters[i])) {
                tempAlphaText += characters[i];
                if (!isAlpha(characters[i + 1])) {
                    resultArray.push(tempAlphaText);
                    tempAlphaText = '';
                }
            } else {
                resultArray.push(characters[i]);
            }
        }
        return resultArray;
    });
}

function builtResultTable(input2DArray, output2DArray) {
    let result = '';
    for (let line = 0; line < output2DArray.length; line++) {
        result += '<table border="0" class="resultTable">';
        result += '<tr>';
        for (let character = 0; character < output2DArray[line].length; character++) {
            result += `<td> ${output2DArray[line][character]} </td>`;
        }
        result += '</tr>';
        result += '<tr>';
        for (let character = 0; character < output2DArray[line].length; character++) {
            result += `<td> ${input2DArray[line][character]} </td>`;
        }
        result += '</tr>';
        result += '</table>';
    }
    return result;
}

function romanise() {
    const stringInput = document.getElementById("input").value;
    const input2DArray = stringTo2dArray(stringInput, '\n', '');
    const output2DArray = stringTo2dArray(stringInput, '\n', '');

    for (let line = 0; line < input2DArray.length; line++) {
        for (let character = 0; character < input2DArray[line].length; character++) {
            const currentCharacter = input2DArray[line][character];
            if (currentCharacter !== ' ') {
                output2DArray[line][character] = dictionaryLookup(currentCharacter);
            }
        }
    }
    document.getElementById("output").innerHTML = builtResultTable(input2DArray, output2DArray);
}
