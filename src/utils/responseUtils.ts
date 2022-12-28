import { AxiosResponse } from "axios";
import { Modal } from "antd";

export const responseHandler = async <T>(
  raw: AxiosResponse<T>
): Promise<T | void> => {
  return Promise.resolve(raw as T);
};

export const showErrorModal = (message?: string) => {
  if (message === undefined) {
    Modal.error({ title: "ERROR" });
    return;
  }
  Modal.error({ title: message });
};
