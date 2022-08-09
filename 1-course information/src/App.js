// ejercicios 1.3-1.5

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name:'Fundamentals of React',
        exercises: 10
      },
      {
        name:'Using props to pass data',
        exercises: 7
      },
      {
        name:'State of a component',
        exercises: 14
      }
  ]}
  

  const Header = ({course}) => {
    return <h1>{course.name}</h1>;
  }

  const Part = ({part, exercises}) => <p>{part} {exercises}</p>;

  const Content = ({parts}) => {
    return <div>
      <Part part={parts.parts[0].name} exercises={parts.parts[0].exercises} />
      <Part part={parts.parts[1].name} exercises={parts.parts[1].exercises} />
      <Part part={parts.parts[2].name} exercises={parts.parts[2].exercises} />
    </div>;
  }

  const Total = ({parts}) => <p>Number of Exercises: {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}</p>;

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App
