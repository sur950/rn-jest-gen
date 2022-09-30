const debug = require("debug");
const { combinations, generateFakeProp } = require("./smallComponents");

const error = debug("generator-rn-jest-gen:error");

const propsExtraction = (
  filePath,
  currentFilePath,
  filename,
  componentInfo
) => {
  const componentProps = [];
  const propsOptArr = [];
  const propsMandArr = [];
  const booleanValues = [];
  const propsFinalArr = [[]];
  let propsUniqueArray = [[]];
  const ComponentName = componentInfo[0]?.displayName
    ? componentInfo[0].displayName
    : filename;
  const componentHasProps = componentInfo[0].props
    ? componentInfo[0].props
    : false;
  if (!componentHasProps) {
    error("No props found in ", filename, " at ", filePath);
    return {
      filePath,
      componentProps,
      filename,
      currentFilePath,
      propsUniqueArray,
      ComponentName,
    };
  }

  const propNames = Object.keys(componentInfo[0].props);
  propNames.map((item, index) => {
    let propType;
    if (componentInfo[0].props[item].flowType) {
      propType = componentInfo[0].props[item].flowType.name;
    } else {
      error(
        "propType not set for " +
          item +
          " in " +
          filename +
          " at " +
          currentFilePath +
          " consider setting it in propTypes"
      );
      propType = "string";
    }
    let propDefaultValue;
    const hasDefaultvalue = componentInfo[0].props[item]?.defaultValue
      ? componentInfo[0].props[item].defaultValue
      : false;
    if (hasDefaultvalue) {
      error(componentInfo[0].props[item].defaultValue);
      propDefaultValue = componentInfo[0].props[item].defaultValue.value;
      error({ item, propType, propDefaultValue });
    } else {
      error(
        "defaultProps value not set for " +
          item +
          " in " +
          filename +
          " at " +
          currentFilePath +
          " consider setting it  in defaultProps"
      );
      error(
        "!!! Will try to generate fake data this might cause unexpected results !!!"
      );
      const { flowType, required } = componentInfo[0].props[item];
      const { name } = flowType;
      let raw = `PropTypes.${name}`;
      const fakeProp = generateFakeProp({ item, name, raw });
      propDefaultValue = fakeProp.value;
      if (required) {
        propsMandArr.push({ propName: item, propType, propDefaultValue });
      } else {
        propsOptArr.push({ propName: item, propType, propDefaultValue });
      }
      if (name === "boolean") {
        booleanValues.push({ propName: item, propType, propDefaultValue });
      }
    }
    componentProps.push({
      propName: item,
      propType,
      propDefaultValue,
      currentFilePath,
    });
  });
  const propsRes = combinations(propsOptArr);

  for (let i = 0; i < propsRes.length; i++) {
    propsFinalArr[i] = propsRes[i].concat(propsMandArr);
  }

  propsFinalArr.push(propsMandArr);

  let propsDuplicateArray = [...JSON.parse(JSON.stringify(propsFinalArr))];

  for (let i = 0; i < propsDuplicateArray.length; i++) {
    for (let j = 0; j < propsDuplicateArray[i].length; j++) {
      if (propsDuplicateArray[i][j].propType === "boolean") {
        propsDuplicateArray[i][j].propDefaultValue =
          !propsDuplicateArray[i][j].propDefaultValue;
      }
      let currentBoolIndex = booleanValues.findIndex(
        (bool) => bool.propName === propsFinalArr[i][j].propName
      );
      if (currentBoolIndex > -1) {
        const propsCopiedArr = JSON.parse(
          JSON.stringify([...propsFinalArr[i]])
        );
        propsCopiedArr[j].propDefaultValue =
          !propsCopiedArr[j].propDefaultValue;
        propsFinalArr.push(propsCopiedArr);
      }
    }
  }

  propsUniqueArray = propsFinalArr.concat(propsDuplicateArray);
  let propsStringArray = propsUniqueArray.map(JSON.stringify);
  let propsUniqueStringArray = new Set(propsStringArray);
  propsUniqueArray = Array.from(propsUniqueStringArray, JSON.parse);

  return {
    filePath,
    componentProps,
    componentInfo,
    filename,
    currentFilePath,
    propsUniqueArray,
    ComponentName,
  };
};

module.exports = { propsExtraction };
