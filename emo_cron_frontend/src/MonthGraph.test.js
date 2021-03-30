import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MonthGraph from './MonthGraph';

it('should render', function() {
    render(
        <MemoryRouter>
            <MonthGraph />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <MonthGraph />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})