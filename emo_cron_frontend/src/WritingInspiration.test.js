import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WritingInspiration from './WritingInspiration';

const inspiration = {
    inspiration: "test inspiration"
}

const setInspiration = jest.fn()



it('should render', function() {
    render(
        <MemoryRouter>
            <WritingInspiration inspiration={inspiration} setInspiration={setInspiration} />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <WritingInspiration inspiration={inspiration} setInspiration={setInspiration} />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})