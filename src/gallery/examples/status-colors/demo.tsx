const TOKENS = [
  {
    token: "success",
    ink: "text-success",
    tint: "bg-success/10 dark:bg-success/20",
    sample: "已完成 12,840",
  },
  {
    token: "warning",
    ink: "text-warning",
    tint: "bg-warning/10 dark:bg-warning/20",
    sample: "队列积压 168",
  },
  {
    token: "info",
    ink: "text-info",
    tint: "bg-info/10 dark:bg-info/20",
    sample: "运行中 37",
  },
  {
    token: "destructive",
    ink: "text-destructive",
    tint: "bg-destructive/10 dark:bg-destructive/20",
    sample: "失败率 2.7%",
  },
];

export default function StatusColorsDemo() {
  return (
    <div className="grid grid-cols-[auto_auto_auto] items-center gap-x-6 gap-y-3 text-sm">
      {TOKENS.map(({ token, ink, tint, sample }) => (
        <div key={token} className="contents">
          <span className="font-mono text-[13px] text-muted-foreground">
            {token}
          </span>
          <span className={`font-medium ${ink}`}>{sample}</span>
          <span
            className={`w-fit rounded-md px-2 py-0.5 text-xs font-medium ${ink} ${tint}`}
          >
            {sample}
          </span>
        </div>
      ))}
    </div>
  );
}
