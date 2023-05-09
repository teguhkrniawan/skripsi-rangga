import "./login.scss";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          
        const response = await axios.post(`http://localhost:8081/autentikasi/login`, {
            email : email,
            password: password
        });

        localStorage.setItem('user', JSON.stringify(response.data.data));
        if(response.data.data.roles === 'user'){
          window.location.href = '/dashboard-opd';
        }
        window.location.href = '/home';

      } catch (error) {
        // console.error("Handle Submit Error : ", )
        Swal.fire(
          'Pesan Kesalahan',
          error.response.data.message,
          'error'
        )
      }
  }

  return (
    <div className="kotak_login">
      <center className="tulisan_login"><b>APLIKASI SPBE</b></center>

      <form onSubmit={handleSubmit} className="box_login">
          <label htmlFor="">Email</label>
          <input 
            type="text" 
            name="email" 
            className="form_login" 
            placeholder="Ketikan email anda..."
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />

          <label htmlFor="">Password</label>
          <input 
            type="text" 
            name="password" 
            id="password" 
            className="form_login" 
            placeholder="Password"
            value={password}
            onChange={ e => setPassword(e.target.value) }
          />

          <br />
          <br />

          <center>
            <button type="submit" className="tombol_login">LOGIN</button>
          </center>
      </form>
    </div>
  )
}

export default Login