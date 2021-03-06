'use strict';
const chalk = require('chalk');
const fs = require('fs');

//get the OG file and make it not buffer'd
let amldata = fs.readFileSync('aml_data.json').toString(); 
//make that non buffered json file a js obj so you can manipulate it
let amldata_parsed= JSON.parse(amldata); 

// console.log(amldata_parsed.response.items[0].blurb)

//get the paragraph values and join them    
const joinBodyText = (blurb) => {
    let joinedBodyText = []
    blurb.forEach(el => joinedBodyText.push(el.value))
    return joinedBodyText
}
const convertToApple = (el) => {
    return {
        title: el.title ? el.title : '',
        author: el.author ? el.author : '',
        job:  el.job ? el.job : '',
        image:  el.image ? el.image : '',
        credit: el.credit ? el.credit : '',
        blurb: el.blurb ? joinBodyText(el.blurb) : ''
    }
}

// console.log(convertToApple(amldata_parsed.response.items[0]))

let allStoryItems =[];
const processed = amldata_parsed.response.items.forEach(
    el => allStoryItems.push(convertToApple(el))
)

// processed.clean();

console.log(chalk.bgGreen(processed))

// fs.writeFileSync('applefied.json', processed);


