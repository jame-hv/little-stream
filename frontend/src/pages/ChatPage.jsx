import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import ChatLoader from "../components/ChatLoader";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CallButton from "./../components/CallButton";
import { StreamChat } from "stream-chat";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import toast from "react-hot-toast";
// Import the Stream Chat CSS first (important for override order)
import "stream-chat-react/dist/css/v2/index.css";
// Import our custom styles
import "../styles/ChatStyles.css";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuth();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) {
        return;
      }
      console.log(authUser);

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePicture,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        // 1 to 1 directly messaging channel
        const currectChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currectChannel.watch();

        setChatClient(client);
        setChannel(currectChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    // Handle video call logic here
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ChatLoader />
      </div>
    );
  }

  return (
    <div className="h-[93vh] chat-container">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
