import {
  DesktopIcon,
  MoonIcon,
  SidebarSimpleIcon,
  SignOutIcon,
  SunIcon,
} from "@phosphor-icons/react";
import {
  cloneElement,
  type ComponentProps,
  type CSSProperties,
  isValidElement,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";

import { useMessages } from "@/components/eridanus/locale-provider";
import { PersonAvatar } from "@/components/eridanus/person-avatar";
import {
  type ThemePreference,
  useTheme,
} from "@/components/eridanus/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import type { Locale } from "@/lib/eridanus/locale";
import { cn } from "@/lib/utils";

/** The product name and mark at the top of the sidebar, a link home. */
export interface AppBrand {
  name: string;
  logo?: ReactNode;
  /** Where the mark links; defaults to "/". */
  href?: string;
}

export interface AppNavItem {
  label: string;
  href: string;
  /** A Phosphor icon element, such as <PlayCircleIcon />, in its outline
   * weight; the current page's icon switches to the fill weight. Collapsed to
   * icons, the sidebar shows only this, with the label in a tooltip. */
  icon?: ReactNode;
  /** The current page. The consumer's router decides; the shell marks it
   * with aria-current. */
  active?: boolean;
  /** A count or short mark on the trailing edge, such as unread items. */
  badge?: ReactNode;
}

export interface AppNavGroup {
  /** Heading over the group; leave it out for the first, main group. */
  title?: string;
  items: AppNavItem[];
}

export interface AppAccount {
  name: string;
  email?: string;
  avatar?: string;
  /** Extra DropdownMenuItem elements above the theme choice, such as a profile link. */
  items?: ReactNode;
  /** Shows a sign-out item at the end of the menu. */
  onSignOut?: () => void;
}

export interface AppShellLabels {
  toggleSidebar: string;
  resizeSidebar: string;
  collapseSidebar: string;
  navigation: string;
  /** The account button's accessible name, given the person's name. */
  account: (name: string) => string;
  theme: string;
  system: string;
  light: string;
  dark: string;
  signOut: string;
}

/** The built-in text in each locale. */
export const appShellLabels: Record<Locale, AppShellLabels> = {
  "zh-CN": {
    toggleSidebar: "切换侧边栏",
    resizeSidebar: "调整侧边栏宽度",
    collapseSidebar: "收起侧边栏",
    navigation: "主导航",
    account: (name) => `账号菜单：${name}`,
    theme: "主题",
    system: "跟随系统",
    light: "浅色",
    dark: "深色",
    signOut: "退出登录",
  },
  "en-US": {
    toggleSidebar: "Toggle sidebar",
    resizeSidebar: "Resize sidebar",
    collapseSidebar: "Collapse sidebar",
    navigation: "Main navigation",
    account: (name) => `Account menu: ${name}`,
    theme: "Theme",
    system: "System",
    light: "Light",
    dark: "Dark",
    signOut: "Sign out",
  },
};

/** shadcn's sidebar writes its open state to the sidebar_state cookie on every
 * toggle but never reads it back; the shell does, so the choice survives a
 * reload. */
function storedOpen(): boolean | undefined {
  if (typeof document === "undefined") return undefined;
  const value = document.cookie.match(/(?:^|;\s*)sidebar_state=(true|false)/);
  return value ? value[1] === "true" : undefined;
}

/** The expanded sidebar's width in pixels: dragged between these, and kept
 * in localStorage across visits. */
const SIDEBAR_WIDTH = { min: 180, max: 320, default: 224 };
const WIDTH_KEY = "eridanus-sidebar-width";

function storedWidth(): number {
  try {
    const value = Number(localStorage.getItem(WIDTH_KEY));
    if (value >= SIDEBAR_WIDTH.min && value <= SIDEBAR_WIDTH.max) return value;
  } catch {
    // Storage can be off, as in a private window; the default stands.
  }
  return SIDEBAR_WIDTH.default;
}

/** The page keeps at least this much of the window, so a width dragged on
 * a large screen leaves a small one its content. */
const MIN_CONTENT = 480;

/** The sidebar's CSS width for a stored one, held to what the window
 * leaves after MIN_CONTENT. */
const widthVar = (value: number) =>
  `clamp(${SIDEBAR_WIDTH.min}px, calc(100vw - ${MIN_CONTENT}px), ${value}px)`;

/** A width within the limits, including the one the window sets now, so a
 * drag stores what it shows. */
const clampWidth = (value: number) => {
  const max =
    typeof window === "undefined"
      ? SIDEBAR_WIDTH.max
      : Math.min(SIDEBAR_WIDTH.max, window.innerWidth - MIN_CONTENT);
  return Math.round(Math.max(SIDEBAR_WIDTH.min, Math.min(max, value)));
};

/** Sets --fade-top and --fade-bottom on a scrolling element to 24px where
 * more content lies past that edge, for a mask that fades it out there. */
function fadeScrollEdges(element: HTMLElement | null) {
  if (!element) return;
  const update = () => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    element.style.setProperty("--fade-top", scrollTop > 0 ? "24px" : "0px");
    element.style.setProperty(
      "--fade-bottom",
      scrollTop + clientHeight < scrollHeight - 1 ? "24px" : "0px",
    );
  };
  update();
  element.addEventListener("scroll", update, { passive: true });
  const observer = new ResizeObserver(update);
  observer.observe(element);
  for (const child of element.children) observer.observe(child);
  return () => {
    element.removeEventListener("scroll", update);
    observer.disconnect();
  };
}

