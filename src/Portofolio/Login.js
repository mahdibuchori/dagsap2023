import React, { useEffect, useState } from 'react';
import './login.css';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { API_AUTH } from '../apis/apisData';
import { LoadingPage } from '../LoadingPage/LoadingPage';
const ID_REGEX = /^[a-zA-Z0-9_-]{3,16}$/

export const Login = ({handleClick}) => {
  const navigate = useNavigate()
  const [idkar,setidkar] = useState('');
  const [pwd, setPwd] = useState('');
  const [validId, setValidId] = useState(false);

  const [idReg, setIdReg] = useState('');
  const [validIdReg, setValidIdReg] = useState(false);

  const [pwdReg, setPwdReg] = useState('');
  const [newPass, setNewPass] = useState('');
  const [matchPwd, setMatchPwd] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const result = ID_REGEX.test(idkar);
    setValidId(result)
  }, [idkar]);

  useEffect(() =>{
  },[idkar,pwd]);

  useEffect(() => {
    const result = ID_REGEX.test(idReg);
    setValidIdReg(result)
  }, [idReg]);

  useEffect(() =>{
  },[idReg,pwdReg,newPass,matchPwd]);

  const handleSign = (e) =>{
    e.preventDefault();
    setidkar('');
    setPwd('');
    setIdReg('');
    setPwdReg('');
    setNewPass('');
    setMatchPwd('');
    document.querySelector('.is-form').classList.remove('active');
    document.querySelector('.box-log').classList.remove('active');
  }

  const handleChange = (e) =>{
    e.preventDefault();
    setidkar('');
    setPwd('');
    setIdReg('');
    setPwdReg('');
    setNewPass('')
    setMatchPwd('');
    document.querySelector('.is-form').classList.add('active');
    document.querySelector('.box-log').classList.add('active');
  }

  const handleLogin =async (e) =>{
    e.preventDefault()
    const v1 = ID_REGEX.test(idkar);
    const v2 = pwd;
    console.log(v1, v2)
    if(!v1 || !v2){
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Entry',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }
    const values ={
      id : idkar,
      password : pwd
    }
    try {
      setIsLoading(true)
      const res = await API_AUTH.post('/login', values);
      if(res.data.Status === "Success"){
        navigate('/');
      }
      else{
        alert(res.data.Error)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleCheck = (e) =>{
    let x = document.getElementById("myInput");
    if(e.target.checked){
      x.type = "text";
    }
    else{
      x.type = "password";
    }
  }

  const handleUpdate =async (e) =>{
    e.preventDefault()
    const v1 = ID_REGEX.test(idReg);
    const v2 = pwdReg;
    const v3 = newPass;
    const v4 = matchPwd;
    if(!v1 || !v2 || !v3 || !v4){
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Entry',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return;
    }
    try {
      setIsLoading(true)
      const res = await API_AUTH.put(`/users/${idReg}`,{
        "password" : pwdReg,
        "newPassword" : newPass,
        "confPassword" : matchPwd
      });
      setIsLoading(false)
      Swal.fire('Success',`${res.data.msg}`,'success')
      handleClick(false)
    } catch (error) {
      setIsLoading(false)
      Swal.fire('Oppss...',`${error.response.data.msg}`,'error');
    }
  }

  const handlePass = (e) =>{
    const x = document.getElementById("passAw");
    const y = document.getElementById("passAny");
    const z = document.getElementById("passAwNew");
    if(e.target.checked){
      x.type = "text";
      y.type = "text";
      z.type = "text";
    }
    else{
      x.type = "password";
      y.type = "password";
      z.type = "password";
    }
  }
  /* const navigate = useNavigate();
  const [values, setValues] = useState({
    id : '',
    email : '',
    password : ''
  });

  const handleSubmit =async (event) =>{
    event.preventDefault()
    try {
      const res = await API_AUTH.post('/login', values)
      console.log(res)
      if(res.data.Status === "Success"){
        navigate('/');
      }
      else{
        alert(res.data.Error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email'><strong>Email</strong></label>
              <input 
              type="email"
              placeholder='Enter Email'
              name='email'
              className='form-control rounded-0'  
              onChange={e => setValues({...values, email : e.target.value})} 
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='id'><strong>ID</strong></label>
              <input 
              type="text"
              placeholder='Enter ID'
              name='id'
              className='form-control rounded-0'  
              onChange={e => setValues({...values, id : e.target.value})} 
              />
            </div>
            <div className='mb-3'>
                <label htmlFor='password'><strong>Password</strong></label>
                <input 
                type="password"
                placeholder='Enter Password'
                name='password'
                className='form-control rounded-0'
                onChange={e => setValues({...values, password : e.target.value})}   
                />
            </div>
            <button 
                type='submit'
                className='btn btn-success w-100 rounded-0'
            >
            Login
            </button>
            <p>You are agree tou our terms and policies</p>
            <Link to={"/register"}
                className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
            >
            Create Account
            </Link>
            </form>
        </div>
    
    </div>
  ) */

  return ( 
    <>
    <div className="box-log">
      <div className="cont-box">
        <div className="aw-box">
          <div className="bosx signin">
            <h1>Login Account</h1>
            <button  className="bSignin" onClick={(e)=>handleSign(e)}>Sign in</button>
          </div>
          <div className="bosx signup">
            <h1>Forgot Password</h1>
            <button className="bSignUp" onClick={(e)=>handleChange(e)}>Change Password</button>
          </div>
        </div>
        <div className="is-form">
          <span onClick={event => handleClick(false)} className="close-button"><i className="bi bi-x-circle-fill"></i></span>
          <div className="form FormSignin">
            <form onSubmit={handleLogin}>
              <h3>Sign In</h3>
              <input 
                type="text" 
                placeholder="id karyaawan"
                name="idkar"
                onChange={(e) => {
                  const nilai = e.target.value.toUpperCase();
                  setidkar(nilai);
                }}
                value={idkar}
              />
              <label htmlFor='idkaryawan'>
                <span className={validId ? "valid" : "hide"}></span>
                  <span className={validId || !idkar ? "hide" : "invalid"}>
                    Harap Cek Ulang Id Karyawan Pastikan Tanpa Spasi *
                  </span>
              </label>
              <br />
              <input
                type="password"
                placeholder="password"
                name="password"
                id="myInput"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />

              <br />
              <div className="coba"  style={{display:"flex", fontSize: "0.6em"}}>
                <input type="checkbox" style={{display:"flex",left: 0, width: "15px"}} onChange={(e) =>handleCheck(e)} />
                <label htmlFor="vehicle3" style={{color: '#000000', marginLeft: '5px'}}>Show Password</label>
              </div>
              <br />
              <button className='btn btn-success btn-block' disabled={!setValidId || !pwd ? true : false}>
              Login
              </button>
            </form>
          </div>

          <div className="form FormSignup">
            <form onSubmit={handleUpdate}>
                <h3>Change Password</h3>
                <input 
                  type="text"
                  placeholder="ID Karyawan"
                  name="username"
                  onChange={(e) => setIdReg(e.target.value)}
                  value={idReg}
                />
                <label htmlFor='lblkaryawan'>
                  <span className={validIdReg ? "valid" : "hide"}></span>
                  <span className={validIdReg || !idReg ? "hide" : "invalid"}>
                    Harap Cek Ulang Id Karyawan Pastikan Tanpa Spasi *
                  </span>
                </label>

                <br />
                <input type="password"
                  placeholder="password"
                  id="passAw"
                  name="password"
                  onChange={(e) => setPwdReg(e.target.value)}
                  value={pwdReg}
                />

                <br />
                <input type="password"
                  placeholder="new password"
                  id="passAwNew"
                  name="password"
                  onChange={(e) => setNewPass(e.target.value)}
                  value={newPass}
                />

                <br />
                <input 
                  type="password"
                  placeholder="Confirm Password"
                  id="passAny"
                  name="newpassword"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                />
                <label htmlFor='lblkaryawan'>
                  <span className={validIdReg ? "valid" : "hide"}></span>
                  <span className={validIdReg || !idReg ? "hide" : "invalid"}>
                    Harap Cek Ulang Id Karyawan Pastikan Tanpa Spasi *
                  </span>
                </label>
                <br />
                <div className="coba" style={{display:"flex", fontSize: "0.6em"}}>
                  <input type="checkbox" style={{left: "0",display: "flex",width: "15px"}} onChange={(e) => handlePass(e)}/>
                  <label htmlFor="vehicle3" style={{color: "#000000",marginLeft: "5px"}}>Show Password</label>
                </div>

                <br />
                <button className='btn btn-success btn-block' disabled={!idReg || !pwdReg || !matchPwd ? true : false}>
                  Simpan
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    {isLoading ? <LoadingPage/> : ""}
    </>
  )
}
