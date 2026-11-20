/** Navigation data types — all header/footer/sitemap nav reads from content/navigation.ts */

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
  isPdf?: boolean;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  children: NavLink[];
}

/** A top-level nav item is either a plain link or a group with children (dropdown). */
export type NavItem = NavLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

/** A column inside a mega menu panel */
export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

/** Full header navigation config */
export interface HeaderNav {
  items: NavItem[];
}

/** Footer link column */
export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface FooterConfig {
  columns: FooterColumn[];
  /** Social links displayed in the last column */
  showSocial: boolean;
}

/** Single quick-action link in the top utility bar */
export interface TopBarLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

/** Top utility bar (dark green strip above the main nav) */
export interface TopBarConfig {
  links: TopBarLink[];
}

export interface NavigationConfig {
  header: HeaderNav;
  topBar: TopBarConfig;
  footer: FooterConfig;
}
