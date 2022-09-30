# React-native jest test case generator

## What's that ?

This is a [Yeoman](http://yeoman.io) generator used to generate Jest snapshot tests by parsing typescript formatted react native components all Props and propTypes.
The tests are linted with [prettier](https://github.com/prettier/prettier) and outputted to the current directory's ```__tests__``` folder.

## Why ?

Generatinf proper test cases for well-defined components can (and should) easily be offloaded in this library. This is a solution I use across projects to fasten my tests.


## Installation

First, install [Yeoman](http://yeoman.io) and generator-rn-jest-gen using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-rn-jest-gen
```


## Commands

Suppose you have the following file structure
```
- app/
	- screens/
      - Home.tsx
      - Dashboard.tsx
      - Drawer.tsx
```

To Generate test file :

```
yo rn-jest-gen:test
```
To Generate test file with debugger :

```
DEBUG=generator-rn-jest-gen* yo rn-jest-gen:test
```

```
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

Give the path to your folder or ```cd``` to it and put ```./``` as path

Will output :
```
create __tests__/Comp.test.ts
```

and result in :

```
- app/
	- screens/
      - __tests__
        - Home.test.ts
        - Dashboard.test.ts
        - Drawer.test.ts
      - Home.tsx
      - Dashboard.tsx
      - Drawer.tsx
```

Run jest to make sure everything is working as expected.

Any error can be resolved by specifying defaultProps, if no defaultProps are passed propTypes will be parsed to try to generate fake data. Fake Data generation from propTypes is a WIP.

To write seamless and predictable tests add defaultProps to your component definitions.

## Conflicts

By default it won't overwrite anything without asking you first.

## Example

Added one example with name as awesomeApp, there in src file added few ui and non ui components to check the test case generation
