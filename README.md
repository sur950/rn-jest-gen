# React-native jest test case generator

## What's that ?

This is a plugin which generates the Jest unit test cases by parsing typescript formatted react native components using [Yeoman](http://yeoman.io) generator.
The tests are linted with [prettier](https://github.com/prettier/prettier) and outputted to the current directory's ```__tests__``` folder.

## Why ?

Generating proper test cases for well-defined components can (and should) easily be offloaded in this library. This is a solution I use across projects to fasten my tests.

## Installation

First, install [Yeoman](http://yeoman.io) and [rn-jest-gen](https://github.com/sur950/generator-jest-rn) using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```js
npm install -g yo
npm install rn-jest-gen
```

## Commands

Suppose you have the following file structure

```js
- app/
  - screens/
    - Home.ts
    - Dashboard.ts
    - Drawer.ts
```

To Generate test file :

```js
yo rn-jest-gen:test
```

To Generate test file with debugger :

```js
DEBUG=generator-rn-jest-gen* yo rn-jest-gen:test
// Prefix "generator-rn-jest-gen*" is needed for debug mode
```

```bash
     _-----_     
    |       |    
    |--(o)--|    ╭──────────────────────────╮
   `---------´   │      Create RN tests     │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? Give me the path to components please ! (./src/screens/)
```

When terminal prompts you with the above question, Kindly provide the path to your folder where you had UI Components or Simply navigate to the folder where you had only UI Components by doing ```cd``` and put ```./``` as path.

Then the generator will create a ```__tests__``` folder and all the test files will be added with `.test.ts` extension. This will also generate the jest config and jest setup files if not exists, But if exists then it won't be re-generated.

Now, if we consider our example then the folder structure will be as follows:

```js
- app/
  - screens/
    - __tests__
      - Home.test.ts
      - Dashboard.test.ts
      - Drawer.test.ts
    - Home.ts
    - Dashboard.ts
    - Drawer.ts
```

## Next Steps?

- If generator had created the jest config and jest setup files then we would suggest you to go through those files and map the imports and test linkings properly in the setup file as per your package dependencies. Also move your setup, config files to root level.
- If your package doesn't provide the test cases link then simply comment that particular dependency in setup file (If you get error from that dependency then make sure you find a way to get test case link to add the setup).
- This will also generate Image Mock file which will be generated based on the active path that you are on. Make sure to move this `__mocks__` folder at root level.
- Run jest test in your generated folder and make sure everything is working as expected.
- Any error can be resolved by specifying defaultProps, if no defaultProps are passed propTypes will be parsed to try to generate fake data. Fake Data generation from propTypes is a WIP.
To write seamless and predictable tests add defaultProps to your component definitions.

## Conflicts

By default it won't overwrite anything without asking you first. So don't worry on existing test cases for the same component.

## Example

You can find this under the `example` folder of the project. Please feel free to give your suggestions.