/** The fill weight of a Phosphor icon element, which marks the current page. */
function filled(icon: ReactNode): ReactNode {
  return isValidElement<{ weight?: string }>(icon)
    ? cloneElement(icon, { weight: "fill" })
    : icon;
}

// A render element: the menu button supplies its children.
// eslint-disable-next-line jsx-a11y/anchor-has-content -- the label is rendered into it
const defaultLink = (href: string) => <a href={href} />;

/**
 * The frame of a console app. The sidebar sits on the window's own background
 * with the product, navigation groups under small headings and, at its
 * foot, the account menu beside a few icon buttons; the page sits in a card
 * inset from the window. A breadcrumb or page-wide actions get a top bar
 * inside the card, with the sidebar toggle; without them the page starts at
 * the card's top edge. On desktop the sidebar's edge drags to
 * resize it, and it collapses to icons (⌘B, a click on the edge, or a drag
 * short of the minimum width); it remembers both across visits. Under 768px
 * it opens as a sheet, from a bar that phones always get.
 *
 * The card takes the rest of the viewport and scrolls by itself, so the top
 * bar stays in view and a `<Page fill>` gets an exact height.
 *
 * Needs a ThemeProvider above it for the account menu's theme choice. Links
 * are plain <a> elements; pass `renderLink` to use the router's own, such as
 * `href => <Link to={href} />`.
 */
