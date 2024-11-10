import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const AddWebsites = () => {
    const [id, setId] = useState(null);
    const [message, setMessage] = useState('');
    const [data, setData] = useState({
        userid: null,
        website: null, // or any other initial data
    });
    const [errors, setErrors] = useState({
        website: null,
    });
    const userdata = useSelector((state) => state.auth.user);
    const token  = useSelector((state) => state.auth.token);
   

    useEffect(() => {
        if (userdata) {
            const parsedUserData = typeof userdata === "string" ? JSON.parse(userdata) : userdata;
            const userId = parsedUserData.id || null;
            setId(userId);
        
            setData((prevData) => ({
              ...prevData,
              userid: userId, // Directly set `userid` to the current value of `userId`
            }));
          }
      }, [userdata]);

    const handlesubmit = async (e) => {
        e.preventDefault();
       console.log("user " + id)
       
        //   console.log(errors + " err " + errors.website);
          if (errors && errors.website && errors.website !== null) {
            // If there is a website error, return false
            return false;
        }

        if(data && data.website == null){
            setErrors({...errors, website:"Please fill name"})
            return false;
           
        }

        // console.log(data)

        if(Object.keys(data).length === 2){
            const submitweb = document.querySelector("#submitweb");
            submitweb.innerHTML = "Please wait.....";
            submitweb.disabled = true;
            if(id && token){
            try{
                const response = await axios.post(import.meta.env.VITE_API_URL + "/api/addwebsite", { ...data }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                
              console.log(response)
              setMessage(response.data.message);
              submitweb.innerHTML = "Add";
              submitweb.disabled = false;
            }catch(error){
                submitweb.innerHTML = "Add";
              submitweb.disabled = false;
              console.error("login failed ", error)
            }
          }
         
        }
    }

  

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(value.length);
        if (!/^(https?:\/\/)?(www\.)?[a-z0-9]+(\.[a-z]+)+(\/)?$/.test(value) || value.length < 3) {
            console.log("error")
            setErrors({...errors,
                website: "Please fill in the website name", // Set error message
            });
            return false; // Early return if error
        } else {
            console.log("norror")
            // Clear error for the specific field
            setErrors({...errors,
                website: null, // Set error message
            });
        }
     
          setData(prevData => ({
            ...prevData,
            [name]: value
          }));
    
          
      }
   
  



    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper">
                    <Navbar />
                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">

                            <div className="row">
                                <div className="col-md-6 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Create New Websites</h4>
                                            <Link to="/" >View All Websites</Link>

                                            <form onSubmit={handlesubmit} className="forms-sample">
                                                <div className="form-group">
                                                    <label>Add Website</label>
                                                    <input onChange={handleChange} type="text" name="website" className="form-control" id="website" placeholder="Website" />
                                                    {errors.website && <p className='text-danger'>{errors.website}</p>}
                                                </div>

                                                <button type="submit" id="submitweb" className="btn btn-primary mr-2">Add</button>
                                                {message && <p className='text-success'>{message}</p>}
                                                {/* <button type='submit' className="btn btn-light">Cancel</button> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">How We will manage</h4>
                                            <p className="card-description">   if website will go down we will mail you</p>
                                            

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddWebsites