

function Heading({tagName: Tag, level, children}) {
  
  const levels = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-semibold',
    3: 'text-xl font-semibold',
    4: 'text-lg font-medium'
  }

  return (
    <Tag className={`${levels[level]}`}> {children} </Tag>
  )
}

export default Heading