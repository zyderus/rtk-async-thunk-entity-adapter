import { useState } from 'react'
import './App.css'

const users = [
  { id: '1', name: 'Rustam' },
  { id: '2', name: 'Elizabeth' },
  { id: '3', name: 'Victoria' },
]

function App() {
  const [allUsers, setAllUsers] = useState(users)
  const [filteredData, setFilteredData] = useState(allUsers)

  const handleSearch = e => {
    let value = e.target.value.toLowerCase()
    let result = []

    result = allUsers.filter(user => user.name.toLowerCase().includes(value))
    setFilteredData(result)
  }

  return (
    <div className='App'>
      <label>Search:</label>
      <input type='text' onChange={handleSearch} />
      <ul>
        {filteredData.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
