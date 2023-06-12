import React from 'react';
// import Modal from './Modal';
import '../dashboard.css'
import axios from 'axios';

axios.defaults.withCredentials=true;
const url = 'https://taskify-mysql-backend-uditi.onrender.com/api/v1/posts';

export const getTasks= async () => {
    return await axios.get(`${url}`).catch((err)=>console.log(err));
}

export const addTasks = async (details) => {
    return await axios.post(`${url}`, details).catch((err)=>console.log(err));
}

export const deleteTask = async (id) => {
    return await axios.delete(`${url}/${id}`).catch((err)=>console.log(err));
}

export const updateTask = async (id, details) => {
    return await axios.put(`${url}/${id}`, details).catch((err)=>console.log(err))
}
const Tasks = () => {
    const [title,setTitle]=React.useState('');
    const [description,setDescription]=React.useState('');
    const [open,setOpen]=React.useState(false);
    const [newopen,setNewOpen]=React.useState(false);
    const [tasksdata, setTaskdata] = React.useState([]);

  React.useEffect(() => {
    getAllTasks();
   },[]);

  const getAllTasks= async () => {
    let response = await getTasks();
    console.log(response.data.data)
    setTaskdata(response.data.data);
}

const handleSubmit= async(e)=>{
    e.preventDefault();
    const details={title:title,content:description}
    await addTasks(details);
    setOpen(false);
    getAllTasks();
}
const handleDelete=async(id)=>{
    await deleteTask(id);
    getAllTasks();
}

const [newtitle,setNewTitle]=React.useState('');
  const [newdesc,setNewDesc]=React.useState('');
  const [newid,setNewId]=React.useState(0);
const handleEdit=async(id,title,description)=>{
    setNewOpen(true);
    setNewId(id);
    setNewTitle(title);
    setNewDesc(description)
  
}
const handleSubmitEdit=async(e)=>{
    e.preventDefault()
    const details={title:newtitle,content:newdesc}
    await updateTask(newid,details)
   setNewOpen(false);
//    getAllTasks();

}
    return (
        <>
        <div className='main-container'>
            <div>
                <h1 style={{fontSize:"1.5rem",margin:"1rem"}}>Welcome..</h1>
                <button onClick={()=>setOpen(!open)} className='button-create'>Create task</button>
            </div>
            <div className='container'>
                <table>
                    <tr>
                    <th>Task title</th>
                    <th>Description</th>
                    <th></th>
                    </tr>

                   {tasksdata.map((t)=>{
                    return <tr key={t.id}>
                    <td>{t.title}</td>
                    <td>{t.content}</td>
                    <td><button onClick={()=>handleDelete(t.id)} style={{paddingInline:"1rem",paddingTop:"0.6rem",paddingBottom:"0.6rem"}}>delete</button></td>
                    <td><button onClick={()=>handleEdit(t.id,t.title,t.content)} style={{paddingInline:"1rem",paddingTop:"0.6rem",paddingBottom:"0.6rem"}}>Edit</button></td>
                    </tr>
                    }
                 )} 
                    
                    
                </table>
            </div>

        </div>
        {open &&  <div>
            <div  style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "fixed",height: "100%", width: "100%", top: 0,left: 0, display: "flex" ,alignItems: "center",justifyContent: "center",overflow: "auto",zIndex: 99999}}>
            modal
            <div style={{marginTop:"4rem",width:"30%",backgroundColor:"#fff"}} >
                <form style={{padding:"2rem",display:"flex",flexDirection:"column"}} onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='title' />
                <input type="text" onChange={(e)=>setDescription(e.target.value)} placeholder='description' />
                <div style={{display:"flex",gap:"10px",marginTop:"3rem"}}>
                <button style={{paddingInline:"1rem",paddingTop:"0.6rem",paddingBottom:"0.6rem"}} type='submit'>Submit</button>
                <button style={{paddingInline:"1rem",paddingTop:"0.6rem",paddingBottom:"0.6rem"}} onClick={()=>setOpen(false)}>Close</button>
                </div>
                </form>
            </div>
        </div>
        </div> }
        {newopen &&  <div>
            <div  style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "fixed",height: "100%", width: "100%", top: 0,left: 0, display: "flex" ,alignItems: "center",justifyContent: "center",overflow: "auto",zIndex: 99999}}>
            modal
            <div style={{marginTop:"4rem",width:"30%",backgroundColor:"#fff"}} >
                <form style={{padding:"2rem",display:"flex",flexDirection:"column"}} onSubmit={handleSubmitEdit}>
                <input type="text" value={newtitle}  onChange={(e)=>setNewTitle(e.target.value)} placeholder='title' />
                <input type="text" value={newdesc} onChange={(e)=>setNewDesc(e.target.value)} placeholder='description' />
                <div style={{display:"flex",gap:"10px",marginTop:"3rem"}}>
                <button style={{paddingInline:"1rem",paddingTop:"0.6rem",paddingBottom:"0.6rem"}} type='submit'>Submit</button>
                <button style={{paddingInline:"1rem",paddingTop:"0.6rem",paddingBottom:"0.6rem"}} onClick={()=>setNewOpen(false)}>Close</button>
                </div>
                </form>
            </div>
        </div>
        </div> }
       
        </>
    );
}

export default Tasks;
