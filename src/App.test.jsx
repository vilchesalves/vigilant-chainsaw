/* globals describe, it, jest, beforeAll, afterEach, afterAll, expect */

import React from 'react';
import { render } from '@testing-library/react';
import Axios from 'axios';

import App from './App';

describe('horse app', () => {
  beforeAll(() => {
    Axios.get = jest.fn();
  });

  afterEach(() => {
    Axios.get.mockReset();
  });

  afterAll(() => {
    Axios.get.mockRestore();
  });

  it('presents a list of horse names', async () => {
    const horses = [
      { id: 1, name: 'a name' },
      { id: 2, name: 'another name' },
    ];

    Axios.get.mockResolvedValueOnce({ data: horses });

    const wrapper = render(<App />);

    await wrapper.findByText(horses[0].name);
    await wrapper.findByText(horses[1].name);
  });

  it('should present only up to 10 horses', async () => {
    const horses = [
      { id: 1, name: 'unnamed' },
      { id: 2, name: 'unnamed' },
      { id: 3, name: 'unnamed' },
      { id: 4, name: 'unnamed' },
      { id: 5, name: 'unnamed' },
      { id: 6, name: 'unnamed' },
      { id: 7, name: 'unnamed' },
      { id: 8, name: 'unnamed' },
      { id: 9, name: 'unnamed' },
      { id: 10, name: 'unnamed' },
      { id: 11, name: 'the 11th' },
    ];

    Axios.get.mockResolvedValueOnce({ data: horses });

    const wrapper = render(<App />);

    expect(await wrapper.findAllByText(horses[0].name)).toHaveLength(10);
    expect(await wrapper.queryByText(horses[10].name)).toBeFalsy();
  });
});
