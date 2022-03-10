import React, { createRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useAppContext } from "util/ContextUtil";
import allActions from "redux/actions";
import { authApi } from "api/authApi";

const UserDropdown = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { userHasAuthenticated } = useAppContext();

  // dropdown props
  const popoverDropdownRef = createRef();
  const btnDropdownRef = createRef();
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

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
  const handleLogout = (e) => {
    e.preventDefault();
    logOutUser({
      message: "Logged out successfully.",
    });
    try {
      const data = authApi.logout();
      logOutUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <a
        className="block text-blueGray-500"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-12 h-12 text-sm text-white rounded-full bg-blueGray-200">
            <img
              alt="..."
              className="w-full align-middle border-none rounded-full shadow-lg"
              src={require("assets/img/team-1-800x800.jpg").default}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}
          onClick={(e) => e.preventDefault()}
        >
          My Profile
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
