import { useGetBooksQuery } from "./booksApiSlice"
import Book from "./Book"

const BooksList = () => {
    const {
        data: books,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBooksQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = books

        const tableContent = ids?.length
            ? ids.map(bookId => <Book key={bookId} bookId={bookId} />)
            : null

        content = (
            <table className="table table--books">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th book__status">Status</th>
                        <th scope="col" className="table__th book__title">Title</th>
                        <th scope="col" className="table__th book__username">Owner</th>
                        <th scope="col" className="table__th book__created">Created</th>
                        <th scope="col" className="table__th book__updated">Updated</th>
                        <th scope="col" className="table__th book__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default BooksList