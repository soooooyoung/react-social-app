import { AxiosResponse } from "axios";
import { Modal } from "antd";

export const responseHandler = async <T>(
  raw: AxiosResponse<T>
): Promise<T | void> => {
  return Promise.resolve(raw as T);
};

export const showErrorModal = (error?: Error) => {
  if (error === undefined) {
    Modal.error({ title: "ERROR" });
    return;
  }
  Modal.error({ title: error.message });
};
