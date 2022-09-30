const { promises: Fs } = require('fs');
const fsPromises = require('fs/promises');
const Path = require('path');

const preInstalledDependencies = [
    "@types/node",
    "react",
    "react-native",
    "@babel/core",
    "@babel/runtime",
    "@react-native-community/eslint-config",
    "@tsconfig/react-native",
    "@types/jest",
    "@types/prop-types",
    "@types/react",
    "@types/react-dom",
    "@types/react-native",
    "@types/react-test-renderer",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "babel-jest",
    "babel-plugin-module-resolver",
    "eslint",
    "jest",
    "metro-react-native-babel-preset",
    "react-native-typescript-transformer",
    "react-test-renderer",
    "ts-jest",
    "typescript"
];

const mapping = {};

async function exists (path) {
    try {
      await Fs.access(path);
      return true;
    } catch {
      return false;
    }
};

const addSetupFile = async(dirPath) => {
    const setupPath = await Path.join(dirPath, "/jest.setup.js");
    const packageJsonFile = await require(Path.join(dirPath, "/package.json"));

    const allDependencies = await Object.keys(packageJsonFile.dependencies).concat(Object.keys(packageJsonFile.devDependencies));
    
    const output = await allDependencies.filter(function (obj) {
        return preInstalledDependencies.indexOf(obj) === -1;
    });

    await Fs.writeFile(setupPath, `/* eslint-disable no-undef */ ${'\n'}`, function (err) {
        if (err) throw err;
    });

    for(let i=0; i<output.length; i++) {
        if (output[i].includes('/')) {
            const newOutput = output[i].replace("@", "");
            const resOne = newOutput.split('/');
            const resTwo = resOne[0].split('-');
            let word='';
            for(let j=0; j<resTwo.length; j++) {
                word += resTwo[j][0].toUpperCase()
            }
            for(let j=1; j<resOne.length; j++) {
                word += resOne[j][0].toUpperCase() + resOne[j].substring(1);
            }
            const newWord = word.replace(".", "");
            const newWordRes = newWord.split('-');
            let finalWord = 'mock';
            for(let j=0; j<newWordRes.length; j++) {
                finalWord += newWordRes[j][0].toUpperCase() + newWordRes[j].substring(1);
            }
            mapping[output[i]] = finalWord;
            (async () => {
                try {
                    await fsPromises.appendFile(setupPath, `import ${finalWord} from '${output[i]}/mock.js';${'\n'}`, 'utf-8');
                } catch(err) {
                  console.log('Error appending data to file', err);
                }
            })();

        }
        else {
            const newOutput = output[i].replace("@", "");
            const resOne = newOutput.split('-');
            const indexOfReact = resOne.indexOf('react');
            if(indexOfReact != -1) {
                const indexOfNative = resOne.indexOf('native');
                if(indexOfNative != -1) {
                    if(indexOfReact != 0) {
                        const element = resOne.splice(indexOfReact, 1)[0];
                        resOne.splice(0, 0, element);
                    }
                    const indexOfNativeAgain = resOne.indexOf('native');
                    if(indexOfNativeAgain != 1) {
                        const element = resOne.splice(indexOfNative, 1)[0];
                        resOne.splice(1, 0, element);
                    }
                }
            }
            if(resOne[0].toLowerCase() === 'react' && resOne[1].toLowerCase() === 'native') {
                let finalWord = 'mockRN';
                for(let j=2; j<resOne.length; j++) {
                    finalWord += resOne[j][0].toUpperCase() + resOne[j].substring(1);
                }
                const newWord = finalWord.replace(".", "");
                mapping[output[i]] = newWord;
                try {
                    await fsPromises.appendFile(setupPath, `import ${newWord} from '${output[i]}/mock.js';${'\n'}`, 'utf-8');
                } catch(err) {
                  console.log('Error appending data to file', err);
                }
            }
            else {
                const indexOfRN = resOne.indexOf('rn');
                if(indexOfRN != -1) {
                    const element = resOne.splice(indexOfRN, 1)[0];
                    resOne.splice(0, 0, element);
                    let finalWord = 'mockRN';
                    for(let j=1; j<resOne.length; j++) {
                        finalWord += resOne[j][0].toUpperCase() + resOne[j].substring(1);
                    }
                    const newWord = finalWord.replace(".", "");
                    mapping[output[i]] = newWord;
                    try {
                        await fsPromises.appendFile(setupPath, `import ${newWord} from '${output[i]}/mock.js';${'\n'}`, 'utf-8');
                    } catch(err) {
                      console.log('Error appending data to file', err);
                    }
                }
                else {
                    let finalWord = 'mock';
                    for(let i=0; i<resOne.length; i++) {
                        finalWord += resOne[i][0].toUpperCase() + resOne[i].substring(1);
                    }
                    const newWord = finalWord.replace(".", "");
                    mapping[output[i]] = newWord;
                    try {
                        await fsPromises.appendFile(setupPath, `import ${newWord} from '${output[i]}/mock.js';${'\n'}`, 'utf-8');
                    } catch(err) {
                      console.log('Error appending data to file', err);
                    }
                }
            }
        }
    }

    setTimeout(() =>{
        (async () => {
            try {
                await fsPromises.appendFile(setupPath, `${'\n'}`, 'utf-8');
            } catch(err) {
            console.log('Error appending data to file', err);
            }
        })();
        setTimeout(() => {
            (async () => {
                try {
                    await fsPromises.appendFile(setupPath, `jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');${'\n'}`, 'utf-8');
                } catch(err) {
                console.log('Error appending data to file', err);
                }
            })();
            setTimeout(() => {
                for(let i=0; i<output.length; i++) {
                    (async () => {
                        try {
                            await fsPromises.appendFile(setupPath, `jest.mock('${output[i]}', () => ${mapping[output[i]]});${'\n'}`, 'utf-8');
                        } catch(err) {
                            console.log('Error appending data to file', err);
                        }
                    })();
                }
            }, 300)
        }, 300)
    }, 300);
};

const checkSetupExists = async(dirPath) => {
    const setupPath = await Path.join(dirPath, "/jest.setup.js");

    const setupExistsRes = await exists(setupPath);

    if(!setupExistsRes) {
        try {
            await addSetupFile(dirPath);
            console.log('Added jest.setup.js');
        }
        catch(err) {
            console.log('error', err);
        }
    }
    else {
        console.log('jest.setup.js already exists');
    }
}

module.exports = { checkSetupExists }
