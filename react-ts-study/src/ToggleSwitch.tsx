import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function ToggleSwitch(props: { label: string }) {
  const [state, setState] = useState<boolean>(false);
  return (
    <button onClick={() => setState((prev) => !prev)}>
      {props.label} {state ? "ON" : "OFF"}
    </button>
  );
}

const tabDatas: TabMenuType[] = [
  { title: "소개", content: "안녕" },
  { title: "연락처", content: "안녕1" },
  { title: "위치", content: "안녕2" },
];

type TabMenuType = {
  title: string;
  content: string;
};

function TabMenu(props: { tabDatas: TabMenuType[] }) {
  const [tabIdx, setTabIdx] = useState(0);
  const handleTabIdx = (idx: number) => {
    setTabIdx(idx);
  };
  return (
    <div>
      {tabDatas.map((tabData, idx) => {
        return <button onClick={() => setTabIdx(idx)}>{tabData.title}</button>;
      })}
      <p>{tabDatas[tabIdx].content}</p>
    </div>
  );
}

function PasswordStrength(props: { minLength: number }) {
  const [inputedText, setInputedText] = useState("");
  const [show, setShow] = useState(true);
  const [strength, setStrength] = useState<"weak" | "mid" | "strong">("weak");

  useEffect(() => {
    const textLen = inputedText.length;
    if (textLen < props.minLength) setStrength("weak");
    else if (textLen < props.minLength * 1.5) setStrength("mid");
    else setStrength("strong");
  }, [inputedText]);

  return (
    <div>
      <input
        type={show ? "text" : "password"}
        value={inputedText}
        onChange={(e) => setInputedText(e.target.value)}
      />
      {show ? (
        <p
          style={{
            color:
              strength === "weak"
                ? "red"
                : strength === "mid"
                ? "yellow"
                : "green",
          }}
        >
          {inputedText}
        </p>
      ) : (
        <p>{"*".repeat(inputedText.length)}</p>
      )}
      <button onClick={() => setShow((s) => !s)}>
        {show ? "숨기기" : "보여주기"}
      </button>
      <p>
        {inputedText.length} / {props.minLength}
      </p>
    </div>
  );
}

type RatingProps = {
  labels: string[];
};

function RatingStarts({ labels }: RatingProps) {
  const [rate, setRate] = useState(-1);

  return (
    <div>
      {labels.map((_, idx) => {
        return (
          <span onClick={() => setRate(idx)}>{idx <= rate ? "★" : "☆"}</span>
        );
      })}
      <p>{labels[rate]}</p>
    </div>
  );
}

function App() {
  const labels = ["별로예요", "그저그래요", "괜찮아요", "좋아요", "최고예요"];
  return (
    <div>
      <RatingStarts labels={labels} />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
