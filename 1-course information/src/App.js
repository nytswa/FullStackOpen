const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14


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
      <Content p1={part1} e1={exercises1} p2={part2} e2={exercises2} p3={part3} e3={exercises3} />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )
}

export default App
