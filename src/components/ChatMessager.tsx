import { Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

export const ChatMessager = ({ socket }: Props) => {
  /**
   * Create new message to send to server
   * @param message message property of new chat log
   */
  const handleSendMessage = (message: string) => {
    socket.emit("save", message);
  };

  const handleFailMessage = () => {
    // alert user
    // enable try again prompt
  };
  return (
    <div>
      <button onClick={() => handleSendMessage("fff")}>test</button>
      <TextArea maxLength={200} />
    </div>
  );
};
