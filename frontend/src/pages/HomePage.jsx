

import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-[5.5rem] px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="h-full flex rounded-lg overflow-hidden">
            {/* Sidebar */}
            <div
              className={`transition-all duration-300 ${
                selectedUser ? "hidden sm:block " : "block"
              } w-full xl:w-72 lg:w-[18rem] sm:w-20`}
            >
              <Sidebar />
            </div>

            {/* Main Content */}
            {!selectedUser ? (
              <NoChatSelected className="hidden" />
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
