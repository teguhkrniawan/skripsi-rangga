import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SPBE ROHIL</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li>
            <DashboardIcon className="icon" />
            <span>BERANDA</span>
          </li>

          {/* role admin */}
          {/* <p className="title">Master Page</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>MASTER OPD</span>
            </li>
          </Link>
          <li>
            <LocalShippingIcon className="icon" />
            <span>MASTER PIC</span>
          </li>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>MASTER INDIKATOR</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>MASTER DOKUMEN</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>SETTINGS</span>
          </li>

          <p className="title">Report</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>LAPORAN SPBE</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>STATISTIK SPBE</span>
          </li> */}

          {/* role opd */}
          <p className="title">Service</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>EVIDEN SPBE</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>MANUAL BOOK</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>HELP DESK</span>
          </li>

          <p className="title">User</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>PROFILE</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>LOGOUT</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;