import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FullDiary from './FullDiary';

it('should render', function() {
    render(
        <MemoryRouter>
            <FullDiary />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <FullDiary />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})