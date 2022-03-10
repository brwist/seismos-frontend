import { Layout, Menu } from "antd";
import allActions from "redux/actions";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useAppContext } from "util/ContextUtil";
import React from "react";
import { useToasts } from "react-toast-notifications";

const { Header } = Layout;

export default function Navbar(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { userHasAuthenticated } = useAppContext();

  const logOutUser = (data) => {
    userHasAuthenticated(false);
    dispatch(allActions.authActions.userLoggedOut());
    localStorage.removeItem("JWT");
    history.push("/auth/login");

    addToast(data.message, {
      appearance: "success",
      autoDismiss: true,
    });
  };

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      logOutUser({ message: "Logged out successfully" });
    } else if (e.key === "project") {
      history.push("/admin/project");
    } else if (e.key === "account_settings") {
      history.push("/admin/account");
    }
  };

  const handleLogoClick = () => {
    history.push("/admin/project");
  };

  return (
    <>
      {/* Navbar */}
      <Header className="seismos-app-header">
        {props.withLogo ? (
          <div className="logo-wo-sidebar">
            <img
              alt="seismos logo"
              src={require("assets/img/seismos/seismos_logo_animated.gif").default}
              onClick={() => handleLogoClick()}
            ></img>
          </div>
        ) : (
          ""
        )}
        <Menu theme="dark" mode="horizontal" className="justify-end" onClick={(e) => handleMenuClick(e)}>
          <Menu.Item key={"project"}>{`Projects`}</Menu.Item>
          <Menu.Item key={"account_settings"}>{`Account Settings`}</Menu.Item>
          <Menu.Item key={"logout"}>{`Log out`}</Menu.Item>
        </Menu>
      </Header>
      {/* End Navbar */}
    </>
  );
}
