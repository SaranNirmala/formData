// import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../config";
import './Home.css'

const Home = () =>{
const [data, setData] = useState([])

const [userData, setUserData] = useState([{
    name :'',
    email :'',
    number:'',
}])

const handleChange = (e) =>{
    const {name,value} = e.target
    setUserData({...userData, [name]:value});
}
const handleSubmit = async(e) =>{
 e.preventDefault();
 const response = await fetch(`${backendUrl}/datas`, {
    method: 'POST',
    body: JSON.stringify(userData), 
    headers:{
        "content-type": "application/json"
    }
 });
  // eslint-disable-next-line no-unused-vars
  const res= await response.json();
  setData([...data, userData]);
  setUserData({
    name:'',
    email:'',
    number:'',
  })
}


const fetchallData = async() => {
  const response = await fetch(`${backendUrl}/datas`);
  const res= await response.json();
  setData(res);

}


useEffect(() =>{
fetchallData()
},[])


    return(
        <div className="container">
          <h1 style={{textAlign:'center', marginTop:"20px", }}>User Data</h1>
          <div className="form-div">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter name" name="name" value={userData.name} onChange={handleChange} />
                <input type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleChange} />
                <input type="number" placeholder="Enter number" name="number" value={userData.number} onChange={handleChange} />
                <button>Add</button>
            </form>
          </div>
          <div className="cardContainer">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user, index) =>(
                            <tr key={index}>
                               <td>{user.name}</td>
                               <td>{user.email}</td>
                               <td>{user.number}</td>
                            </tr>
                        ))
                    }
                   
                </tbody>
            </table>
          </div>
        </div>
    )
}

export default Home;