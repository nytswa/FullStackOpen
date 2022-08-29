const Header = ({name}) => <h3>{name}</h3>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Sum = ({sum}) => <p><strong>total of {sum} exercises</strong></p>


const Content = ({parts}) => {
  const totals = parts.reduce((previous, next) => previous + next.exercises, 0);
  return <div>
    {parts.map(part => {
      return <Part key={part.id} part={part}></Part>
    })}
    <Sum sum={totals}></Sum>
  </div>
}

const Course = ({course}) => {
  return <div>
    <Header name={course.name}></Header>
    <Content parts={course.parts}></Content>
  </div>
}


export default Course