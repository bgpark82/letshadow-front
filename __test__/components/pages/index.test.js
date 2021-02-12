import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from '../../../pages';

describe('index test', function () {
  it('should show hello', function () {
    const { container } = render(<Index />);
    const div = container.querySelector('div');
    expect(div).toHaveTextContent('hello');
  });
});
