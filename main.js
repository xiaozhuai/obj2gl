const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const dot = require('dot');
const parseObj = require('./parseObj');
const packageJson = require('./package.json');

dot.log = false;

Array.prototype.chunk = function (n) {
    if (!this.length) {
        return [];
    }
    let chunks = [];
    for (let i = 0; i < this.length; i = i + n) {
        chunks.push(this.slice(i, i + n));
    }
    return chunks;
};

function generateSingleOutput(outputDir, ext, renderFn, view) {
    let results = renderFn(view);
    let file = `${outputDir}/${view.name}.${ext}`;
    console.log(`write out ${file}`);
    fs.writeFileSync(file, results);
}

function generateOutput(outputDir, format, view) {
    let tplDir = `${__dirname}/templates/${format}`;
    let dots = dot.process({
        path: tplDir,
        templateSettings: {
            strip: false
        }
    });

    fs.readdirSync(tplDir)
        .map(file => path.basename(file, '.dot'))
        .forEach(ext => {
            generateSingleOutput(outputDir, ext, dots[ext], view);
        });
}

function main() {
    let supportedFormats = fs.readdirSync(`${__dirname}/templates`);

    let argv = yargs
        .option('format', {
            demandOption: true,
            type: 'string',
            description: `Output template format`,
            choices: supportedFormats,
        })
        .option('input', {
            demandOption: true,
            type: 'string',
            description: `3D models of OBJ file`,
        })
        .option('output-dir', {
            type: 'string',
            description: `Output dir, default to obj dir`,
        })
        .option('name', {
            type: 'string',
            description: `Model name`,
        })
        .option('center', {
            type: 'string',
            description: `Center position, example: "0.1,0.2,0.3"`,
        })
        .option('nomove', {
            type: 'boolean',
            description: `No move center`,
            default: false,
        })
        .option('scale', {
            type: 'number',
            description: `Scale factor`,
        })
        .option('noscale', {
            type: 'boolean',
            description: `No scale`,
            default: false,
        })
        .version('version', 'Show version', `obj2gl version ${packageJson.version}\nCopyright (C) 2020 xiaozhuai.\nLicense MIT.`)
        .help('help', 'Show help')
        .argv;

    let objFile = argv.input;
    let format = argv.format;
    let outputDir = argv.hasOwnProperty('outputDir') ? argv.outputDir : path.dirname(objFile);
    let name = argv.hasOwnProperty('name') ? argv.name : path.basename(objFile, '.obj');

    let center = undefined;
    if (argv.nomove) {
        center = {x: 0, y: 0, z: 0};
    } else if (argv.hasOwnProperty('center')) {
        let floats = argv.center.split(',').map(float => parseFloat(float.trim()));
        center = {
            x: floats[0],
            y: floats[1],
            z: floats[2]
        };
    }

    let scale = undefined;
    if (argv.noscale) {
        scale = 1.0;
    } else if (argv.hasOwnProperty('scale') && argv.scale !== 0) {
        scale = argv.scale;
    }

    console.log(`obj        : ${objFile}`);
    console.log(`format     : ${format}`);
    console.log(`output dir : ${outputDir}`);
    console.log(`name       : ${name}`);

    if (!fs.existsSync(objFile)) {
        throw new Error('Obj file not exists!');
    }

    if (!objFile.endsWith('.obj')) {
        throw new Error('Not a obj file!');
    }

    if (!fs.existsSync(outputDir)) {
        throw new Error('Output dir not exists!');
    }

    if (!fs.statSync(outputDir).isDirectory()) {
        throw new Error('Output dir is not a directory!');
    }

    if (supportedFormats.indexOf(format) === -1) {
        throw new Error(`Format "${format}" not supported!`);
    }

    let data = parseObj(objFile, center, scale);

    let view = {
        file: objFile,
        name,
        data
    };

    console.log(`faces      : ${data.numFaces}`);
    console.log(`verts      : ${data.numVerts}`);

    console.log('--------');

    generateOutput(outputDir, format, view);
}

main();
