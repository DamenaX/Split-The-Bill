import { Children } from "react"

function Heading({tagName: Tag, level}) {
    
  const levels = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-semibold',
    3: 'text-xl font-semibold',
    4: 'text-lg font-medium'
  }

  return (
    <Tag className={`${base} ${levels[level]}`}> {Children} </Tag>
  )
}

export default Heading