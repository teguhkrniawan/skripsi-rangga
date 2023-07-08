import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const Helpdesk = () => {
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar />

                <div className="container">
                    <h4 className='mt-3'>Kontak Kami</h4>
                    <label htmlFor="">Email</label>
                    <p>diskominfotiks@rohilkab.go.id</p>

                    <label htmlFor="">Whatsapp</label>
                    <p>0812 0909 8898 - RANGGA</p>
                </div>
            </div>
        </div>
    )
}

export default Helpdesk