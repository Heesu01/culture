import { useState, useRef, useEffect } from "react";
import Header from "@/shared/components/Header";
import chatbotIcon from "@/features/market/assets/chatbot.png";
import ChatBotIntro from "@/features/market/components/ChatBotIntro";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { type: "user", text: "망원시장은 뭐가 맛있어?" },
    {
      type: "bot",
      text: "망원시장은 떡볶이가 유명해요! 기름떡볶이도 맛있고요!",
    },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { type: "user", text: input },
      { type: "bot", text: `(${input})에 대한 답변을 준비 중이에요!` },
    ];

    setMessages(newMessages);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen px-[16px]">
      <Header title="챗봇" showBack={false} showClose={true} />

      <div className="flex-1 overflow-y-auto px-4 ">
        <ChatBotIntro />
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

      <div className="flex m-[16px] gap-2 pb-[71px]">
        <input
          className="flex-1 bg-chatbot rounded-full px-[15px] py-[10px] text-body1"
          placeholder="메시지를 입력해주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className={`px-4 py-2 rounded-full text-body1 ${
            !input.trim()
              ? "bg-deactivate text-deactivate-text cursor-not-allowed"
              : "bg-primary text-white"
          }`}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
