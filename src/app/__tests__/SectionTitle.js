import React from 'react';
import SectionTitle from '../components/shared/SectionTitle';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <SectionTitle>Section title</SectionTitle>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});