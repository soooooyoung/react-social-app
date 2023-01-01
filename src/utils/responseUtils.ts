import { AxiosResponse } from "axios";
import { Modal } from "antd";

export const responseHandler = async <T>(
  raw: AxiosResponse<T>
): Promise<T | void> => {
  return Promise.resolve(raw as T);
};

export const showErrorModal = (title?: string, content?: string) => {
  if (title === undefined) {
    Modal.error({ title: "ERROR" });
    return;
  }
  Modal.error({ title, content });
};
