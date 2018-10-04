let $ = function (selector) {
    let elements = [];
    //split using RegEx
    let selectorSplit = selector.split(/([#.])/);
    let splitArray = [];
    //recombine delimiters - must be a nicer way of doing this (positive lookahead?)
    for (let i = 0; i < selectorSplit.length; i++) {
        if (selectorSplit[i] === '.' || selectorSplit[i] === '#') {
            splitArray.push(selectorSplit.slice(i, (i + 2)).join(''));
            //skipping the next element because it's already handled
            i++;
        } else if (selectorSplit[i] !== '') {
            //only add if not empty
            splitArray.push(selectorSplit[i]);
        }
    }
    //special cases for first element in array
    if (splitArray[0].charAt(0) === '#') {
        let selectorArray = document.getElementById(splitArray[0].slice(1));
        elements.push(selectorArray);
    } else if (splitArray[0].charAt(0) === '.') {
        let selectorArray = document.getElementsByClassName(splitArray[0].slice(1));
        for (let i = 0; i < selectorArray.length; i++) {
            elements.push(selectorArray[i]);
        }
    } else {
        let selectorArray = document.getElementsByTagName(splitArray[0]);
        for (let i = 0; i < selectorArray.length; i++) {
            elements.push(selectorArray[i]);
        }
    }
    //filter by rest of array
    for (let i = 1; i < splitArray.length; i++) {
        if (splitArray[i].charAt(0) === '#') {
            elements = elements.filter(a => a.id === splitArray[i].slice(1));
        } else if (splitArray[i].charAt(0) === '.') {
            elements = elements.filter(a => a.className.split(' ').includes(splitArray[i].slice(1)));
        }
    }
    return elements;
}

