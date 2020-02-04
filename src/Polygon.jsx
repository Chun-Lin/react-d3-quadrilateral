import React from 'react'
import * as d3 from 'd3'

const Polygon = () => {
  const [coords, setCoords] = React.useState([])
  const [pathD, setPathD] = React.useState('')

  const hull = React.useMemo(
    () => (coords.length >= 3 ? [...d3.polygonHull(coords)] : coords),
    [coords],
  )
  console.log('LOG: Polygon -> hull', hull)

  React.useEffect(() => {
    const path = d3.path()
    coords.length !== 0 &&
      hull.forEach(([x, y], index) => {
        index === 0 ? path.moveTo(x, y) : path.lineTo(x, y)
      })
    path.closePath()
    setPathD(path)
  }, [coords, hull, setPathD])

  return (
    <svg
      width="500"
      height="500"
      style={{ background: 'lightgrey' }}
      onMouseDown={e =>
        coords.length < 4 &&
        setCoords([...coords, [e.nativeEvent.offsetX, e.nativeEvent.offsetY]])
      }
    >
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="green" />
      ))}
      <path d={pathD} fill="red" stroke="black" opacity="0.5" />
    </svg>
  )
}

export default Polygon
