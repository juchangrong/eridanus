import {
  CaretUpDownIcon,
  DesktopIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PlusIcon,
  SidebarSimpleIcon,
  SignOutIcon,
  SunIcon,
} from "@phosphor-icons/react";
import {
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
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
import { useIsMobile } from "@/hooks/use-mobile";
import type { Locale } from "@/lib/eridanus/locale";
import { cn } from "@/lib/utils";

/** The product name and mark at the top of the sidebar, a link home. */
export interface AppBrand {
  name: string;
  logo?: ReactNode;
  /** Where the mark links; defaults to "/". */
  href?: string;
}

/** One of the tenants (workspaces, teams, organisations) a person can work
 * in; the sidebar's header switches between them. */
export interface AppTenant {
  id: string;
  name: string;
  /** A mark for the tile; without one, the tile shows the name's first
   * letter. */
  logo?: ReactNode;
}

/** The search entry under the header: a field-like button that opens the
 * app's own search or command palette, also on ⌘K (Ctrl+K elsewhere). */
export interface AppSearch {
  onOpen: () => void;
  /** The button's text; defaults to the built-in "Search". */
  placeholder?: string;
  /** Where the entry sits: under the sidebar's header (the default) or in
   * the middle of the card's top bar, which it then always shows. */
  placement?: "sidebar" | "topbar";
}

export interface AppTenants {
  items: AppTenant[];
  /** The id of the tenant the app is in. */
  current: string;
  onSelect: (id: string) => void;
  /** Items under the tenants, before "new tenant", such as a link to the
   * admin console. The icon sits in the tiles' 20px column. */
  actions?: { label: string; icon?: ReactNode; onSelect: () => void }[];
  /** Adds a "new tenant" item at the end of the menu. */
  onCreate?: () => void;
}

export interface AppNavItem {
  label: string;
  href: string;
  /** A Phosphor icon element, such as <PlayCircleIcon />, in its outline
   * weight; it stays outline on the current page, which the pill's
   * background marks. It sits centred on the pill's rounded end, so pick
   * icons of one visual size whose ink balances on their centre (a circle,
   * a stack, a gear); a lopsided glyph, such as a chart with its axes on one
   * side, looks off-centre there. Collapsed to icons, the sidebar shows only this, with
   * the label in a tooltip. */
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
  /** Leave the group out of the collapsed rail, for lists whose icons
   * don't tell their items apart there, such as pinned or recent ones. */
  hideWhenCollapsed?: boolean;
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
  /** The collapse button while the collapsed sidebar is open on hover:
   * it opens the sidebar for good. */
  expandSidebar: string;
  navigation: string;
  /** The account button's accessible name, given the person's name. */
  account: (name: string) => string;
  /** The tenant switcher's accessible name, given the current tenant. */
  switchTenant: (name: string) => string;
  newTenant: string;
  search: string;
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
    expandSidebar: "展开侧边栏",
    navigation: "主导航",
    account: (name) => `账号菜单：${name}`,
    switchTenant: (name) => `切换租户：${name}`,
    newTenant: "新建租户",
    search: "搜索",
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
    expandSidebar: "Expand sidebar",
    navigation: "Main navigation",
    account: (name) => `Account menu: ${name}`,
    switchTenant: (name) => `Switch tenant: ${name}`,
    newTenant: "New tenant",
    search: "Search",
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

// A render element: the menu button supplies its children.
// eslint-disable-next-line jsx-a11y/anchor-has-content -- the label is rendered into it
const defaultLink = (href: string) => <a href={href} />;

/**
 * The frame of a console app. The sidebar sits on the window's own background
 * with the product (or, with `tenants`, a switcher between them), an
 * optional search entry (⌘K), navigation
 * groups under small headings and, at its
 * foot, the account menu beside a few icon buttons; the page sits in a card
 * inset from the window. A breadcrumb or page-wide actions get an optional
 * top bar inside the card, which also holds the sidebar toggle in both
 * states; without them the page starts at the card's top edge and the toggle
 * sits beside the product in the sidebar. On desktop the sidebar's edge drags to
 * resize it, and it collapses to icons (⌘B, a click on the edge, or a drag
 * short of the minimum width); it remembers both across visits. Collapsed,
 * resting the pointer on it opens it over the card, without moving the page,
 * until the pointer leaves. Under 768px
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
  tenants,
  search,
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
  /** Makes the header a tenant switcher, in place of the brand link: the
   * current tenant's tile and name, opening a menu of the others. */
  tenants?: AppTenants;
  /** A search button under the header, or in the top bar with
   * `placement: "topbar"`, with ⌘K to open it. */
  search?: AppSearch;
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
  const [pinned, setPinned] = useState(
    () => storedOpen() ?? defaultOpen ?? true,
  );
  const [width, setWidth] = useState(storedWidth);
  const peek = usePeek(pinned);
  useNoRootBounce();
  const barSearch = search?.placement === "topbar" ? search : undefined;
  const bar = Boolean(breadcrumb || actions || barSearch);
  return (
    <SidebarProvider
      // Open when the user opened it (stored in the cookie by shadcn's
      // setOpen) or while the collapsed sidebar is open on hover, which is
      // never stored.
      open={pinned || peek.open}
      onOpenChange={(open) => {
        setPinned(open);
        peek.close();
      }}
      data-peek={peek.over || undefined}
      // While the edge is dragged (data-resizing, set by the handle) the
      // sidebar follows the pointer at once, without its width transition.
      className={cn(
        // Open on hover, the sidebar keeps its collapsed gap, so it lies over
        // the card instead of moving it. It looks just as when open, its
        // insets included: the window's ground fills it to its edge.
        "data-peek:**:data-[slot=sidebar-container]:bg-sidebar data-peek:**:data-[slot=sidebar-gap]:w-11!",
        "**:data-[slot=sidebar-container]:duration-(--sidebar-duration) **:data-[slot=sidebar-container]:ease-(--sidebar-ease) **:data-[slot=sidebar-gap]:duration-(--sidebar-duration) **:data-[slot=sidebar-gap]:ease-(--sidebar-ease) **:data-[slot=sidebar-group-label]:duration-(--sidebar-duration) **:data-[slot=sidebar-group-label]:ease-(--sidebar-ease)",
        "h-svh min-h-0 data-resizing:cursor-col-resize data-resizing:select-none data-resizing:**:data-[slot=sidebar-container]:transition-none data-resizing:**:data-[slot=sidebar-gap]:transition-none",
        className,
      )}
      style={
        {
          "--sidebar-width": widthVar(width),
          // Collapsed, the sidebar is 28px icon buttons with 8px on either
          // side: 44px, the last 8 being the gap before the card.
          "--sidebar-width-icon": "1.75rem",
          // Its width, the gap beside it and everything that moves with it
          // share one timing.
          "--sidebar-duration": `${SIDEBAR_DURATION}ms`,
          "--sidebar-ease": SIDEBAR_EASE,
        } as CSSProperties
      }
    >
      {/* Items sit at the sidebar's own 8px inset rather than 8px further
          in, so they keep their place when it collapses to 48px. */}
      <Sidebar
        collapsible="icon"
        variant="inset"
        className={cn(
          "group-data-[collapsible=icon]:w-11",
          // Over the card, the sidebar draws the card's own left edge
          // beside it, its rounded corners and border, so the two meet as
          // when the sidebar is open. A ring of the window's ground hides
          // the card's straight edge outside the curve.
          "in-data-peek:after:pointer-events-none in-data-peek:after:absolute in-data-peek:after:inset-y-2 in-data-peek:after:left-full in-data-peek:after:w-3 in-data-peek:after:rounded-l-xl in-data-peek:after:border in-data-peek:after:border-e-0 in-data-peek:after:border-border in-data-peek:after:shadow-[0_0_0_8px_var(--color-sidebar)] in-data-peek:after:[clip-path:inset(-8px_0_-8px_-8px)]",
        )}
        {...peek.handlers}
      >
        {/* No vertical padding: the brand row starts level with the card,
            and the nav sits 8px under it. */}
        <SidebarHeader className="px-0 py-0">
          <SidebarMenu>
            {/* Clips what does not fit yet while the sidebar opens, leaving
                room for focus rings. */}
            {/* 48px tall in both states, so the nav below never moves, and
                as tall as the card's top bar beside it. */}
            <SidebarMenuItem className="flex h-12 items-center gap-1 overflow-clip [overflow-clip-margin:4px]">
              {tenants ? (
                <TenantSwitcher tenants={tenants} labels={labels} />
              ) : (
                // The mark sized as the tenant switcher's tile: 24px in
                // both states, 4px in, centred on the icon column, the
                // name a step above the nav and bold. A link home, not a
                // control, so it shows no hover ground.
                <NavButton
                  tooltip={brand.name}
                  link={renderLink(brand.href ?? "/")}
                  className={cn(
                    HEADER_ROW,
                    "gap-2 ps-1 transition-[width,height,padding,margin] group-data-[collapsible=icon]:p-0.5! hover:bg-transparent active:bg-transparent",
                  )}
                >
                  {brand.logo ? (
                    <Tile
                      logo={brand.logo}
                      size="sm"
                      className="size-6 [&_svg]:size-3.5!"
                    />
                  ) : null}
                  <span className="truncate text-[15px] font-semibold">
                    {brand.name}
                  </span>
                </NavButton>
              )}
              {/* With a top bar the toggle stays there, in the card's
                  corner, in both states; without one it is here. */}
              {bar ? null : (
                <CollapseButton
                  label={
                    peek.open ? labels.expandSidebar : labels.collapseSidebar
                  }
                  pin={peek.open}
                />
              )}
            </SidebarMenuItem>
          </SidebarMenu>
          {search && search.placement !== "topbar" ? (
            <SearchButton search={search} label={labels.search} />
          ) : null}
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
              className={cn(
                "px-0",
                group.hideWhenCollapsed &&
                  "group-data-[collapsible=icon]:hidden",
              )}
            >
              {/* Collapsed, the headings fade away, so a short rule centred
                  on the icon column parts the groups instead: out of the
                  flow, midway between the last button above and the first
                  below (10px from each). */}
              {i > 0 ? (
                <div
                  aria-hidden
                  className="absolute -top-1.5 left-1.5 hidden h-px w-4 bg-sidebar-border group-data-[collapsible=icon]:block"
                />
              ) : null}
              {group.title ? (
                <SidebarGroupLabel className="h-7 ps-2 text-xs">
                  {group.title}
                </SidebarGroupLabel>
              ) : null}
              <SidebarGroupContent>
                {/* Collapsed, the 28px buttons part by 8px (a 36px pitch),
                    so the bare icons have room around them. */}
                <SidebarMenu className="gap-px transition-[gap] duration-(--sidebar-duration) ease-(--sidebar-ease) group-data-[collapsible=icon]:gap-2">
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <NavButton
                        isActive={item.active}
                        aria-current={item.active ? "page" : undefined}
                        tooltip={item.label}
                        link={renderLink(item.href)}
                        // Dense, like Linear's: 28px rows with 13px labels.
                        // One column with the header: the 16px icon centred
                        // under the logo (8px in, as the search's 18px icon
                        // sits 7px in), the label where the product's name
                        // starts and a badge 8px from the other end. The
                        // pills span the sidebar's own 8px inset, the same
                        // at both sides. Collapsed, the icon centres in the
                        // same 28px button.
                        // The icon takes the button's muted color, darkening
                        // on hover and on the current page; the label and
                        // badge keep the text color. An icon with a color of
                        // its own (a status dot) keeps it.
                        className="h-7 gap-[12px] pe-2 text-[13px] text-muted-foreground transition-[width,height,padding,margin] duration-(--sidebar-duration) ease-(--sidebar-ease) group-data-[collapsible=icon]:size-7! group-data-[collapsible=icon]:p-1.5! has-[>svg:first-child]:pl-2 [&_svg]:size-4"
                      >
                        {item.icon}
                        <span className="min-w-0 flex-1 truncate text-sidebar-foreground">
                          {item.label}
                        </span>
                        {/* In the row, not over it, so a long label stops
                            short of a badge of any width. */}
                        {item.badge != null ? (
                          <span className="shrink-0 text-xs font-medium text-sidebar-foreground tabular-nums group-data-[collapsible=icon]:hidden">
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
        {/* No bottom padding: the row's foot lines up with the card's. */}
        {account || footerActions ? (
          <SidebarFooter className="flex-row items-center gap-1 overflow-clip px-0 pb-0 [overflow-clip-margin:4px] group-data-[collapsible=icon]:flex-col-reverse group-data-[collapsible=icon]:items-start">
            {account ? <AccountMenu account={account} labels={labels} /> : null}
            {footerActions ? (
              <FooterActions>{footerActions}</FooterActions>
            ) : null}
          </SidebarFooter>
        ) : null}
        <ResizeHandle
          label={labels.resizeSidebar}
          width={width}
          onWidthChange={setWidth}
        />
      </Sidebar>
      {/* A card with a hairline edge: the border draws the structure, so
          there is no shadow. */}
      {/* The gap beside the sidebar stays 8px when it collapses, as the
          resize line sits in its middle, so the card does not move off.
          isolate keeps the page's own layers (a table's sticky header, say)
          inside the card, so the sidebar open on hover lies over them. */}
      <SidebarInset className="isolate min-w-0 overflow-hidden md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:border md:peer-data-[variant=inset]:shadow-none md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0">
        {/* One 16px inset for the card's corner and its page: the toggle's
            icon 16px from the card's top and left, over the page's text,
            which starts 16px in; the controls at either end 10px from the
            edges. 48px tall, so they centre on the sidebar's header row
            beside it. A hairline under it, in the card's border color,
            parts it from the page that scrolls beneath. Without a breadcrumb or actions only phones get
            the bar, to open the sidebar. */}
        <div
          className={cn(
            "flex h-12 shrink-0 items-center gap-2 border-b px-4",
            !bar && "md:hidden",
          )}
        >
          {/* With search in the bar, the ends grow alike, so the search
              sits on the card's centre line between them. */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <BarToggle
              label={labels.toggleSidebar}
              separator={Boolean(breadcrumb)}
            />
            {breadcrumb ? (
              <div className="min-w-0 flex-1 truncate [&_ol]:flex-nowrap [&_ol]:whitespace-nowrap">
                {breadcrumb}
              </div>
            ) : null}
          </div>
          {barSearch ? (
            <TopBarSearch search={barSearch} label={labels.search} />
          ) : null}
          {actions || barSearch ? (
            // The last action 10px from the card's right edge, as from its
            // top, like the toggle at the other end.
            <div
              className={cn(
                "-me-1.5 flex items-center justify-end gap-2",
                barSearch ? "min-w-0 flex-1" : "shrink-0",
              )}
            >
              {actions}
            </div>
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

/** The header row: a 32px pill, like a nav item's, from under the nav pills
 * to the collapse button; the name fills it, the caret at its end. The 28px
 * tile sits 2px inside it (concentric: 16 less 2 is 14), centred over the
 * nav icons, the larger name 10px clear of it. Collapsed it is a 28px
 * button filled by the tile, the size of a nav icon's hover circle. */
// min-w-8: while the sidebar opens, the collapse button is already there
// and the row is still 32px wide; without a floor it squeezed the tile out
// of sight for a moment, a flicker on every toggle.
const HEADER_ROW =
  "w-auto max-w-full min-w-8 flex-1 gap-1.5 ps-0.5 pe-3 transition-[width,height,padding,margin] duration-(--sidebar-duration) ease-(--sidebar-ease) group-data-[collapsible=icon]:size-7! group-data-[collapsible=icon]:min-w-7 group-data-[collapsible=icon]:p-0!";

/** A round tile with a mark, or a name's first letter: the header's, 28px
 * open and collapsed, the size of a collapsed nav item's hover circle; or a
 * small one for menus. */
function Tile({
  logo,
  name,
  size = "md",
  className,
}: {
  logo?: ReactNode;
  name?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground",
        size === "md"
          ? "size-7 text-[12px] [&_svg]:size-3.5!"
          : "size-5 text-[11px] [&_svg]:size-3!",
        className,
      )}
    >
      {logo ?? Array.from(name?.trim() ?? "")[0]?.toUpperCase()}
    </span>
  );
}

/** The header as a tenant switcher: the current tenant's tile and name with
 * a caret, opening the list of tenants, the current one checked, and an item
 * to make a new one. */
function TenantSwitcher({
  tenants,
  labels,
}: {
  tenants: AppTenants;
  labels: AppShellLabels;
}) {
  const current =
    tenants.items.find((t) => t.id === tenants.current) ?? tenants.items[0];
  if (!current) return null;
  return (
    <DropdownMenu>
      {/* The menu button renders the trigger, as in the account menu. */}
      <SidebarMenuButton
        aria-label={labels.switchTenant(current.name)}
        // A bordered 32px pill: the 24px tile 4px in, centred on the icon
        // column, the name a step above the nav and bold, as the header's
        // mark. Collapsed it is a bare 28px button holding the same tile;
        // the padding, ring and ground change, all transitioned, so the
        // tile glides between the two places without resizing.
        className={cn(
          HEADER_ROW,
          "h-8 gap-2 rounded-full bg-background ps-1 pe-2.5 ring-1 ring-sidebar-border transition-[width,height,padding,margin,box-shadow,background-color] ring-inset group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0.5! group-data-[collapsible=icon]:ring-0 data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground",
        )}
        render={<DropdownMenuTrigger />}
      >
        <Tile
          logo={current.logo}
          name={current.name}
          size="sm"
          className="size-6"
        />
        <span className="min-w-0 flex-1 truncate text-left text-[15px] font-semibold">
          {current.name}
        </span>
        <CaretUpDownIcon className="size-3.5! text-muted-foreground" />
      </SidebarMenuButton>
      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={4}
        className="w-(--anchor-width) min-w-56"
      >
        <DropdownMenuRadioGroup
          value={current.id}
          onValueChange={(id) => {
            if (typeof id === "string" && id !== current.id)
              tenants.onSelect(id);
          }}
        >
          {tenants.items.map((tenant) => (
            <DropdownMenuRadioItem key={tenant.id} value={tenant.id}>
              <Tile logo={tenant.logo} name={tenant.name} size="sm" />
              <span className="truncate">{tenant.name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        {tenants.actions?.length || tenants.onCreate ? (
          <DropdownMenuSeparator />
        ) : null}
        {tenants.actions?.map((action) => (
          <DropdownMenuItem key={action.label} onClick={action.onSelect}>
            <span
              aria-hidden
              className="flex size-5 shrink-0 items-center justify-center text-muted-foreground"
            >
              {action.icon}
            </span>
            {action.label}
          </DropdownMenuItem>
        ))}
        {tenants.onCreate ? (
          <>
            <DropdownMenuItem
              onClick={tenants.onCreate}
              className="text-muted-foreground"
            >
              <span
                aria-hidden
                className="flex size-5 shrink-0 items-center justify-center rounded-full border border-dashed border-muted-foreground/50 [&_svg]:size-3!"
              >
                <PlusIcon />
              </span>
              {labels.newTenant}
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** The footer's buttons: in a row after the account, ending where the nav
 * pills do; collapsed, stacked above the avatar. A row cannot glide into a
 * column, so on each toggle they fade in at their new place rather than
 * jump, replayed on the element itself so nothing remounts or loses focus. */
function FooterActions({ children }: { children: ReactNode }) {
  const { state } = useSidebar();
  const ref = useRef<HTMLDivElement>(null);
  // Where the buttons sat in the footer before the last layout change:
  // beside the account open, stacked above it collapsed.
  const last = useRef<{ x: number; y: number } | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    const footer = el?.parentElement;
    if (!el || !footer) return;
    const box = el.getBoundingClientRect();
    const frame = footer.getBoundingClientRect();
    const now = { x: box.left - frame.left, y: box.top - frame.top };
    const before = last.current;
    last.current = now;
    if (!before || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    // The layout jumps at once; slide the buttons from where they were,
    // in the sidebar's own timing, while its width eases alongside.
    el.animate(
      [
        {
          transform: `translate(${before.x - now.x}px, ${before.y - now.y}px)`,
        },
        { transform: "none" },
      ],
      { duration: SIDEBAR_DURATION, easing: SIDEBAR_EASE },
    );
  }, [state]);
  return (
    <div
      ref={ref}
      // Collapsed, the buttons shrink to 28px, the sidebar's width.
      className="ms-auto flex shrink-0 items-center gap-0.5 text-muted-foreground group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:*:size-7!"
    >
      {children}
    </div>
  );
}

/** The search entry: a field-like pill with the nav's icon column, opening
 * the app's search on click or ⌘K (Ctrl+K off Apple systems). Collapsed it
 * is a bare icon button with a tooltip. */
function useSearchShortcut(search: AppSearch) {
  const onOpen = useRef(search.onOpen);
  onOpen.current = search.onOpen;
  const [apple, setApple] = useState(false);
  useEffect(() => {
    setApple(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        onOpen.current();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return { apple, open: () => onOpen.current() };
}

/** The search entry in the top bar: a 32px field-like pill on the card's
 * centre line, up to 480px wide, shrinking before the bar's ends do; a bare
 * icon button on phones. */
function TopBarSearch({ search, label }: { search: AppSearch; label: string }) {
  const { apple, open } = useSearchShortcut(search);
  const text = search.placeholder ?? label;
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label={text}
        aria-keyshortcuts={apple ? "Meta+K" : "Control+K"}
        onClick={open}
        className="md:hidden"
      >
        <MagnifyingGlassIcon />
      </Button>
      <button
        type="button"
        aria-keyshortcuts={apple ? "Meta+K" : "Control+K"}
        onClick={open}
        className="hidden h-8 w-120 max-w-[40%] min-w-40 shrink items-center gap-2 rounded-full bg-sidebar ps-3 pe-1.5 text-sm text-muted-foreground ring-1 ring-sidebar-border transition-colors outline-none ring-inset hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring md:flex [&_svg]:size-4 [&_svg]:shrink-0"
      >
        <MagnifyingGlassIcon />
        <span className="min-w-0 flex-1 truncate text-left">{text}</span>
        <kbd className="rounded-full bg-muted px-2 py-0.5 font-sans text-[11px] font-medium text-muted-foreground">
          {apple ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>
    </>
  );
}

function SearchButton({ search, label }: { search: AppSearch; label: string }) {
  const { apple, open } = useSearchShortcut(search);
  const text = search.placeholder ?? label;
  return (
    <SidebarMenu>
      {/* 32px tall in both states, so the nav below never moves. */}
      <SidebarMenuItem className="flex h-8 items-center">
        <SidebarMenuButton
          tooltip={text}
          aria-keyshortcuts={apple ? "Meta+K" : "Control+K"}
          onClick={open}
          className="gap-[11px] rounded-full bg-background pe-1.5 text-[13px] text-muted-foreground ring-1 ring-sidebar-border transition-[width,height,padding,margin] duration-(--sidebar-duration) ease-(--sidebar-ease) ring-inset group-data-[collapsible=icon]:size-7! group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-[5px]! group-data-[collapsible=icon]:ring-0 has-[>svg:first-child]:pl-[7px] [&_svg]:size-[18px]"
        >
          <MagnifyingGlassIcon />
          <span className="flex-1">{text}</span>
          <kbd className="rounded-full bg-muted px-2 py-0.5 font-sans text-[11px] font-medium text-muted-foreground">
            {apple ? "⌘K" : "Ctrl K"}
          </kbd>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

/** At the end of the brand row while the sidebar is open: the visible way
 * to collapse it, beside ⌘B and the edge. Collapsed, the edge or ⌘B opens
 * it again. */
function CollapseButton({
  label,
  pin,
}: {
  label: string;
  /** The sidebar is open on hover: the button opens it for good. */
  pin: boolean;
}) {
  const { setOpen } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setOpen(pin)}
      // Fades in as the sidebar opens, instead of popping in.
      className="ms-auto shrink-0 animate-in text-muted-foreground duration-(--sidebar-duration) fade-in group-data-[collapsible=icon]:hidden motion-reduce:animate-none"
    >
      <SidebarSimpleIcon />
    </Button>
  );
}

/** How the sidebar opens and closes: an ease-out that moves at once and
 * settles, rather than an ease-in-out, whose slow start and fast middle read
 * as a stall and a jump. */
const SIDEBAR_DURATION = 200;
const SIDEBAR_EASE = "cubic-bezier(0.2, 0, 0, 1)";

/** How long the pointer rests on the collapsed sidebar before it opens, and
 * how long it may be away before it closes, so passing over it or slipping
 * off its edge does nothing, yet short enough to feel immediate. */
const PEEK_OPEN_DELAY = 200;
const PEEK_CLOSE_DELAY = 150;

/**
 * Opens the collapsed sidebar while the pointer is over it, as a panel over
 * the card. Desktop pointers only; it stays open while a menu opened from it
 * is open, as the menu's popup is outside it, and closes when the user
 * collapses or opens the sidebar for good. Keyboard users have the tooltips.
 */
/** No rubber-band on the page while the shell is mounted. The shell fills
 * the viewport and the card scrolls by itself, so the page has nothing to
 * scroll, yet macOS still bounces it on a trackpad: the card then slides
 * while the fixed sidebar stays, and the sidebar open on hover, which draws
 * the card's left edge beside it, comes apart from the card. Scrolling inside
 * the card still bounces there. Restored on unmount. */
function useNoRootBounce() {
  useEffect(() => {
    const root = document.documentElement;
    const before = root.style.overscrollBehavior;
    root.style.overscrollBehavior = "none";
    return () => {
      root.style.overscrollBehavior = before;
    };
  }, []);
}

function usePeek(pinned: boolean) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  // Still over the card while it closes, until the animation ends.
  const [closing, setClosing] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const settle = useRef<number | undefined>(undefined);
  const over = useRef(false);
  const clear = () => window.clearTimeout(timer.current);
  useEffect(
    () => () => {
      clear();
      window.clearTimeout(settle.current);
    },
    [],
  );

  /** Closed by the user opening or collapsing the sidebar for good. */
  const close = () => {
    clear();
    window.clearTimeout(settle.current);
    setOpen(false);
    setClosing(false);
  };
  const shut = () => {
    setOpen(false);
    setClosing(true);
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(
      () => setClosing(false),
      SIDEBAR_DURATION,
    );
  };
  const closeLater = (container: HTMLElement) => {
    clear();
    timer.current = window.setTimeout(function check() {
      if (over.current) return;
      // A menu from the sidebar is open: wait until it closes.
      if (container.querySelector("[data-popup-open]")) {
        timer.current = window.setTimeout(check, PEEK_CLOSE_DELAY);
        return;
      }
      shut();
    }, PEEK_CLOSE_DELAY);
  };

  if (isMobile) return { open: false, over: false, close, handlers: {} };
  return {
    open: open && !pinned,
    /** Lying over the card: open, or closing from open. */
    over: (open || closing) && !pinned,
    close,
    handlers: {
      onPointerEnter: (e: ReactPointerEvent<HTMLDivElement>) => {
        over.current = true;
        if (pinned || e.pointerType !== "mouse") return;
        // Not while the edge is dragged.
        if (e.currentTarget.closest("[data-resizing]")) return;
        clear();
        window.clearTimeout(settle.current);
        setClosing(false);
        if (!open)
          timer.current = window.setTimeout(
            () => setOpen(true),
            PEEK_OPEN_DELAY,
          );
      },
      onPointerLeave: (e: ReactPointerEvent<HTMLDivElement>) => {
        over.current = false;
        if (pinned) return;
        closeLater(e.currentTarget);
      },
    },
  };
}

/**
 * The top bar's sidebar toggle, and a rule before the breadcrumb. It stays
 * in the card's corner whether the sidebar is open or collapsed (phones use
 * it to open the sheet); the sidebar's own collapse button is left out
 * while there is a top bar.
 * shadcn's SidebarTrigger fixes its screen-reader name in English.
 */
function BarToggle({
  label,
  separator,
}: {
  label: string;
  separator: boolean;
}) {
  const { toggleSidebar } = useSidebar();
  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={label}
        title={label}
        onClick={toggleSidebar}
        // The icon 16px from the card's left edge, as from its top, over
        // the page's text: the 28px button 10px in.
        className="-ms-1.5 text-muted-foreground"
      >
        <SidebarSimpleIcon />
      </Button>
      {separator ? (
        // 12px of clear space on each side: the bar's 8px gap less 2px
        // after the button, whose icon sits 6px inside it, and plus 4px
        // before the breadcrumb.
        <Separator
          orientation="vertical"
          className="-ms-0.5 me-1 data-vertical:h-4 data-vertical:self-center"
        />
      ) : null}
    </>
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
      // Positioned in the sidebar's container, whose right edge is the
      // card's: 12px wide, with the line against the card's border.
      // Hidden while the sidebar is open on hover, over the card.
      className="group/resize absolute inset-y-0 -right-[5px] z-20 hidden w-3 cursor-col-resize touch-none outline-none in-data-peek:hidden! md:block"
    >
      <span className="pointer-events-none absolute inset-y-3 right-[5px] w-px bg-foreground mask-[linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] opacity-0 transition-opacity group-hover/resize:opacity-20 group-focus-visible/resize:opacity-60" />
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
    // As wide as the avatar and name, so the hover pill hugs them and the
    // footer's buttons keep the rest of the row; min-w-8, as in the header:
    // they never squeeze the avatar while the sidebar opens.
    <SidebarMenu className="w-auto min-w-8 shrink">
      <SidebarMenuItem>
        <DropdownMenu>
          {/* The menu button renders the trigger, not the other way round:
              SidebarMenuButton does not pass a ref on, and the menu needs
              the trigger's element to open. */}
          <SidebarMenuButton
            aria-label={labels.account(account.name)}
            // The 24px avatar, as the header's tile, in both states: 4px
            // in, centred under the logo and nav icons, the name in line
            // with their labels. Collapsed the 28px button sits 2px up, so
            // the avatar keeps the open row's height.
            className="w-auto max-w-full gap-2 rounded-full ps-1 pe-3 text-[13px] transition-[width,height,padding,margin] duration-(--sidebar-duration) ease-(--sidebar-ease) group-data-[collapsible=icon]:mb-0.5 group-data-[collapsible=icon]:size-7! group-data-[collapsible=icon]:p-0.5! data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
            render={<DropdownMenuTrigger />}
          >
            <PersonAvatar
              name={account.name}
              src={account.avatar}
              size="sm"
              className="size-6! **:data-[slot=avatar-fallback]:text-[11px]"
            />
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
