
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

import { useEffect, useRef, useState } from "react";



const ChatBox = () => {
  
  const [message, setMessage] = useState("");
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        message: {
          senderId: auth.user?.id,
          projectId: id,
          content: message,
        },
        sendToServer: sendMessageToServer,
      })
    );
    setMessage("");
  };

  
  
  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {/* <div>
            <p className="py-2 px-5 border rounded-se-xl rounded-s-xl">you message</p>
          </div> */}

          {/* {chat.messages? */}
          
          {/* {[1,1,1,1].map((item, i) =>
            item.sender.id == auth.user.id  */}
            1 ? (
              <div
                // ref={chatContainerRef}
                // key={item}
                className="flex gap-2 mb-2"
              >
                <Avatar>
                  <AvatarFallback>
                    {/* {item.sender.fullName[0]} */}
                    </AvatarFallback>
                </Avatar>
                <div
                  className={`space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl`}
                >
                  <p>
                    {/* {item.sender?.fullName} */}
                    </p>
                  <p className="text-gray-300">
                    
                    {/* {item.content} */}
                    </p>
                </div>
              </div>
            ) : (
              <div
                // ref={chatContainerRef}
                // key={item}
                className="flex mb-2 gap-2 justify-end "
              >
                <div
                  className={`space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl`}
                >
                  <p>
                    {/* {item.sender?.fullName} */}
                    </p>
                  <p className="text-gray-300">
                    {/* {item.content} */}
                    </p>
                </div>
                <Avatar>
                  <AvatarFallback>
                    {/* {item.sender.fullName[0]} */}
                    </AvatarFallback>
                </Avatar>
              </div>
            )
          {/* )} */}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            value={message}
            onChange={handleMessageChange}
            placeholder="type message..."
            className="py-7 border-t outline-none  focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
