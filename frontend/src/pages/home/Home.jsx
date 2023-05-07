import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="opd" />
          <Widget type="pic" />
          <Widget type="indikator" />
          <Widget type="dokumen" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="User Aktif 6 Bulan Terakhir" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
