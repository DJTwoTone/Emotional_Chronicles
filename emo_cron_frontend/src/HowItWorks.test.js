import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HowItWorks from './HowItWorks';

it('should render', function() {
    render(
        <MemoryRouter>
            <HowItWorks />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <HowItWorks />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})