const fs = require('fs');
const inquirer = require('inquirer');

//gathers user inputs via prompt
async function promptUser(){
    const userInput = await inquirer.prompt([

        {
            type: 'input',
            name: 'text',
            message: 'Enter text for the logo'
        },
        {
            type: 'list',
            name: 'color',
            message: 'Select color',
            choices: ['red', 'blue', 'yellow'],
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Select a shape',
            choices: ['circle', 'square', 'triangle'],
        },
    ]);

    return userInput;
}

function generateLogo(userInput) {

    const {text, color, shape} = userInput;
    
    let svgContent = `
    <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    `;

    if(shape === "circle"){
        svg += `
        <circle cx="150" cy="100" r="80" fill="${color}" />
        `;
    } else if (shape === "square"){
        svg += `
        <rect x="50" y="50" width="200" height="100" fill="${color}" />
        `;
    } else if (shape === "triangle"){
        svg += `
        <polygon points="150,20 250,180 50,180" fill="${color}" />
        `;
    }

}

async function saveAndGenerateLogo() {
    try {
        const userInput = await promptUser()
        const svgContent = generateLogo(userInput);
        fs.writeFileSync('logo', svgContent);
        console.log("logo saved!");
    } catch (error) {
        console.log("Error generating logo: ", error);
    }
}