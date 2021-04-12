import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MonthGraph from './MonthGraph';
import UserContext from './UserContext'
import { DateTime } from 'luxon'

global.ResizeObserver = require('resize-observer-polyfill');



const loggedInUser = {
    username: "testuser", 
    first_name: "Bob", 
    last_name: "Testface", 
    email: "test@test.com", 
    is_admin: false
}

const testDate = 'Tue Apr 06 2021 16:29:37 GMT+0900 (Korean Standard Time)'

it('should render', function() {
    
    render(
        <MemoryRouter>
            <UserContext.Provider value={{ loggedInUser }}>
                <MonthGraph />
            </UserContext.Provider>
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    
    const { asFragment } = render(
        <MemoryRouter>
            <UserContext.Provider value={{ loggedInUser }}>
                <MonthGraph date={DateTime.fromJSDate(testDate)}/>
            </UserContext.Provider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})