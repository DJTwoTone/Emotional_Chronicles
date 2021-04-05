import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WritingPrompt from './WritingPrompt';

const prompt = {
    prompt: "test prompt"
}

const setPrompt = jest.fn()

it('should render', function() {
    render(
        <MemoryRouter>
            <WritingPrompt prompt={prompt} setPrompt={setPrompt} />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <WritingPrompt prompt={prompt} setPrompt={setPrompt} />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})