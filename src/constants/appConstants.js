const LOGIN_TO_APP_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/invite-user-confirm",
  "/auth/reset-password",
  "/auth/reset-password-confirm",
];

const ROUTES_WITHOUT_SIDEBAR = ["/admin/project", "/admin/project-select", "/admin/project-new", "/admin/account"];

const DATA_INPUT_CARDS = [
  {
    title: "Hydrophone",
    section: "hydrophone",
    grid: [
      { label: "Com port", focus: false, color: "bg-grey", action: "comport" },
      { label: "Ethernet", focus: false, color: "bg-grey", action: "ethernet" },
      { label: "Upload File", focus: false, color: "bg-grey", action: "upload" },
      { label: "View Data", focus: false, color: "bg-grey", action: "view" },
    ],
  },
  {
    title: "Pressure",
    section: "pressure",
    grid: [
      { label: "Com port", focus: false, color: "bg-grey", action: "comport" },
      { label: "Ethernet", focus: false, color: "bg-grey", action: "ethernet" },
      { label: "Upload File", focus: false, color: "bg-grey", action: "upload" },
      { label: "View Data", focus: false, color: "bg-grey", action: "view" },
    ],
  },
  {
    title: "Pumping Data",
    section: "pumping_data",
    grid: [
      { label: "Com port", focus: false, color: "bg-grey", action: "comport" },
      { label: "Ethernet", focus: false, color: "bg-grey", action: "ethernet" },
      { label: "Upload File", focus: false, color: "bg-grey", action: "upload" },
      { label: "View Data", focus: false, color: "bg-grey", action: "view" },
    ],
  },
  {
    title: "Survey",
    section: "survey",
    grid: [
      { label: "Com port", focus: false, color: "bg-grey", action: "comport" },
      { label: "Ethernet", focus: false, color: "bg-grey", action: "ethernet" },
      { label: "Upload File", focus: false, color: "bg-grey", action: "upload" },
      { label: "View Data", focus: false, color: "bg-grey", action: "view" },
    ],
  },
  {
    title: "Gamma Ray",
    section: "gamma_ray",
    grid: [
      { label: "Com port", focus: false, color: "bg-grey", action: "comport" },
      { label: "Ethernet", focus: false, color: "bg-grey", action: "ethernet" },
      { label: "Upload File", focus: false, color: "bg-grey", action: "upload" },
      { label: "View Data", focus: false, color: "bg-grey", action: "view" },
    ],
  },
  {
    title: "Mud Log",
    section: "mud_log",
    grid: [
      { label: "Com port", focus: false, color: "bg-grey", action: "comport" },
      { label: "Ethernet", focus: false, color: "bg-grey", action: "ethernet" },
      { label: "Upload File", focus: false, color: "bg-grey", action: "upload" },
      { label: "View Data", focus: false, color: "bg-grey", action: "view" },
    ],
  },
];

const ROLE_OPTIONS = [
  { label: "Engineering Manager", value: "engineering_manager" },
  { label: "Field engineer", value: "field_engineer" },
];

const SHIFT_OPTIONS = [
  { label: "Day", value: "day" },
  { label: "Night", value: "night" },
];

const APP_CONSTANTS = {
  LOGIN_TO_APP_ROUTES,
  ROUTES_WITHOUT_SIDEBAR,
  DATA_INPUT_CARDS,
  ROLE_OPTIONS,
  SHIFT_OPTIONS,
};

export default APP_CONSTANTS;
