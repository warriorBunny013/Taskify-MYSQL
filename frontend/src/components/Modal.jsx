import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials=true;
const url = 'https://taskify-mysql-backend-uditi.onrender.com/api/v1/posts';
export const getTasks= async () => {
    return await axios.get(`${url}`).catch((err)=>console.log(err));
}


const Modal = ({setTitle,title,setDescription,description,setOpen}) => {
   

   
    return (
        <div  style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "fixed",height: "100%", width: "100%", top: 0,left: 0, display: "flex" ,alignItems: "center",justifyContent: "center",overflow: "auto",zIndex: 99999}}>

            modal
            <div style={{marginTop:"4rem",width:"30%",backgroundColor:"#fff"}} >
                <form style={{padding:"2rem",display:"flex",flexDirection:"column"}} onSubmit={handleSubmit}>
                <input placeholder='title' />
                <input placeholder='description' />
                <div style={{display:"flex",gap:"10px",marginTop:"3rem"}}>
                <button style={{paddingInline:"1rem",paddingTop:"0.6rem",paddingBottom:"0.6rem"}} type='submit'>Submit</button>
                <button style={{paddingInline:"1rem",paddingTop:"0.6rem",paddingBottom:"0.6rem"}} onClick={()=>setOpen(false)}>Close</button>
                </div>
             
                </form>
            </div>
        </div>
    );
}

export default Modal;
