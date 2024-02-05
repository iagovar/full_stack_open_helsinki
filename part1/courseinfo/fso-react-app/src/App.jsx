import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

const App = () => {

  const course = 'Half Stack application development'
  const coursesList = [
    {
      "name": 'Fundamentals of React',
      "id": 1,
      "exercises": 10,
    },
    {
      "name": 'Using props to pass data',
      "id": 2,
      "exercises": 7
    },
    {
      "name": 'State of a component',
      "id": 3,
      "exercises": 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content coursesList={coursesList} />
      <Total coursesList={coursesList} />
    </div>
  )
}

export default App