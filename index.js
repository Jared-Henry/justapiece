const fs = require('fs');
const readline = require('readline');
const args = require('command-line-args');
const usage = require('command-line-usage');

let optionsList = [
    {
        name: 'input',
        alias: 'i',
        type: String,
        description: 'Input file (required).'
    },
    {
        name: 'output',
        alias: 'o',
        type: String,
        description: 'Ouput file (optional). If not set, will output to console.'
    },
    {
        name: 'skip',
        alias: 's',
        type: Number,
        defaultValue: 0,
        description: 'Number of lines to skip (Default = 0).'
    },
    {
        name: 'take',
        alias: 't',
        type: Number,
        defaultValue: 1,
        description: 'Number of lines to take (Default = 1).'
    },
    {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Print usage.'
    }
];

let usageSections = [
    {
        header: 'justapiece',
        content: 'Takes just a piece of a large file.'
    },
    {
        header: 'options',
        optionList: optionsList
    }
]

let options = args(optionsList);

if (options.help || !options.input) {
    console.log(usage(usageSections));
    return;
}

reader = readline.createInterface({
    input: fs.createReadStream(options.input)
});

let skipped = 0;
let taken = 0;
let output = options.output ? fs.createWriteStream(options.output) : process.stdout;
reader.on('line', line => {
    if (skipped < options.skip) {
        skipped++;
    }
    else {
        output.write(line);
        taken++;
        if (taken >= options.take) {
            process.exit(0);
        }
    }
});