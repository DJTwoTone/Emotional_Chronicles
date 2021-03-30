import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Diary from './Diary';

it('should render', function() {
    render(
        <MemoryRouter>
            <Diary />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <Diary />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})