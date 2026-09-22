import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [memos, setMemos] = useState([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("loading");   // loading | ready | error

  useEffect(() => { loadMemos(); }, []);   // 처음 뜰 때 서버에서 목록을 불러온다

  const loadMemos = async () => {
    try {
      const res = await fetch(`${API_URL}/memos`);   // 목록 조회 GET
      if (!res.ok) throw new Error(res.status);
      setMemos(await res.json());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };
  const addMemo = async () => {
    if (!text.trim()) return;
    await fetch(`${API_URL}/memos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),   // JS 객체 → JSON 문자열
    });
    setText(""); loadMemos();
  };
  const deleteMemo = async (id) => {
    await fetch(`${API_URL}/memos/${id}`, { method: "DELETE" });
    loadMemos();
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>📝 메모장</h1>
      <p><a href="/intro.html">← 개인 소개 페이지로 돌아가기</a></p>

      {/* 무료 플랜 백엔드는 쉬고 있다가 깨어나므로 첫 응답이 느릴 수 있다 */}
      {status === "loading" && (
        <p style={{ color: "#666" }}>
          서버를 깨우는 중입니다… 처음 접속이면 최대 1분 걸릴 수 있어요.
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "#b00" }}>
          서버에 연결하지 못했습니다.{" "}
          <button onClick={() => { setStatus("loading"); loadMemos(); }}>다시 시도</button>
        </p>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)}
          placeholder="메모를 입력하세요" style={{ flex: 1, padding: 8 }} />
        <button onClick={addMemo} disabled={status !== "ready"}>추가</button>
      </div>
      <ul>
        {memos.map((m) => (
          <li key={m.id}>
            {m.content}
            <button onClick={() => deleteMemo(m.id)} style={{ marginLeft: 8 }}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
