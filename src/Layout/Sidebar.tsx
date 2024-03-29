import Chevornleft from "UI/Icons/Chevorn-left";
import { Button } from "antd";
import assets from "json/assets";
import React, { useEffect, useState } from "react";
import { SidebarWrapper } from "styles/StyledComponents/SidebarWrapper";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import PharmaciesIcon from "UI/Icons/PharmaciesIcon";
import ClinicsIocn from "UI/Icons/ClinicsIocn";
import OrderPrescriptionIcon from "UI/Icons/OrderPrescriptionIcon";
import AdminPanelIcon from "UI/Icons/AdminPanelIcon";
import LogoShortIcon from "UI/Icons/LogoShortIcon";
import SupportIcon from "UI/Icons/SupportIcon";
import { useNavigate } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Pharmacies & Branches", "/", <PharmaciesIcon />),

  getItem("Clinics", "/clinics", <ClinicsIocn />),

  getItem("Orders & Prescriptions", "/orders-prescriptions", <OrderPrescriptionIcon />),

  getItem("Admin Panel Settings", "sub4", <AdminPanelIcon />),

  getItem("Support", "sub5", <SupportIcon />),
];

const Sidebar = () => {
  const navigate = useNavigate()
  const [defaultOpenKey, setDefaultSelectedKey] = useState<string>(window.location.pathname)
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(e.key)
  };

  const [Isclick, setIsclick] = useState(false);
  const handleClick = () => {
    setIsclick(!Isclick);
  };

  const addClassToMainBody = () => {
    const mainBody = document.getElementsByClassName("main-body-wrap");
    if (Isclick) {
      mainBody[0].classList.add("sidebarClosed");
    } else {
      mainBody[0].classList.remove("sidebarClosed");
    }
  };
  useEffect(() => {
    setDefaultSelectedKey(window.location.pathname)
    addClassToMainBody();
  }, [Isclick]);

  return (
    <SidebarWrapper className={Isclick ? "slideMenu" : ""}>
      <div className="sideBarLogo">
        <img src={assets.logo} alt="" className="mainLogo" />
        <div className="slideLogo">
          <LogoShortIcon />
        </div>
        <Button className="sideBarSlide" onClick={handleClick}>
          <Chevornleft />
        </Button>
      </div>

      <div className="sidebarMenu">
        <Menu
          onClick={onClick}
          defaultSelectedKeys={[defaultOpenKey]}
          defaultOpenKeys={[defaultOpenKey]}
          mode="inline"
          items={items}
        />
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
