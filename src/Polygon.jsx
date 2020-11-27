import React, { useState, useRef, useEffect, useMemo } from 'react'
import * as d3 from 'd3'

const Polygon = () => {
  const [coords, setCoords] = useState([])
  const [pathD, setPathD] = useState('')

  const svgRef = useRef(null)
  const indexRef = useRef(null)

  const vertexHandleMouseMove = event => {
    let newPosX = event.offsetX
    let newPosY = event.offsetY

    const newCoords = [...coords]

    newCoords[indexRef.current] = [newPosX, newPosY]
    setCoords(newCoords)
  }

  const vertexHandleMouseUp = () => {
    document.removeEventListener('mouseup', vertexHandleMouseUp)
    document.removeEventListener('mousemove', vertexHandleMouseMove)
  }

  const vertexHandleMouseDown = () => {
    document.addEventListener('mouseup', vertexHandleMouseUp)
    document.addEventListener('mousemove', vertexHandleMouseMove)
  }

  useEffect(() => {
    const path = d3.path()
    coords.length !== 0 &&
      coords.forEach(([x, y], index) => {
        index === 0 ? path.moveTo(x, y) : path.lineTo(x, y)
      })
    path.closePath()
    setPathD(path)
  }, [coords, setPathD])

  return (
    <svg
      width="500"
      height="500"
      style={{ background: 'lightgrey' }}
      onMouseDown={e =>
        coords.length < 4 &&
        setCoords([...coords, [e.nativeEvent.offsetX, e.nativeEvent.offsetY]])
      }
      ref={svgRef}
    >
      <path d={pathD} fill="red" stroke="black" opacity="0.5" />
      {coords.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r="15"
          fill="green"
          onMouseDown={e => {
            vertexHandleMouseDown(e)
            indexRef.current = index
          }}
        />
      ))}
    </svg>
  )
}

export default Polygon
