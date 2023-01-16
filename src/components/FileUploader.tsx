import { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { CameraOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useCreateFile } from "../api/file";

interface Props {
  icon?: React.ReactNode;
}

export const FileUploader = ({ icon }: Props) => {
  const { mutateAsync } = useCreateFile("1");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        // action={(file) => {
        //   mutateAsync({ file });
        // }}
        customRequest={(options: UploadRequestOption<any>) => {}}
        // listType="picture-card"
        // fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {icon ?? <a>Upload</a>}
        {/* {fileList.length < 5 && "+ Upload"} */}
      </Upload>
    </ImgCrop>
  );
};
