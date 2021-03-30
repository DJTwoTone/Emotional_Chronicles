import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WritingInspiration from './WritingInspiration';

it('should render', function() {
    render(
        <MemoryRouter>
            <WritingInspiration />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <WritingInspiration />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})