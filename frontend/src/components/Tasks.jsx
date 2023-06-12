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
    return await axios.delete(`${url}/delete/${id}`).catch((err)=>console.log(err));
}

export const updateTask = async (id, details) => {
    return await axios.put(`${url}/update/${id}`, details).catch((err)=>console.log(err))
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
   getAllTasks();

}
    return (
        <>
        <div className='main-containerBox'>
            <div style={{minWidth:"100%"}}>
                {/* <h1 style={{fontSize:"1.5rem",margin:"1rem"}}>Welcome..</h1> */}
                <button onClick={()=>setOpen(!open)} className='button-createBox'>Create task</button>
            </div>
            <div className='containerBox'>
                <table>
                    <thead>
                    <tr>
                    <th>Task title</th>
                    <th>Description</th>
                    <th></th>
                    <th></th>
                    </tr>
                    </thead>
                    <tbody>
                   {tasksdata.map((t)=>{
                    return <tr key={t.id}>
                    <td>{t.title}</td>
                    <td>{t.content}</td>
                    <td><button onClick={()=>handleDelete(t.id)} className='button-createBox'>delete</button></td>
                    <td><button onClick={()=>handleEdit(t.id,t.title,t.content)} className='button-createBox'>Edit</button></td>
                    </tr>
                    }
                 )} 
                    </tbody>
                    
                </table>
            </div>

        </div>
        {open &&  <div>
            <div className='modal-create-box'>
            <div style={{backgroundColor:"#fff"}} >
                <form style={{padding:"2rem",display:"flex",flexDirection:"column"}} onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='title' />
                {/* <input  type="text" onChange={(e)=>setDescription(e.target.value)} placeholder='description' /> */}
                <textarea style={{resize:"none"}} name="Text1" cols="40" rows="5" onChange={(e)=>setDescription(e.target.value)} placeholder='description' ></textarea>
                <div style={{display:"flex",gap:"10px",marginTop:"3rem"}}>
                <button className='button-createBox' type='submit'>Submit</button>
                <button className='button-createBox' onClick={()=>setOpen(false)}>Close</button>
                </div>
                </form>
            </div>
        </div>
        </div> }
        {newopen &&  <div>
            <div   className='modal-create-box'>
            <div style={{backgroundColor:"#fff"}} >
                <form style={{padding:"2rem",display:"flex",flexDirection:"column"}} onSubmit={handleSubmitEdit}>
                <input type="text" value={newtitle}  onChange={(e)=>setNewTitle(e.target.value)} placeholder='title' />
                {/* <input type="text" value={newdesc} onChange={(e)=>setNewDesc(e.target.value)} placeholder='description' /> */}
                <textarea style={{resize:"none"}} name="Text1" cols="40" rows="5" value={newdesc} onChange={(e)=>setNewDesc(e.target.value)} placeholder='description' ></textarea>
                <div style={{display:"flex",gap:"10px",marginTop:"3rem"}}>
                <button className='button-createBox'type='submit'>Submit</button>
                <button className='button-createBox' onClick={()=>setNewOpen(false)}>Close</button>
                </div>
                </form>
            </div>
        </div>
        </div> }
       
        </>
    );
}

export default Tasks;
