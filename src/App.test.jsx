/* globals describe, it, jest */

import React from 'react';
import { render } from '@testing-library/react';
import Axios from 'axios';

import App from './App';

describe('horse app', () => {
  it('presents a list of horse names', async () => {
    const horses = [
      { id: 1, name: 'a name' },
      { id: 2, name: 'another name' },
    ];

    Axios.get = jest.fn();
    Axios.get.mockResolvedValueOnce({ data: horses });

    const wrapper = render(<App />);

    await wrapper.findByText(horses[0].name);
    await wrapper.findByText(horses[1].name);
  });
});
