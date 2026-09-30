import { GithubLogoIcon, ListIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { entryByName, REPOSITORY } from "./catalog";
import { SidebarNav } from "./components/sidebar-nav";
import { ThemeSwitch } from "./components/theme-switch";
import "./gallery.css";
import { DocPage } from "./pages/doc-page";
import { Home } from "./pages/home";
import { docHref, useRoute } from "./router";

/** A new page starts at the top with focus on its title, as a page load would. */
function usePageChange(route: string | undefined, title: string) {
  useEffect(() => {
    document.title = route ? `${title} · Eridanus` : "Eridanus";
    window.scrollTo(0, 0);
    document.getElementById("page-title")?.focus({ preventScroll: true });
  }, [route, title]);
}

function MobileNav({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label="打开目录"
          />
        }
      >
        <ListIcon />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 gap-0 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>目录</SheetTitle>
        </SheetHeader>
        <nav aria-label="文档目录" className="px-4 pb-8">
          <SidebarNav current={current} onNavigate={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function App() {
  const route = useRoute();
  const entry = route ? entryByName.get(route) : undefined;
  usePageChange(route, entry?.title ?? "");

  return (
    <>
      {/* A button, not a #main link: the hash holds the route. */}
      <button
        type="button"
        onClick={() => document.getElementById("main")?.focus()}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow-md"
      >
        跳到正文
      </button>
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-2 px-4 sm:px-6">
          <MobileNav current={route} />
          <a
            href={docHref()}
            className="font-heading font-semibold tracking-tight"
          >
            Eridanus
          </a>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Base UI 上的 shadcn 组件库
          </span>
          <div className="ms-auto flex items-center gap-2">
            <ThemeSwitch />
            <Button
              variant="ghost"
              size="icon-sm"
              nativeButton={false}
              render={
                <a
                  href={`https://github.com/${REPOSITORY}`}
                  aria-label="GitHub 仓库"
                  title="GitHub 仓库"
                />
              }
            >
              <GithubLogoIcon />
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav
          aria-label="文档目录"
          className="sticky top-14 hidden max-h-[calc(100svh-3.5rem)] self-start overflow-y-auto py-8 pe-2 lg:block"
        >
          <SidebarNav current={route} />
        </nav>
        <main id="main" tabIndex={-1} className="min-w-0 py-8 outline-none">
          {route && !entry ? (
            <div className="flex flex-col gap-3 py-16">
              <h1
                id="page-title"
                tabIndex={-1}
                className="m-0 font-heading text-2xl font-semibold outline-none"
              >
                没有这个页面
              </h1>
              <p className="m-0 text-muted-foreground">
                <a href={docHref()} className="underline underline-offset-4">
                  回到首页
                </a>
                ，从目录里找找。
              </p>
            </div>
          ) : entry ? (
            <DocPage key={entry.name} entry={entry} />
          ) : (
            <Home />
          )}
        </main>
      </div>
    </>
  );
}
