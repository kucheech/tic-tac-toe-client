import React from 'react';
import renderer from 'react-test-renderer';

import { Text, TouchableOpacity } from 'react-native';
import Square from '../components/Square';

describe('<Square />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Square />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('has 1 child', () => {
    const tree = renderer.create(<Square />).toJSON();
    expect(tree.type).toBe('View');
    expect(tree.children[0].type).toBe('Text');
  });
});
