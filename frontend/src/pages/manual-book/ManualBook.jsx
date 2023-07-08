import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const ManualBook = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />

                <div className="container">
                    <h4 className='mt-3'>Manual Book Akan Segera Tersedia</h4>
                </div>
            </div>
        </div>
    )
}

export default ManualBook