import { Radio, RadioChangeEvent } from "antd";
import React, { CSSProperties } from "react";

interface Options {
  label: React.ReactElement;
  value: string | number;
}

interface Props {
  options: Options[];
  style?: CSSProperties;
  value?: string | number;
  onSelect: (value: string | number) => void;
}

export const Selector = ({ style, options, onSelect, value }: Props) => {
  const handleSelect = (e: RadioChangeEvent) => {
    onSelect(e.target.value);
  };

  return (
    <div className="Selector" style={style}>
      <Radio.Group value={value} onChange={handleSelect}>
        {options.map((item, idx) => (
          <Radio.Button key={idx} value={item.value}>
            {item.label}
          </Radio.Button>
        ))}{" "}
      </Radio.Group>
    </div>
  );
};