export function AppShell({
  brand,
  nav,
  account,
  breadcrumb,
  actions,
  footerActions,
  renderLink = defaultLink,
  defaultOpen,
  labels: labelOverrides,
  className,
  children,
}: {
  brand: AppBrand;
  nav: AppNavGroup[];
  account?: AppAccount;
  /** A Breadcrumb for the current page, in a top bar inside the card. */
  breadcrumb?: ReactNode;
  /** Page-wide controls on the top bar's trailing edge, such as search or help. */
  actions?: ReactNode;
  /** Icon buttons beside the account at the foot of the sidebar, such as
   * notifications: ghost Buttons of size "icon" with an aria-label. Collapsed
   * to icons, they stack above the avatar. */
  footerActions?: ReactNode;
  renderLink?: (href: string) => ReactElement;
  /** Whether the sidebar starts expanded when no choice is stored. */
  defaultOpen?: boolean;
  labels?: Partial<AppShellLabels>;
  className?: string;
  children: ReactNode;
}) {
  const labels = { ...useMessages(appShellLabels), ...labelOverrides };
  const [initialOpen] = useState(() => storedOpen() ?? defaultOpen ?? true);
  const [width, setWidth] = useState(storedWidth);
  return (
    <SidebarProvider
      defaultOpen={initialOpen}
      // While the edge is dragged (data-resizing, set by the handle) the
      // sidebar follows the pointer at once, without its width transition.
      className={cn(
        "h-svh min-h-0 data-resizing:cursor-col-resize data-resizing:select-none data-resizing:**:data-[slot=sidebar-container]:transition-none data-resizing:**:data-[slot=sidebar-gap]:transition-none",
        className,
      )}
      style={
        {
          "--sidebar-width": widthVar(width),
          // Collapsed, the sidebar is the 32px icon buttons with 8px on
          // either side: 48px, the last 8 being the gap before the card.
          "--sidebar-width-icon": "2rem",
        } as CSSProperties
      }
    >
      {/* Items sit at the sidebar's own 8px inset rather than 8px further
          in, so they keep their place when it collapses to 48px. */}
      <Sidebar
        collapsible="icon"
        variant="inset"
        className="group-data-[collapsible=icon]:w-12"
      >
        <SidebarHeader className="px-0">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-1">
              <NavButton
                tooltip={brand.name}
                link={renderLink(brand.href ?? "/")}
                // Laid out like the account row: a 24px tile 4px inside the
                // pill, centred with the nav icons, the name in line with
                // their labels.
                className="min-w-0 flex-1 gap-[5px] ps-1 group-data-[collapsible=icon]:p-1!"
              >
                {brand.logo ? (
                  // Concentric with the pill's rounded end: its 16px radius
                  // less the 4px inset is the tile's 12.
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground [&_svg]:size-3.5">
                    {brand.logo}
                  </span>
                ) : null}
                <span className="font-heading font-medium">{brand.name}</span>
              </NavButton>
              <CollapseButton label={labels.collapseSidebar} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent
          ref={fadeScrollEdges}
          role="navigation"
          aria-label={labels.navigation}
          // A long nav fades out at an edge that has more beyond it.
          className="mask-[linear-gradient(to_bottom,transparent,black_var(--fade-top,0px),black_calc(100%-var(--fade-bottom,0px)),transparent)]"
        >
          {nav.map((group, i) => (
            <SidebarGroup
              key={group.title ?? i}
              // Groups part by space and their headings, with no rule; a
              // heading starts where the icons below it do.
              className="px-0"
            >
              {group.title ? (
                <SidebarGroupLabel className="ps-[7px]">
                  {group.title}
                </SidebarGroupLabel>
              ) : null}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <NavButton
                        isActive={item.active}
                        aria-current={item.active ? "page" : undefined}
                        tooltip={item.label}
                        link={renderLink(item.href)}
                        // 18px icons centred on the middle of the pill's
                        // rounded end, where the brand tile and avatar centre
                        // too, so collapsing moves none of them.
                        className="group-data-[collapsible=icon]:p-[7px]! has-[>svg:first-child]:pl-[7px] [&_svg]:size-[18px]"
                      >
                        {item.active ? filled(item.icon) : item.icon}
                        <span className="min-w-0 flex-1 truncate">
                          {item.label}
                        </span>
                        {/* In the row, not over it, so a long label stops
                            short of a badge of any width. */}
                        {item.badge != null ? (
                          <span className="shrink-0 text-xs font-medium tabular-nums group-data-[collapsible=icon]:hidden">
                            {item.badge}
                          </span>
                        ) : null}
                      </NavButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        {account || footerActions ? (
          <SidebarFooter className="flex-row items-center gap-1 px-0 group-data-[collapsible=icon]:flex-col-reverse group-data-[collapsible=icon]:items-start">
            {account ? <AccountMenu account={account} labels={labels} /> : null}
            {footerActions ? (
              <div className="ms-auto flex shrink-0 items-center gap-0.5 text-muted-foreground group-data-[collapsible=icon]:ms-0 group-data-[collapsible=icon]:flex-col">
                {footerActions}
              </div>
            ) : null}
          </SidebarFooter>
        ) : null}
        <ResizeHandle
          label={labels.resizeSidebar}
          width={width}
          onWidthChange={setWidth}
        />
      </Sidebar>
      {/* A card with a hairline edge, as on the reference console: the
          border draws the structure, so there is no shadow. */}
      {/* The gap beside the sidebar stays 8px when it collapses, as the
          resize line sits in its middle, so the card does not move off. */}
      <SidebarInset className="min-w-0 overflow-hidden md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:border md:peer-data-[variant=inset]:shadow-none md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0">
        {/* Inset like a Page, so the toggle's icon lines up with the page's
            text. Without a breadcrumb or actions only phones get the bar, to
            open the sidebar. */}
        <div
          className={cn(
            "flex h-12 shrink-0 items-center gap-2 border-b px-4 sm:px-6",
            !breadcrumb && !actions && "md:hidden",
          )}
        >
          <ToggleButton label={labels.toggleSidebar} />
          {breadcrumb ? (
            <>
              <Separator
                orientation="vertical"
                className="data-vertical:h-4 data-vertical:self-center"
              />
              <div className="min-w-0 flex-1 truncate">{breadcrumb}</div>
            </>
          ) : (
            <div className="flex-1" />
          )}
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </div>
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

/** A sidebar link, a pill like every Eridanus control. On a phone the
 * sidebar is a sheet over the page, and following a link closes it. */
function NavButton({
  link,
  onClick,
  className,
  ...props
}: Omit<ComponentProps<typeof SidebarMenuButton>, "render"> & {
  link: ReactElement;
}) {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuButton
      {...props}
      className={cn("rounded-full", className)}
      render={link}
      onClick={(event) => {
        onClick?.(event);
        setOpenMobile(false);
      }}
    />
  );
}

/** At the end of the brand row while the sidebar is open: the visible way
 * to collapse it, beside ⌘B and the edge. Collapsed, the edge or ⌘B opens
 * it again. */
function CollapseButton({ label }: { label: string }) {
  const { setOpen } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setOpen(false)}
      className="shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden"
    >
      <SidebarSimpleIcon />
    </Button>
  );
}

/** shadcn's SidebarTrigger fixes its screen-reader name in English. */
function ToggleButton({ label }: { label: string }) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      title={label}
      onClick={toggleSidebar}
      className="-ms-1.5"
    >
      <SidebarSimpleIcon />
    </Button>
  );
}

