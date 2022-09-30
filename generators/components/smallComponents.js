const debug = require("debug");

const log = debug("generator-rn-jest-gen:log");

const _extends =
  Object.assign ||
  function (target) {
    for (let i = 1; i < arguments.length; i++) {
      let source = arguments[i];
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

const filenameFromPath = (filePath) => {
  log("filenameFromPath ", filePath);
  let filePathNoExtension = "";
  if (filePath.includes(".tsx")) {
    filePathNoExtension = filePath.split(".tsx");
  } else {
    filePathNoExtension = filePath.split(".ts");
  }
  const filePathNoExtensionArray = filePathNoExtension[0].split("/");
  const filename =
    filePathNoExtensionArray[filePathNoExtensionArray.length - 1];
  return filename;
};

const generateFakeProp = ({ propName, value, raw }) => {
  let name = value;
  const isShape = typeof value === "object";

  if (isShape) {
    const fakeShape = {};
    Object.keys(value).forEach((shapeChildName) => {
      const fakeProp = generateFakeProp({
        propName,
        name: shapeChildName,
        value: value[shapeChildName].name,
      });
      const fakePropName = fakeProp.name;
      const fakePropValue = fakeProp.value;
      fakeShape[fakePropName] = fakePropValue;
    });
    return { propName, name, value: fakeShape };
  }

  switch (value) {
    case "number":
      return { name, value: 42 };
    case "string":
      return { name, value: "defaultString" };
    case "boolean":
      return { name, value: true };
    case "Array":
      return { name, value: "[]" };
    default:
      switch (name) {
        case "func":
          return { name, value: "() => {}" };
        case "number":
          return { name, value: 42 };
        case "string":
          return { name, value: "defaultString" };
        case "boolean":
          return { name, value: true };
        case "Array":
          return { name, value: "[]" };
        default:
          switch (raw) {
            case "PropTypes.func":
              return { name, value: "() => {}" };
            case "PropTypes.number":
              return { name, value: 42 };
            case "PropTypes.string":
              return { name, value: "defaultString" };
            case "PropTypes.boolean":
              return { name, value: true };
            case "PropTypes.Array":
              return { name, value: "[]" };
            default:
              return { name, value: "unrecognized" };
          }
      }
  }
};

const combinations = (propsOptArr) => {
  let combResultArr = [];
  let combTempArr = [];
  const propsOptArrLen = Math.pow(2, propsOptArr.length);

  for (let i = 0; i < propsOptArrLen; i++) {
    combTempArr = [];
    for (let j = 0; j < propsOptArr.length; j++) {
      if (i & Math.pow(2, j)) {
        combTempArr = [...combTempArr, propsOptArr[j]];
      }
    }
    if (combTempArr.length) {
      combResultArr.push(combTempArr);
    }
  }
  return combResultArr;
};

module.exports = { _extends, filenameFromPath, generateFakeProp, combinations };
