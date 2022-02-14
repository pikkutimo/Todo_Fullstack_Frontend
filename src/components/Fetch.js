import React, { useEffect, useState } from "react"

const UsingFetch = () => {
  const [todos, setTodos] = useState([])

  const fetchData = () => {
    fetch("https://rocky-harbor-47876.herokuapp.com/api/todos")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTodos(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {todos.length > 0 && (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UsingFetch