/** How far past the minimum width the pointer goes before the sidebar
 * collapses, and how close to it, coming back, before it opens again. The
 * space between the two keeps it from flickering at one point. */
const COLLAPSE_PAST = 48;
const EXPAND_WITHIN = 24;

/**
 * The sidebar's edge, in the gap between it and the card: drag it to set the
 * width, which follows the pointer between the minimum and maximum. Past the
 * minimum it holds, and only well past it does the sidebar collapse to icons;
 * dragged out from the icons it opens again near the minimum. Both changes
 * animate, and nothing changes on letting go. A click without a drag toggles
 * it. A thin line
 * shows on hover and focus. It is a focusable window splitter: the arrow keys
 * change the width and Enter toggles the sidebar.
 */
function ResizeHandle({
  label,
  width,
  onWidthChange,
}: {
  label: string;
  width: number;
  onWidthChange: (width: number) => void;
}) {
  const { open, setOpen, toggleSidebar } = useSidebar();
  const save = (value: number) => {
    try {
      localStorage.setItem(WIDTH_KEY, String(value));
    } catch {
      // Storage can be off, as in a private window; the width lasts the visit.
    }
  };

  // A drag runs outside React: the width goes straight to the wrapper's CSS
  // variable on each pointer move, and React hears of it only when the
  // sidebar opens or closes and when the drag ends. Re-rendering the shell, and the page
  // inside it, on every pointer move is what made dragging stutter.
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    const handle = event.currentTarget;
    handle.setPointerCapture(event.pointerId);
    const wrapper = handle.closest<HTMLElement>("[data-slot=sidebar-wrapper]");
    const container = handle
      .closest("[data-slot=sidebar-container]")
      ?.getBoundingClientRect();
    const left = container?.left ?? 0;
    const startX = event.clientX;
    // The width on screen, which the window may hold under the stored one.
    const startWidth = open && container ? container.width : width;
    const wasOpen = open;
    let liveOpen = open;
    let moved = false;
    let raw = startWidth;
    let pointerX = startX;

    let settle = 0;

    // Opening or closing mid-drag lets the sidebar's own transition run for
    // its 200ms, so the change is a motion rather than a jump.
    const snap = (nextOpen: boolean) => {
      liveOpen = nextOpen;
      wrapper?.removeAttribute("data-resizing");
      clearTimeout(settle);
      settle = window.setTimeout(() => {
        if (moved && dragging) wrapper?.setAttribute("data-resizing", "");
      }, 200);
      setOpen(nextOpen);
    };
    const apply = () => {
      // The pointer holds the edge where it took it.
      raw = pointerX - left + (wasOpen ? startWidth - (startX - left) : 0);
      if (liveOpen && raw < SIDEBAR_WIDTH.min - COLLAPSE_PAST) {
        snap(false);
      } else if (!liveOpen && raw >= SIDEBAR_WIDTH.min - EXPAND_WITHIN) {
        wrapper?.style.setProperty(
          "--sidebar-width",
          widthVar(clampWidth(raw)),
        );
        snap(true);
      } else if (liveOpen) {
        wrapper?.style.setProperty(
          "--sidebar-width",
          widthVar(clampWidth(raw)),
        );
      }
    };
    let dragging = true;
    const onMove = (move: PointerEvent) => {
      pointerX = move.clientX;
      if (!moved) {
        if (Math.abs(pointerX - startX) < 3) return;
        moved = true;
        wrapper?.setAttribute("data-resizing", "");
      }
      // At once, not on the next frame: Chrome already sends pointer moves
      // once a frame, and the work is one CSS variable.
      apply();
    };
    const onUp = () => {
      dragging = false;
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      handle.removeEventListener("pointercancel", onUp);
      clearTimeout(settle);
      wrapper?.removeAttribute("data-resizing");
      if (!moved) {
        toggleSidebar();
        return;
      }
      apply();
      // Collapsed, it keeps the width it opens at: the one it had before
      // the drag.
      const final = liveOpen ? clampWidth(raw) : wasOpen ? startWidth : width;
      // Written here as well as in state: when the state already holds this
      // width, React leaves the variable the drag wrote.
      wrapper?.style.setProperty("--sidebar-width", widthVar(final));
      onWidthChange(final);
      if (liveOpen) save(final);
    };
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onUp);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 48 : 16;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSidebar();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      if (!open) {
        if (event.key === "ArrowRight") setOpen(true);
        return;
      }
      const next = clampWidth(
        width + (event.key === "ArrowRight" ? step : -step),
      );
      onWidthChange(next);
      save(next);
    }
  };

  return (
    // The window splitter pattern: a focusable separator with its value.
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={label}
      aria-valuemin={SIDEBAR_WIDTH.min}
      aria-valuemax={SIDEBAR_WIDTH.max}
      aria-valuenow={open ? width : SIDEBAR_WIDTH.min}
      tabIndex={0}
      title={label}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      // Positioned in the sidebar's container, whose last 8px are the gap
      // before the card: 12px wide, centred on that gap.
      className="group/resize absolute inset-y-0 -right-0.5 z-20 hidden w-3 cursor-col-resize touch-none outline-none md:block"
    >
      <span className="pointer-events-none absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-foreground mask-[linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] opacity-0 transition-opacity group-hover/resize:opacity-20 group-focus-visible/resize:opacity-60" />
    </div>
  );
}

