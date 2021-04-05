import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EntryChart from './EntryChart';

const data = {
anger: 0.1,
anticipation: 0.1,
date: "2021-01-01T00:00:00.000Z",
disgust: 0.1,
emotions:  [
    {emotion: "test"}
],
entry: "test",
fear: 0.1,
id: 1,
inspiration: "“test",
inspiration_id: 1,
joy: 0.1,
no_emotion: 0.1,
prompt: "test",
prompt_id: 1,
sadness: 0.1,
surprise: 0.1,
trust: 0.1,
}

it('should render', function() {
    render(
        <MemoryRouter>
            <EntryChart data={data}/>
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <EntryChart  data={data}/>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})