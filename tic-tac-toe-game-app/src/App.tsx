import { useState, useEffect } from 'react'

type TileType = "x" | "o" | null;
type TileProps = {
  index: number,
  type: TileType,
  onTileClick: (index: number) => void;
}


const boardStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  gap: "10px",
  width: "300px",
  height: "300px",
}

const tileStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "#f0f",
  border: "1px solid #ccc",
  fontSize: "24px",
  fontWeight: "bold",
  cursor: "pointer",
}

const oStyle: React.CSSProperties = {
  color: "white",
  background: "black",
}
const xStyle: React.CSSProperties = {
  color: "black",
  background: "white",
}

function Tile({ index, type, onTileClick} : TileProps) {
  return <button style={{
    ...tileStyle,
    ...(type === null ? {} : (type === 'o' ? oStyle : xStyle))
  }} onClick={() => onTileClick(index)}>{type ?? "-"}</button>
}

  

function App() {
  const [tiles, setTiles] = useState<TileType[]>(Array(9).fill(null))
  const [currentTurn, setCurrentTurn] = useState<Exclude<TileType, null>>("o");
  const [winner, setWinner] = useState<TileType | "draw">(null);

  useEffect(() => {
    const result = checkWinner(tiles);

    if (result) {
      setWinner(result);
    } else {
      if(tiles.every(tile => tile !== null) && winner === null) {
        setWinner("draw");
      }
    }

    
  }, [tiles])

  const changeTurn = () => {
    setCurrentTurn(currentTurn === "x" ? "o" : "x");
  }

  const onTileClick = (index: number) => {
    setWinner(checkWinner(tiles))
    if(tiles[index] === null && winner === null) {
      setTiles(tiles => {
        const newTiles = [...tiles]
        newTiles[index] = currentTurn
        return newTiles
      })
      changeTurn()
    }
  }

  const checkWinner = (tiles: TileType[]): TileType | null => {
    // 가로 3줄 확인
    for (let i = 0; i < 9; i += 3) {
        if (tiles[i] !== null && tiles[i] === tiles[i + 1] && tiles[i] === tiles[i + 2]) {
            return tiles[i]
        }
    }
    // 세로 3줄 확인
    for (let i = 0; i < 3; i++) {
        if (tiles[i] !== null && tiles[i] === tiles[i + 3] && tiles[i] === tiles[i + 6]) {
            return tiles[i]
        }
    }
    // 대각선 (좌상->우하)
    if (tiles[0] !== null && tiles[0] === tiles[4] && tiles[0] === tiles[8]) {
        return tiles[0]
    }
    // 대각선 (우상->좌하)
    if (tiles[2] !== null && tiles[2] === tiles[4] && tiles[2] === tiles[6]) {
        return tiles[2]
    }
    // 승자가 없음
    return null
}

  return (
    <>
    <h1>현재 턴 : {currentTurn}</h1>
  <div style={boardStyle}>
    
    {
      tiles.map((tile, index) => {
        return <Tile index={index} type={tile} onTileClick={onTileClick} />
      })
    }
  </div>
  {winner && (
    winner === "draw" ? <h1>무승부</h1> : <h1>{winner} 승리!</h1>
  )}
  <button onClick={() => {
      setTiles(Array(9).fill(null))
      setWinner(null)
      setCurrentTurn("o");
    }}>다시하기</button>
  </>
  )
}

export default App
