import chatbotIcon from "@/features/market/assets/chatbot.png";

const ChatBotIntro = () => (
  <>
    <div className="flex justify-center pt-[60px]">
      <img src={chatbotIcon} alt="장이" className="w-[79px] h-[87px]" />
    </div>
    <div className="flex justify-center text-subtitle1 font-semibold mt-[20px] mb-[40px]">
      시장에 대해 궁금한 게 있으신가요?
    </div>
    <div className="flex flex-col gap-[12px] mb-[40px]">
      <div className="flex items-center gap-2">
        <img src={chatbotIcon} alt="장이" className="w-[28px] h-[31px]" />
        <span className="text-body2 text-subtext">장이</span>
      </div>

      <div className="flex flex-col gap-2 ml-[20px]">
        <div className="bg-chatbot text-black px-4 py-2 rounded-2xl text-body1 w-fit">
          안녕하세요, 저는 장이에요!
        </div>
        <div className="bg-chatbot text-black px-4 py-2 rounded-2xl text-body1 w-fit">
          시장에 대해 궁금한 게 있나요?
        </div>
        <div className="bg-chatbot text-black px-4 py-2 rounded-2xl text-body1 w-fit">
          제가 하나하나 다 알려드릴게요!
        </div>
      </div>
    </div>
  </>
);

export default ChatBotIntro;
