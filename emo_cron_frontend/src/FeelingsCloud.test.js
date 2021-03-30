import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeelingsCloud from './FeelingsCloud';

it('should render', function() {
    render(
        <MemoryRouter>
            <FeelingsCloud />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <FeelingsCloud />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})