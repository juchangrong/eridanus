/**
 * 色调
 * error 用于失败，warning 用于需要留意的限制，默认的 neutral 用于说明。
 */
import { Notice } from "@/components/eridanus/notice";

export default function NoticeTonesExample() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Notice
        tone="error"
        title="保存失败"
        description="服务返回 409：配置已被其他人修改。"
      />
      <Notice
        tone="warning"
        title="一个项目只对应一个环境"
        description="预发、灰度和生产各建一个项目。"
      />
      <Notice description="你可以查看这个项目，但只有管理员能修改设置。" />
    </div>
  );
}
