import { useState, type ReactNode } from 'react'

type testState = "ready" | "start" | "test" | "end";
type TestRecord = {
    start : number | null;
    end: number | null;
}

const DEACTIVE_COLOR = "red";
const ACTIVE_COLOR = "green";

type TypeColor = typeof DEACTIVE_COLOR | typeof ACTIVE_COLOR;

const colorByState: Record<testState, TypeColor> = {
    ready: DEACTIVE_COLOR,
    start: DEACTIVE_COLOR,
    test: ACTIVE_COLOR,
    end: DEACTIVE_COLOR
}

const defaultStyle: React.CSSProperties = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: DEACTIVE_COLOR,
    display: "flex",
    justifyContent: "center",
    color: "white"
}

function App() {
  const [state, setState] = useState<testState>("ready");
    const [record, setRecord] = useState<TestRecord>({start : null, end: null})
    const color = colorByState[state];

    // JSX.Element하면 태그와 컴포넌트만 저장 가능 JSX.Element는 Nullable이 아님!
    let instruction: ReactNode | null = null;
    let actionButton: ReactNode | null = null;

  if (state === "ready") {
    instruction = <h1>누르면 시작합니다.</h1>
    actionButton = <button style={{...defaultStyle, color: "white", background: color}} onClick={() => {
        setTimeout(() => {
            setState("start");
            setRecord(prev => ({...prev, start: Date.now() }))
        }, 3000)
    }}>시작</button>
  } else if (state == "start") {
    instruction = <h1>준비가 되면 클릭하세요.</h1>
    actionButton = <button onClick={() => {
        setState("test")
    }}>준비 완료</button>
  } else if (state == "test") {
    instruction = <h1>클릭하세요</h1>
    actionButton = <button style={{...defaultStyle, color: "white", background : "green"}} onClick={() => {
        setState("end")
        setRecord(prev => ({...prev, end: Date.now() }))
    }}>클릭</button>
  } else if (state == "end") {
    instruction = <h1>반응속도 : {record.end! - record.start!}ms</h1>
    actionButton = <button onClick={() => setState("ready")}>다시하기</button>
  }

  console.log(record)

    return (
        <div>
            {instruction}
            {actionButton}
        </div>
    )
}

export default App
