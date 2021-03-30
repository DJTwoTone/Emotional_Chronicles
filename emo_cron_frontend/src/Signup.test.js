import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from './Signup';

it('should render', function() {
    render(
        <MemoryRouter>
            <Signup />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <Signup />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})