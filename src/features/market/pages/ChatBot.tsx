import { useState, useRef, useEffect } from "react";
import Header from "@/shared/components/Header";
import chatbotIcon from "@/features/market/assets/chatbot.png";
import ChatBotIntro from "@/features/market/components/ChatBotIntro";
import { sendChat } from "@/features/market/api/chatApi";

const ChatBot = () => {
  const [messages, setMessages] = useState<
    { type: "user" | "bot"; text: string }[]
  >([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input } as const;
    const loadingMessage = {
      type: "bot",
      text: "답변 준비 중입니다...",
    } as const;

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChat({ question: input });

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: res.data.answer },
      ]);
    } catch (error) {
      console.error("챗봇 API 실패:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: "죄송합니다. 답변에 실패했어요!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[93vh] px-[16px] ">
      <Header title="챗봇" showBack={false} showClose={true} />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 ">
        <ChatBotIntro />

        {messages.length === 0 && (
          <div className="mb-4">
            <p className="text-body2 text-subtext mb-2">예시 질문:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "망원시장은 뭐가 맛있어?",
                "부평깡통시장 화장실 있어?",
                "광장시장 영업시간 알려줘!",
              ].map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(example)}
                  className="px-3 py-1 bg-chatbot text-body2 rounded-full hover:bg-gray-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-[20px]">
          {messages.map((msg, idx) =>
            msg.type === "user" ? (
              <div key={idx} className="flex justify-end">
                <div className="bg-primary text-white px-4 py-2 rounded-2xl text-body1 max-w-[75%] whitespace-pre-wrap break-words mt-[5px]">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={idx} className="flex flex-col gap-2 mt-[-25px]">
                <div className="flex items-center gap-2">
                  <img
                    src={chatbotIcon}
                    alt="장이"
                    className="w-[28px] h-[31px]"
                  />
                  <span className="text-body2 text-subtext ">장이</span>
                </div>
                <div className="ml-[20px] bg-chatbot text-black px-4 py-2 rounded-2xl text-body1 w-fit max-w-[75%] whitespace-pre-wrap break-words">
                  {msg.text}
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex m-[16px] gap-2 pb-[20px]">
        <input
          className="flex-1 bg-chatbot rounded-full px-[15px] py-[10px] text-body1"
          placeholder="메시지를 입력해주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !loading) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`px-4 py-2 rounded-full text-body1 ${
            !input.trim() || loading
              ? "bg-deactivate text-deactivate-text cursor-not-allowed"
              : "bg-primary text-white"
          }`}
        >
          {loading ? "■" : "전송"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
