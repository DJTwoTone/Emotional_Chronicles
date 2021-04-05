import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Today from './Today';
import UserContext from './UserContext';

const todaysEntry = false

it('should render', function() {
    render(
        <MemoryRouter>
            <UserContext.Provider value={{ todaysEntry }}>
                <Today />
            </UserContext.Provider>
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <UserContext.Provider value={{ todaysEntry }}>
                <Today />
            </UserContext.Provider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})