import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";

const modalDefaultStyle: React.CSSProperties = {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 9999,
    background: "rgba(0,0,0, 0.7)"
}

const modalWindowStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
}

function ModalPortal({children} : any) {
    const modalArea = document.getElementById('modal')!; // 원래 root로 가던 아이를 modal로 보낼 수 있음
    return createPortal(children, modalArea);
}

const ConfirmModal = function(props: any) {
    const { title, content, handleModalClose, positiveLabel = "Yes", negativeLabel = "No" } = props

    return (
        /* 모달 외부 영역을 클릭 했을 때, 모달이 종료될 수 있도록 click 이벤트 설정 가능 */
        // <div style={modalDefaultStyle} className="alert-modal" onClick={() => handleModalClose("negative")}>
        <div className="alert-modal" style={{...modalDefaultStyle }}>
            {/* alert-modal 내부의 요소에 대해서 click 이벤트가 발생해도 더 이상 상위 요소로 이벤트가 버블링되지 않도록 stopPropagation 호출 */}
            <div style={{...modalWindowStyle, backgroundColor: "white", width : 400, padding: 50}} onClick={(e) => e.stopPropagation()}>
                <h1>{title}</h1>
                <p>{content}</p>
                <button onClick={() => handleModalClose("positive")}>{positiveLabel}</button>
                <button onClick={() => handleModalClose("negative")}>{negativeLabel}</button>
            </div>
        </div>
    )
}

const LoadingScreen = function() {
    return (
        <div style={modalDefaultStyle}>
            <div style={modalWindowStyle}>
                <img src="https://images.digi.com/loading.gif" />
            </div>
        </div>
    ) 
}


function App() {
    const [state, setState] = useState({
        showModal: false,
        showLoading: false
    })

    const handleModalClose = (value: any) => {
        alert(value)
        setState(prev => ({ ...prev, showModal: false }))
    }
    
    return ( // 논리적 위치와 물리적 위치를 바꿈
    <div>
        <button onClick={() => setState(prev => ({...prev, showModal: !prev.showModal}))}>
            모달 보여주기
        </button>

        <button onClick={() => {
            setState(prev => ({ ...prev, showLoading: true }))
            setTimeout(() => {
                setState(prev => ({ ...prev, showLoading: false }))
            }, 2000)
        }}>데이터 불러오기</button>
        {
            state.showLoading &&
                <ModalPortal>
                    <LoadingScreen />
                </ModalPortal>
        }
        {
            state.showModal &&
                <ModalPortal>
                    <ConfirmModal title="Hello" content="Content" handleModalClose={handleModalClose} />
                </ModalPortal>
        }
    </div>

)
}

createRoot(document.getElementById('root')!).render(<App />)