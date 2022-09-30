
// Auto-generated do not edit


/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import <%-ComponentName%> from '<%-relativeFilePath%>';

const ComponentName = '<%-ComponentName%>';

describe(`<%-ComponentName%> Test`, () => {
  <%- propsUniqueArray.map((setOfProps,index) =>{
    return `it('${ComponentName} - ${setOfProps.map(componentMeta=> componentMeta.propName+' ')}', () => {
      const component = renderer.create(<${ComponentName}
        ${setOfProps.map(componentMeta => {
          return ""+componentMeta.propName+"={"+
          (
            (componentMeta.propType === 'string' || componentMeta.propType === 'PropTypes.string' || componentMeta.propType === 'any') ?
              JSON.stringify(componentMeta.propDefaultValue,null,1)
              :
              componentMeta.propDefaultValue
          )
              +
            "}\n\t\t"
        }  ).join(' ')} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    })\n\t`
  }).join(' ') %> 
});
