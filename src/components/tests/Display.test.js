import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Display from '../Display'
import mockFetchshow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow')

const testShow = {
    name: 'Show test',
    summary: 'test summary',
    seasons: [
        {
            id: 0,
            name: 'Season 1',
            episodes: []
        },
        {
            id: 1,
            name: 'Season 2',
            episodes: []
        },
        {
            id: 2,
            name: 'Season 3',
            episodes: []
        },
        {
            id: 3,
            name: 'Season 4',
            episodes: []
        },
    ]
    //add in approprate test data structure here.
}
test('render with no error ', () => {

    render(<Display />)

})

test('when button is clicked render show component', async () => {
    mockFetchshow.mockResolvedValueOnce(testShow)
    render(<Display />)
    const button = screen.getByRole('button')
    userEvent.click(button)

    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument()

})

test('rendeing season option is the same as the fetch return when we click the button ', async () => {
    mockFetchshow.mockResolvedValueOnce(testShow)
    render(<Display />)
    const button = screen.getByRole('button')
    userEvent.click(button)
    await waitFor(() => {
        const options = screen.queryAllByTestId('season-option')
        expect(options).toHaveLength(4)
    })


})


test('display function is called when button is clicked', async () => {
    mockFetchshow.mockResolvedValueOnce(testShow)

    const displayFunc = jest.fn()

    render(<Display displayFunc={displayFunc} />)
    const button = screen.getByRole('button')
    userEvent.click(button)
    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled()
    })


})










///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.