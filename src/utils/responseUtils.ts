import { AxiosResponse } from "axios";
import { Modal } from "antd";

export const responseHandler = async <T>(
  raw: AxiosResponse<T>
): Promise<T | void> => {
  return Promise.resolve(raw as T);
};

export const showErrorModal = (error: Error) => {
  Modal.error({ title: error.message });
};
