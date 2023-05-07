import React from 'react'
import Table from "../../components/table/Table";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import "./home.opd.scss";

const HomeOpd = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />

                <div className="charts" style={{ marginTop: '60px' }}>
                    <Featured />
                    <div className="tableku">
                        <Table />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeOpd