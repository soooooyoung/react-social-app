import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload/interface";
import { UploadRequestOption } from "rc-upload/lib/interface";

interface Props {
  icon?: React.ReactNode;
  fileList?: Array<any>;
  onUpload: (option: UploadRequestOption<any>) => void;
  onRemove?: (file: UploadFile<any> | RcFile) => void;
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void;
}

export const FileUploader = (props: Props) => {
  const onUpload = (option: UploadRequestOption<any>) => {
    props.onUpload(option);
  };

  const onRemove = (file: UploadFile<any> | RcFile) => {
    if (props.onRemove) props.onRemove(file);
  };

  const onChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile<any>>
  ) => {
    if (props.onChange) props.onChange(info);
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

  const uploadProps: UploadProps = {
    customRequest: onUpload,
    onRemove,
    onChange,

    fileList: props.fileList ?? [],
  };

  return (
    <ImgCrop rotate>
      <Upload {...uploadProps}>{props.icon ?? <a>Upload</a>}</Upload>
    </ImgCrop>
  );
};
