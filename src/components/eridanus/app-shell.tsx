import {
  CaretUpDownIcon,
  DesktopIcon,
  MoonIcon,
  SidebarSimpleIcon,
  SignOutIcon,
  SunIcon,
} from "@phosphor-icons/react";
import {
  type ComponentProps,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";

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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
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
  /** A Phosphor icon element, such as <ListChecksIcon />. Collapsed to icons,
   * the sidebar shows only this, with the label in a tooltip. */
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
  /** Extra DropdownMenuItem elements above the theme choice, such as 个人设置. */
  items?: ReactNode;
  /** Shows 退出登录 at the end of the menu. */
  onSignOut?: () => void;
}

export interface AppShellLabels {
  toggleSidebar: string;
  navigation: string;
  account: string;
  theme: string;
  system: string;
  light: string;
  dark: string;
  signOut: string;
}

const LABELS: AppShellLabels = {
  toggleSidebar: "切换侧边栏",
  navigation: "主导航",
  account: "账号菜单",
  theme: "主题",
  system: "跟随系统",
  light: "浅色",
  dark: "深色",
  signOut: "退出登录",
};

/** shadcn's sidebar writes its open state to the sidebar_state cookie on every
 * toggle but never reads it back; the shell does, so the choice survives a
 * reload. */
function storedOpen(): boolean | undefined {
  if (typeof document === "undefined") return undefined;
  const value = document.cookie.match(/(?:^|;\s*)sidebar_state=(true|false)/);
  return value ? value[1] === "true" : undefined;
}

// A render element: the menu button supplies its children.
// biome-ignore lint/a11y/useAnchorContent: the label is rendered into it
const defaultLink = (href: string) => <a href={href} />;

/**
 * The frame of a console app: a sidebar with the product, grouped navigation
 * and the account menu, and a top bar with the sidebar toggle, a breadcrumb
 * slot and page-wide actions. The sidebar collapses to icons on desktop (⌘B,
 * or the rail on its edge) and remembers that across visits; under 768px it
 * opens as a sheet.
 *
 * The content area takes the rest of the viewport and scrolls by itself, so
 * the top bar stays in view and a `<Page fill>` gets an exact height.
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
  renderLink = defaultLink,
  defaultOpen,
  labels: labelOverrides,
  className,
  children,
}: {
  brand: AppBrand;
  nav: AppNavGroup[];
  account?: AppAccount;
  /** A Breadcrumb for the current page. */
  breadcrumb?: ReactNode;
  /** Page-wide controls on the top bar's trailing edge, such as search or help. */
  actions?: ReactNode;
  renderLink?: (href: string) => ReactElement;
  /** Whether the sidebar starts expanded when no choice is stored. */
  defaultOpen?: boolean;
  labels?: Partial<AppShellLabels>;
  className?: string;
  children: ReactNode;
}) {
  const labels = { ...LABELS, ...labelOverrides };
  const [initialOpen] = useState(() => storedOpen() ?? defaultOpen ?? true);
  return (
    <SidebarProvider
      defaultOpen={initialOpen}
      className={cn("h-svh min-h-0", className)}
    >
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <NavButton
                size="lg"
                tooltip={brand.name}
                link={renderLink(brand.href ?? "/")}
              >
                {brand.logo ? (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground [&_svg]:size-4">
                    {brand.logo}
                  </span>
                ) : null}
                <span className="font-heading font-medium">{brand.name}</span>
              </NavButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent role="navigation" aria-label={labels.navigation}>
          {nav.map((group, i) => (
            <SidebarGroup key={group.title ?? i}>
              {group.title ? (
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
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
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavButton>
                      {item.badge != null ? (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        {account ? (
          <SidebarFooter>
            <AccountMenu account={account} labels={labels} />
          </SidebarFooter>
        ) : null}
        <SidebarRail
          aria-label={labels.toggleSidebar}
          title={labels.toggleSidebar}
        />
      </Sidebar>
      <SidebarInset className="min-w-0 overflow-hidden">
        <div className="flex h-12 shrink-0 items-center gap-2 border-b px-3 sm:px-4">
          <ToggleButton label={labels.toggleSidebar} />
          {breadcrumb ? (
            <>
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-4"
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

/** A sidebar link. On a phone the sidebar is a sheet over the page, and
 * following a link closes it. */
function NavButton({
  link,
  onClick,
  ...props
}: Omit<ComponentProps<typeof SidebarMenuButton>, "render"> & {
  link: ReactElement;
}) {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuButton
      {...props}
      render={link}
      onClick={(event) => {
        onClick?.(event);
        setOpenMobile(false);
      }}
    />
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
      className="-ml-1"
    >
      <SidebarSimpleIcon />
    </Button>
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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* The menu button renders the trigger, not the other way round:
              SidebarMenuButton does not pass a ref on, and the menu needs
              the trigger's element to open. */}
          <SidebarMenuButton
            size="lg"
            aria-label={`${labels.account}：${account.name}`}
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
            render={<DropdownMenuTrigger />}
          >
            <PersonAvatar name={account.name} src={account.avatar} />
            <span className="grid min-w-0 flex-1 text-left leading-tight">
              <span className="truncate font-medium">{account.name}</span>
              {account.email ? (
                <span className="truncate text-xs text-muted-foreground">
                  {account.email}
                </span>
              ) : null}
            </span>
            <CaretUpDownIcon className="ml-auto text-muted-foreground" />
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
