import {
  GearIcon,
  MonitorPlayIcon,
  PlanetIcon,
  PresentationChartIcon,
  StackIcon,
} from "@phosphor-icons/react";

import { AppShell } from "@/components/eridanus/app-shell";
import {
  FactLine,
  Facts,
  Page,
  PageHeader,
  Section,
  StatStrip,
} from "@/components/eridanus/page-layout";
import { Time } from "@/components/eridanus/time";
import { ToneBadge } from "@/components/eridanus/tone-badge";
import { Button } from "@/components/ui/button";

const NAV = [
  {
    items: [
      { href: "/runs", label: "运行记录", icon: <MonitorPlayIcon /> },
      { href: "/flows", label: "工作流", icon: <StackIcon />, active: true },
      { href: "/metrics", label: "监控", icon: <PresentationChartIcon /> },
      { href: "/settings", label: "设置", icon: <GearIcon /> },
    ],
  },
];

const CREATED = new Date(Date.now() - 90 * 24 * 60 * 60_000);

export default function PageLayoutDemo() {
  return (
    // A page as it sits in an app: the docs frame the shell in a box, which
    // the transform makes the containing block for the sidebar's panel.
    <div className="h-[40rem] w-full transform-gpu overflow-hidden rounded-lg border in-data-fullscreen:h-full [&_[data-slot=sidebar-container]]:h-full">
      <AppShell
        className="h-full"
        brand={{ name: "运营台", logo: <PlanetIcon weight="fill" /> }}
        nav={NAV}
        // eslint-disable-next-line jsx-a11y/anchor-has-content -- the shell renders the label into it
        renderLink={(href) => <a href={href} />}
        account={{ name: "Avery Lin", email: "lin@example.com" }}
      >
        <Page>
          <PageHeader
            title="订单同步"
            badges={
              <>
                <ToneBadge tone="success">启用</ToneBadge>
                <ToneBadge tone="outline">生产</ToneBadge>
              </>
            }
            actions={<Button size="sm">立即同步</Button>}
            meta={
              <FactLine>
                <span className="font-mono">order_sync</span>
                <span>
                  创建于 <Time value={CREATED} />
                </span>
                <span>3 个管理员</span>
              </FactLine>
            }
          />
          <StatStrip
            items={[
              { label: "24 小时运行", value: "12,840" },
              {
                label: "失败率",
                value: "0.7%",
                tone: "danger",
                hint: "96 次失败",
              },
              { label: "在途", value: "37", hint: "上限 200" },
              { label: "队列积压", value: "12", tone: "warning" },
            ]}
          />
          <Section
            title="配置"
            description="只有项目管理员能修改。"
            actions={
              <Button size="sm" variant="secondary">
                编辑配置
              </Button>
            }
          >
            <Facts
              items={[
                { label: "项目 ID", value: "prj_7f3a9c" },
                { label: "在途上限", value: "200" },
                {
                  label: "回调地址",
                  value: "https://orders.example.com/api/workflow",
                  wide: true,
                },
              ]}
            />
          </Section>
        </Page>
      </AppShell>
    </div>
  );
}
