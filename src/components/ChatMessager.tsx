import { Input } from "antd";
import { ChangeEvent, useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

export const ChatMessager = ({ socket }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Create new message to send to server
   */
  const handleSendMessage = () => {
    socket.emit("save", inputValue);
    setInputValue("");
  };

  const handleFailMessage = () => {
    // alert user
    // enable try again prompt
  };

  return (
    <div>
      <Input
        maxLength={200}
        onPressEnter={handleSendMessage}
        value={inputValue}
        onChange={handleChangeInputValue}
      />
    </div>
  );
};
