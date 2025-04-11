import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const booksAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = booksAdapter.getInitialState()

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBooks: builder.query({
            query: () => '/books',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedBooks = responseData.map(book => {
                    book.id = book._id
                    return book
                });
                return booksAdapter.setAll(initialState, loadedBooks)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Book', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Book', id }))
                    ]
                } else return [{ type: 'Book', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetBooksQuery,
} = booksApiSlice

// returns the query result object
export const selectBooksResult = booksApiSlice.endpoints.getBooks.select()

// creates memoized selector
const selectBooksData = createSelector(
    selectBooksResult,
    booksResult => booksResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBooks,
    selectById: selectBookById,
    selectIds: selectBookIds
    // Pass in a selector that returns the books slice of state
} = booksAdapter.getSelectors(state => selectBooksData(state) ?? initialState)