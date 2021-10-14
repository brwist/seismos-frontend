import NotFound from "components/NotFound/NotFound";
import ENUMS from "constants/appEnums";
import Account from "views/admin/Acccount";
import DailyLog from "views/admin/DailyLog";
import Dashboard from "views/admin/Dashboard";
import DataInput from "views/admin/DataInput";
import DefaultValues from "views/admin/DefaultValues";
import ExistingProject from "views/admin/ExistingProject";
import NewProject from "views/admin/NewProject";
import OcReport from "views/admin/OcReport";
import Project from "views/admin/Project";
import TrackingSheet from "views/admin/TrackingSheet";
import Login from "views/auth/Login";
import Register from "views/auth/Register";
var routes = [
	{
		path: ENUMS.ROUTES.DASHBOARD,
		name: "Dashboard",
		icon: "ni ni-tv-2 text-primary",
		component: Dashboard,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
	{
		path: ENUMS.ROUTES.PROJECT,
		name: "Project",
		icon: "ni ni-tv-2 text-primary",
		component: Project,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
	{
		path: ENUMS.ROUTES.PROJECT_EXISTING,
		name: "Select project",
		icon: "ni ni-tv-2 text-primary",
		component: ExistingProject,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
	{
		path: ENUMS.ROUTES.PROJECT_NEW,
		name: "New project",
		icon: "ni ni-tv-2 text-primary",
		component: NewProject,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
	{
		path: ENUMS.ROUTES.DATA_INPUT,
		name: "Data input",
		icon: "ni ni-tv-2 text-primary",
		component: DataInput,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
	{
		path: ENUMS.ROUTES.DAILY_LOG,
		name: "Daily log",
		icon: "ni ni-tv-2 text-primary",
		component: DailyLog,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
	{
		path: ENUMS.ROUTES.DEFAULT_VALUES,
		name: "Daily log",
		icon: "ni ni-tv-2 text-primary",
		component: DefaultValues,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
	{
		path: ENUMS.ROUTES.TRACKING_SHEET,
		name: "Daily log",
		icon: "ni ni-tv-2 text-primary",
		component: TrackingSheet,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
	{
		path: ENUMS.ROUTES.OC_REPORT,
		name: "Daily log",
		icon: "ni ni-tv-2 text-primary",
		component: OcReport,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
	{
		path: ENUMS.ROUTES.LOGIN,
		name: "Login",
		icon: "ni ni-key-25 text-info",
		component: Login,
		layout: ENUMS.ROUTES.AUTH,
	},
	{
		path: ENUMS.ROUTES.REGISTER,
		name: "Register",
		icon: "ni ni-circle-08 text-pink",
		component: Register,
		layout: ENUMS.ROUTES.AUTH,
    },
	{
		path: ENUMS.ROUTES.NOTFOUND,
		name: "NOTFOUND",
		icon: "ni ni-circle-08 text-pink",
		component: NotFound,
		layout: ENUMS.ROUTES.AUTH,
    },
	{
		path: ENUMS.ROUTES.ACCOUNT,
		name: "Account",
		icon: "ni ni-tv-2 text-primary",
		component: Account,
        layout: ENUMS.ROUTES.ADMIN,
        menuItem: true,
	},
];
export default routes;
