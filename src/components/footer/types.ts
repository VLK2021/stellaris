export type FooterNavLink = {
    label: string;
    href: string;
    external?: boolean;
};

export type FooterNavGroup = {
    title: string;
    links: FooterNavLink[];
};