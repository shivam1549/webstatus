import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Notification from '../components/Notification'


const Home = () => {
    const userdata = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [username, setuserName] = useState('');
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [webdata, setWebdata] = useState([]);
    const [pagi, setPagi] = useState('0');
    const [webid, setWebid] = useState('');
    const [error, setError] = useState(false);
    const [id, setId] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        if (userdata) {
            setuserName(userdata.username || '');
            setId(userdata.id || null);
        }
    }, [userdata]);

    // const obj = JSON.parse(userdata);
    // console.log(obj.id);


    const fetchwebsiteData = async () => {
        setLoading(true);
        try {

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getuserwebsite?userid=${id}&limit=${pagi}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            const dataid = response.data.data.length - 1;
            setPagi(response.data.data[dataid].id)
            console.log(response.data.data)
            setWebdata((prevData) => [...prevData, ...response.data.data]);
            setAllData((prevData) => [...prevData, ...response.data.data]);

        } catch (error) {
            setLoading(false);
            setError(true);
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
        ;

    const loadMore = (e) => {
        e.preventDefault();
        fetchwebsiteData();
    }


    useEffect(() => {
        if (id && token) {
            fetchwebsiteData();
        }
    }, [id, token]);

    const handleDelete = async (e, id) => {
        // alert(id)
        e.preventDefault();
        if (confirm("Are you sure want to delete")) {
            if (id && token) {
                console.log(token);
                console.log(id)
                try {
                    const response = await axios.delete(import.meta.env.VITE_API_URL + "/api/deletewebsite",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            data: { id }
                        }
                    )
                    // console.log(response.data.message);
                    setNotificationMessage(response.data.message);

                    fetchwebsiteData()
                } catch (error) {
                    console.error("Error ", error);
                }
            }
        }

    }

    const searchData = (e) => {

        if (e.target.value.length > 2) {
            const result = allData.filter(item => item.website.toLowerCase().includes(e.target.value.toLowerCase()));
            //  console.log(result)
            setWebdata(result)
        }
        else {
            // console.log("hey mo");
            // console.log(webdata);
            setWebdata(allData);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    };



    return (
        <>
            <div className="container-scroller">
                {notificationMessage && <Notification message={notificationMessage} />}
                <div className="container-fluid page-body-wrapper">
                    <Navbar />
                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-md-12 grid-margin">
                                    <div className="row">
                                        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                            <h3 className="font-weight-bold">Welcome {username}</h3>
                                        </div>
                                        <div className="col-12 col-xl-4">
                                            <div className="justify-content-end d-flex">
                                                <Link to="/add-website" className="btn btn-primary mr-2">Add Websites</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 stretch-card grid-margin">
                                    <div className="card">

                                        <div className="card-body">
                                            <div className="row justify-content-center align-items-center mb-3">
                                                <div className="col-md-8">
                                                    <p className="card-title mb-0">Websites</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="d-flex justify-content-end">
                                                        <input type="text" className="form-control w-50" onChange={searchData} id="navbar-search-input" placeholder="Search.." aria-label="search" aria-describedby="search" />

                                                    </div>

                                                </div>
                                            </div>


                                            <div className="table-responsive">
                                                {loading ? (
                                                    <p>Loading...</p>
                                                ) : (
                                                    <table className="table table-striped table-borderless">
                                                        <thead>

                                                        </thead>
                                                        <tbody>
                                                            {webdata && webdata.map((item, index) => (

                                                                <tr key={index}>
                                                                    <td className="pl-0">
                                                                        <div className='d-flex align-items-center px-3'>
                                                                            {JSON.parse(item.status_code).http_status_code === 200 ? (
                                                                                <span className="mr-3 web-up d-inline-block"></span>
                                                                            ) : (
                                                                                <span className="mr-3 web-down d-inline-block"></span>
                                                                            )}
                                                                            <div>
                                                                                <Link to={item.website}>{item.website} </Link>


                                                                                <div className='d-flex align-items-center'>
                                                                                    <p className='mr-3'>
                                                                                        {JSON.parse(item.status_code).http_status_code === 200 ? (
                                                                                            <span>Up</span>) : (<span>Down</span>)}</p> <p>SSL
                                                                                        {JSON.parse(item.status_code).ssl_valid && (
                                                                                            <span className='text-success'> Working</span>
                                                                                        )}
                                                                                        <small> {item.last_checked && "Last checked " + formatDate(item.last_checked)}</small>
                                                                                    </p>
                                                                                </div>


                                                                            </div>


                                                                        </div>
                                                                    </td>


                                                                    <td className="pl-0">
                                                                        <div className='text-right'>

                                                                            <span onClick={(e) => handleDelete(e, item.id)} title="Remove jkk" className="remove ti-close"></span>
                                                                        </div>

                                                                    </td>
                                                                </tr>
                                                            ))}

                                                        </tbody>
                                                    </table>


                                                )}
                                               

                                            </div>
                                        </div>
                                        <div className="row pb-3">
                                                    <div className="col-md-12 text-center">
                                                       {!error && <button onClick={loadMore} className='btn btn-primary'>Load More</button> }
                                                    </div>
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

export default Home