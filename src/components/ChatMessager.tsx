import { MessageOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ChangeEvent, useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  addressee?: string;
}

export const ChatMessager = ({ socket, addressee }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Create new message to send to server
   */
  const handleSendMessage = () => {
    if (inputValue !== undefined && inputValue.replace(/\s/g, "").length > 0)
      socket.emit("save", { message: inputValue, addressee });

    setInputValue("");
  };

  const handleFailMessage = () => {
    // alert user
    // enable try again prompt
  };

  return (
    <Input
      disabled={!socket.connected}
      maxLength={200}
      onPressEnter={handleSendMessage}
      value={inputValue}
      onChange={handleChangeInputValue}
      suffix={
        <MessageOutlined className="ui-icon" onClick={handleSendMessage} />
      }
    />
  );
};
