

function Heading({tagName: Tag, level, children, className}) {
  
  const levels = {
    1: 'text-3xl font-bold text-center',
    2: 'text-2xl font-semibold text-center',
    3: 'text-xl font-semibold text-center',
    4: 'text-lg font-medium text-center'
  }

  return (
    <Tag className={`${levels[level]} ${className}`}> {children} </Tag>
  )
}

export default Heading