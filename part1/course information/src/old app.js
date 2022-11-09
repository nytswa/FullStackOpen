// Exercise 1.4 stated that the array should be passed in its entirety, instead of "slicing" it.

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
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
  ]
  

  const Header = ({courseName}) => <h1>{courseName}</h1>;

  const Part = ({part, exercises}) => <p>{part} {exercises}</p>;

  const Content = (props) => {
    return <div>
      <Part part={props.p1} exercises={props.e1} />
      <Part part={props.p2} exercises={props.e2} />
      <Part part={props.p3} exercises={props.e3} />
    </div>;
  }

  const Total = ({ex1, ex2, ex3}) => <p>Number of Exercises: {ex1 + ex2 + ex3}</p>;

  return (
    <div>
      <Header courseName={course} />
      <Content p1={parts[0].name} e1={parts[0].exercises} p2={parts[1].name} e2={parts[1].exercises} p3={parts[2].name} e3={parts[2].exercises} />
      <Total ex1={parts[0].exercises} ex2={parts[1].exercises} ex3={parts[2].exercises} />
    </div>
  )
}

export default App
