/* globals describe, it, jest, beforeAll, afterEach, afterAll, expect */

import React from 'react';
import {
  render, act, getByDisplayValue,
} from '@testing-library/react';
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

  it('displays details for a horse', async () => {
    const horses = [
      {
        id: 'c36193c4-d60b-48f8-bb16-cf184299407a',
        name: 'Thunderdash',
        profile: {
          favouriteFood: 'Hot Chips',
          physical: {
            height: 200,
            weight: 450,
          },
        },
      }];

    Axios.get.mockResolvedValueOnce({ data: horses });

    const wrapper = render(<App />);

    await act(async () => {
      (await wrapper.findByText(horses[0].name)).click();
    });

    const detailsContainer = (await wrapper.findByText('Details')).parentNode;

    await getByDisplayValue(detailsContainer, horses[0].name);
    await getByDisplayValue(detailsContainer, horses[0].profile.favouriteFood);
    await getByDisplayValue(detailsContainer, horses[0].profile.physical.weight.toString());
    await getByDisplayValue(detailsContainer, horses[0].profile.physical.height.toString());
  });
});
