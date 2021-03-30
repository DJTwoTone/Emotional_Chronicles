import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmoCalendar from './EmoCalendar';

it('should render', function() {
    render(
        <MemoryRouter>
            <EmoCalendar />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <EmoCalendar />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})