import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WritingPrompt from './WritingPrompt';

it('should render', function() {
    render(
        <MemoryRouter>
            <WritingPrompt />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <WritingPrompt />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})