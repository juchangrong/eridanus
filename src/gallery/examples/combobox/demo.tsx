import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const projects = [
  "数据平台",
  "推荐服务",
  "搜索索引",
  "支付网关",
  "消息队列",
  "日志采集",
];

export default function ComboboxDemo() {
  return (
    <Combobox items={projects}>
      <ComboboxInput
        placeholder="搜索项目"
        aria-label="项目"
        className="w-56"
      />
      <ComboboxContent>
        <ComboboxEmpty>没有匹配的项目</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
