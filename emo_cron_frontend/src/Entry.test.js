import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Entry from './Entry';

it('should render', function() {
    render(
        <MemoryRouter>
            <Entry />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <Entry />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})