const THEME_OPTIONS = [
  { value: "system", Icon: DesktopIcon },
  { value: "light", Icon: SunIcon },
  { value: "dark", Icon: MoonIcon },
] as const;

const isPreference = (value: unknown): value is ThemePreference =>
  THEME_OPTIONS.some((o) => o.value === value);

function AccountMenu({
  account,
  labels,
}: {
  account: AppAccount;
  labels: AppShellLabels;
}) {
  const { isMobile } = useSidebar();
  const { preference, setPreference } = useTheme();
  return (
    <SidebarMenu className="w-auto min-w-0 flex-1">
      <SidebarMenuItem>
        <DropdownMenu>
          {/* The menu button renders the trigger, not the other way round:
              SidebarMenuButton does not pass a ref on, and the menu needs
              the trigger's element to open. */}
          <SidebarMenuButton
            aria-label={labels.account(account.name)}
            // A 24px avatar centred like the nav icons, with the name in
            // line with their labels.
            className="gap-[5px] rounded-full ps-1 group-data-[collapsible=icon]:p-1! data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
            render={<DropdownMenuTrigger />}
          >
            <PersonAvatar name={account.name} src={account.avatar} size="sm" />
            {/* The email waits in the menu, which leaves room for the
                footer's buttons. */}
            <span className="truncate font-medium">{account.name}</span>
          </SidebarMenuButton>
          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
            className="w-(--anchor-width) min-w-56"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex flex-col gap-0.5">
                <span className="truncate text-sm font-medium text-foreground">
                  {account.name}
                </span>
                {account.email ? (
                  <span className="truncate">{account.email}</span>
                ) : null}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            {account.items ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>{account.items}</DropdownMenuGroup>
              </>
            ) : null}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>{labels.theme}</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={preference}
                onValueChange={(next) => {
                  if (isPreference(next)) setPreference(next);
                }}
              >
                {THEME_OPTIONS.map(({ value, Icon }) => (
                  <DropdownMenuRadioItem key={value} value={value}>
                    <Icon />
                    {labels[value]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            {account.onSignOut ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={account.onSignOut}>
                  <SignOutIcon />
                  {labels.signOut}
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
