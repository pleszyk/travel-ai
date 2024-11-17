import { LuRefreshCcw } from 'react-icons/lu'
import { TbSend } from 'react-icons/tb'
import ChatMessage from './ChatMessage'
import useChatLogic from './useChatLogic'
import { useState } from 'react'
import { FaArrowUpFromBracket } from 'react-icons/fa6'

function Chat() {
  const { chatContainer, input, chatLog, setInput, clearChat, handleSubmit } =
    useChatLogic()

  const [collapse, setCollapse] = useState<boolean>(false)

  // useEffect(() => {
  //   if (chatContainer?.current) {
  //     chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  //   }
  // }, [chatLog, collapse]);


  return (
    <>
        <div className="m-2">
          {/* <div className="border-t-2 border-gray-500 px-4 pt-4 mb-2 sm:mb-0"> */}
          <div className="relative gap-2 flex">
            <form onSubmit={handleSubmit} className="w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Find a destination"
                className="w-full focus:outline-none shadow-xl focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-1"
              />
            </form>

            <div className="shadow-xl items-center">
              <button
                onClick={handleSubmit}
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-2 py-1 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold pr-2">Send</span>
                <TbSend size={15} />
              </button>
            </div>
            <button className="flex bg-gray-200 justify-center items-center w-24 border py-1 px-2 rounded-lg"
                    onClick={() => setCollapse(prev => !prev)}>
              {!collapse && <FaArrowUpFromBracket className="rotate-180" />}
              {collapse && <FaArrowUpFromBracket />}
            </button>
          </div>


          {collapse && (
            <>
              <div className="absolute right-0 items-center pt-4 space-x-2 justify-end">
                <button
                  onClick={clearChat}
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border h-6 w-6 transition duration-500 ease-in-out text-white hover:bg-gray-300 focus:outline-none"
                >
                  <LuRefreshCcw size={15} />
                </button>
              </div>
              <div
                ref={chatContainer}
                id="messages"
                className="flex flex-col mt-4 space-y-4 h-44 overflow-y-auto scrollbar-thumb-blue transition scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              >
                {chatLog.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
            </>
          )}
        </div>
      {/* <Cards locationData={locationData} /> */}
    </>
  )
}

export default Chat
