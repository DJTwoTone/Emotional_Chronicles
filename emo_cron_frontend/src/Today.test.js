import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Today from './Today';

it('should render', function() {
    render(
        <MemoryRouter>
            <Today />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <Today />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})