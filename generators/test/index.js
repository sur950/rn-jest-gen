"use strict";
var Generator = require("yeoman-generator");
var yosay = require("yosay");
var fs = require("fs");
var path = require("path");
var read = require("fs-readdir-recursive");
var reactDocs = require("react-docgen");
var debug = require("debug");
const prettier = require("prettier");
const { checkConfigExists } = require("../../bin/scripts/checkInitialConfig");
const { checkSetupExists } = require("../../bin/scripts/checkInitialSetup");
const { propsExtraction } = require("../components/propsExtraction");
const { _extends, filenameFromPath } = require("../components/smallComponents");

const log = debug("generator-rn-jest-gen:log");
const error = debug("generator-rn-jest-gen:error");

const extractDefaultProps = (filePath, currentFilePath) => {
  const filename = filenameFromPath(filePath);
  const fileString = fs.readFileSync(filePath, "utf8");
  try {
    var componentInfo = reactDocs.parse(
      fileString,
      reactDocs.resolver.findAllComponentDefinitions,
      reactDocs.handlers.propTypesHandler
    );
  } catch (err) {
    console.log(filePath, "is not a React Component, ");
    throw new Error(err);
  }
  const returnObj = propsExtraction(
    filePath,
    currentFilePath,
    filename,
    componentInfo
  );
  return returnObj;
};

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("prettify", {
      descr: "If true, lint code with prettify",
      alias: "pr",
      type: Boolean,
      default: false,
      hide: false,
    });
    this.option("template", {
      desc: "Custom template to use for tests",
      alias: "t",
      type: String,
      default: "",
      hide: false,
    });
  }
  prompting() {
    if (this.options.template.length) {
      this.log(`Received custom template of: ${this.options.template}`);
    }
    this.log(yosay("Create RN tests"));
    var prompts = [
      {
        type: "input",
        name: "COMPONENTS_PATH",
        message: "Give me the path to components please !",
        default: "./src/screens/",
      },
    ];
    if (this.options.isNested) {
      this.props = this.options.props;
    } else {
      return this.prompt(prompts).then(
        function (props) {
          this.props = props;
        }.bind(this)
      );
    }
  }
  writing() {
    const filePaths = read(this.props.COMPONENTS_PATH).filter((filename) =>
      filename.endsWith(".tsx")||filename.endsWith(".ts")
    );
    if (filePaths.length === 0) {
      const noJsMessage = "Did not find any .tsx or .ts files";
      console.log(noJsMessage);
      error(noJsMessage);
    }
    const metadata = [];
    for (let i = 0; i < filePaths.length; i += 1) {
      const currentFilePath = filePaths[i];
      const completeFilePath = this.props.COMPONENTS_PATH + currentFilePath;
      try {
        const componentInfo = extractDefaultProps(
          completeFilePath,
          currentFilePath
        );
        metadata.push(componentInfo);
      } catch (err) {
        error(
          "Couldnt extractDefaultProps from " +
            currentFilePath +
            " at " +
            completeFilePath
        );
        error(err);
      }
    }
    let setupPath = "";
    if (metadata.length && metadata[0]?.filePath) {
      setupPath = path.resolve(metadata[0].filePath, path.join("../.."));
    }
    (async () => {
      if (setupPath && setupPath.length) {
        await checkConfigExists(setupPath);
        await checkSetupExists(setupPath);
      }
    })();
    for (let i = 0; i < metadata.length; i += 1) {
      const compMetaData = metadata[i];
      const testPath = path.resolve(
        compMetaData.filePath,
        path.join("..", "__tests__", compMetaData.filename + ".test.ts")
      );
      const templatePath = this.options.template.length
        ? path.join(this.sourceRoot("."), this.options.template)
        : "index.template.js";
      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(testPath),
        _extends({}, compMetaData, {
          relativeFilePath: path.join("..", compMetaData.filename),
        })
      );
      try {
        const generatedTestCode = this.fs.read(testPath);
        var newData = generatedTestCode.split('\n')
        newData.splice(11,1)
        var finalData = newData.join('\n');
        const formattedTestCode = this.options.prettify
          ? prettier.format(finalData, {
              singleQuote: true,
              trailingComma: "all",
            })
          : finalData;
        this.fs.write(testPath, formattedTestCode);
      } catch (err) {
        error("Couldnt lint generated code :( from " + compMetaData);
      }
    }
  }
};
