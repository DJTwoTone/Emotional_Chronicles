import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FullDiary from './FullDiary';
import UserContext from './UserContext';


const loggedInUser = {
    username: "testuser", 
    first_name: "Bob", 
    last_name: "Testface", 
    email: "test@test.com", 
    is_admin: false
}

it('should render', function() {
    render(
        <MemoryRouter>
            <UserContext.Provider value={{ loggedInUser }}>
                <FullDiary />
            </UserContext.Provider>
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <UserContext.Provider value={{ loggedInUser }}>
                <FullDiary />
            </UserContext.Provider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})