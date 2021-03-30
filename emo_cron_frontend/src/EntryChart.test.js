import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EntryChart from './EntryChart';

it('should render', function() {
    render(
        <MemoryRouter>
            <EntryChart />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <EntryChart />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})