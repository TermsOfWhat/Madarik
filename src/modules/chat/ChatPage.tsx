import ChatInput from "./components/ChatInput/ChatInput";
import gridlayout from "./assets/gridlayout.png";

function ChatPage() {
  return (
    <>
      <div className="chat-page-wrapper">
        <div className="chat-page">
          <h1>Welcome to Your Learning Journey</h1>
          <h2>
            Tell me what you want to learn, and I'll create a personalized
            learning path for you.
          </h2>
          <ChatInput />
        </div>

        <img className="gridlayout" src={gridlayout} alt="gridlayout" />
      </div>
    </>
  );
}

export default ChatPage;
