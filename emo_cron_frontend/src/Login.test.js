import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

it('should render', function() {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})