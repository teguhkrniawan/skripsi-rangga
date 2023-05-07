import "./login.scss"

const Login = () => {
  return (
    <div className="kotak_login">
      <center className="tulisan_login"><b>APLIKASI SPBE</b></center>

      <form action="" className="box_login">
          <label htmlFor="">Email</label>
          <input type="text" name="email" className="form_login" placeholder="Ketikan email anda..."/>

          <label htmlFor="">Password</label>
          <input type="text" name="password" id="password" className="form_login" placeholder="Password"/>

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