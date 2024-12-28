import  { useEffect } from 'react';
import "./style.css";
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from "firebase/auth";




function index() {


  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    if(user){

      navigate("/dashboard");

    }
  },[user,loading])


    function logoutFnc(){
    
      try{
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success("Logged Out Successfully!");
          navigate("/")
        }).catch((error) => {
          // An error happened.
          toast.success(error.message);

        });
      }catch(e){
        toast.error(e.message);
      }
    }

  return (
    <div className='navbar'>
      <p className='logo'>Mintora.</p>

      {user &&  <p className='logo link' onClick={logoutFnc}>Logout</p>}
    </div>
  )
}

export default index;