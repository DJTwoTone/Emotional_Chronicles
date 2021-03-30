import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Admin from './Admin';

it('should render', function() {
    render(
        <MemoryRouter>
            <Admin />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <Admin />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})