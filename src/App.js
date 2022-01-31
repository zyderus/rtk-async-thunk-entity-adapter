import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { actions, selectors } from './redux/userSlice'

function App() {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.userId)
  const user = useSelector(state => state.user.user)
  const comments = useSelector(selectors.selectAll)

  const handleAddComment = () => {
    const comment = {
      postId: 5,
      id: 312,
      name: ' dfklsdjkls djkl sjdjklsdjksdjkfsdhshdh sdf',
      email: 'bla@marques.me',
      body: 'dsadfasdicabo\ncommodi odio ratione nesciunt\nvoluptate doloremque est\nnam autem error delectus',
    }

    dispatch(actions.addComment(comment))
  }

  const handleGetUserAndComments = () => {
    dispatch(actions.getUserAndComments())
  }

  return (
    <div className='App'>
      {console.log('userId:', userId)}
      {console.log('user:', user)}
      {console.log('comments:', comments)}

      <h1>Hey ninja</h1>

      <button onClick={handleAddComment}>add comment</button>
      <br />
      <button onClick={handleGetUserAndComments}> get user and comments </button>
      <h3>List</h3>
      <ul>
        {comments.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
