import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Inspiration from './Inspiration';

it('should render', function() {
    render(
        <MemoryRouter>
            <Inspiration />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <Inspiration />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})