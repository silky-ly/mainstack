import { Icons } from "@/components/icons";

export const links = [
  {
    to: "/",
    title: "Home",
    icon: <Icons.Home />,
  },
  {
    to: "/",
    title: "Analytics",
    icon: <Icons.Analytics />,
  },
  {
    to: "/dashboard",
    title: "Revenue",
    icon: <Icons.Revenue />,
  },
  {
    to: "/",
    title: "CRM",
    icon: <Icons.Crm />,
  },
  {
    to: "/",
    title: "Apps",
    icon: <Icons.Apps />,
  },
];

export const profiles = [
  {
    to: "/",
    title: "Settings",
    icon: <Icons.Settings />,
  },
  {
    to: "/",
    title: "Purchase History",
    icon: <Icons.PurchaseHistory />,
  },
  {
    to: "/",
    title: "Refer and Earn",
    icon: <Icons.Refer />,
  },
  {
    to: "/",
    title: "Integrations",
    icon: <Icons.Integrations />,
  },
  {
    to: "/",
    title: "Report Bug",
    icon: <Icons.ReportBug />,
  },
  {
    to: "/",
    title: "Switch Account",
    icon: <Icons.SwitchAccount />,
  },
  {
    to: "/",
    title: "Sign Out",
    icon: <Icons.SignOut />,
  },
];

export const sideIcons = [
  {
    icon: <Icons.Product data-testid="product-icon" />,
    content: "Link in Bio",
  },
  {
    icon: <Icons.ProductTwo data-testid="productTwo-icon" />,
    content: "Store",
  },
  {
    icon: <Icons.ProductThree data-testid="productThree-icon" />,
    content: "Media Kit",
  },
  {
    icon: <Icons.ProductFour data-testid="productFour-icon" />,
    content: "Invoicing",
  },
];

export const features = [
  {
    value: "deposit",
    label: "Store Transactions",
  },
  {
    value: "gettipped",
    label: "Get Tipped ",
  },
  {
    value: "withdrawal",
    label: "Withdrawals",
  },
  {
    value: "chargebacks",
    label: "Chargebacks",
  },
  {
    value: "cashbacks",
    label: "Cashbacks",
  },
  {
    value: "referandearn",
    label: "Refer & Earn",
  },
];

export const status = [
  {
    value: "successful",
    label: "Successful",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "failed",
    label: "Failed",
  },
];

export const times = [
  {
    title: "Today",
  },
  {
    title: "Last 7 days",
  },
  {
    title: "This month",
  },
  {
    title: "Last 3 months",
  },
  {
    title: "This year",
  },
  {
    title: "Last year",
  },
  {
    title: "All time",
  },
];
