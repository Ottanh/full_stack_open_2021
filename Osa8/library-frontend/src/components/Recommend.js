import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

const Recommend = ({ show }) => {
  const user = useQuery(ME)
  const books = useQuery(ALL_BOOKS, {
    variables: {genre: user.loading  ? undefined : user.data.me.favoriteGenre}
  })

  if (!show) {
    return null
  }

  if(user.loading) {
    <div>
      heioo
    </div>
  }

  if (user.loading || books.loading )  {
    console.log(user.data)
    return (
    <div>
      <h2>recommendations</h2>
      loading...
    </div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>
      your favorite genre <b>{user.data.me.favoriteGenre}</b>
      <BookTable books={ books.data.allBooks } />
    </div>
  )
}

export default Recommend