import { React, useState } from "react";
import "./Projectstatus_update.scss"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";


const Projectstatus_update = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { id } = useParams();
    console.log("order id: ", id)
    const [title, setTitle] = useState("");
    const [desc, setdesc] = useState("");
    // const [completion_percentage, setProjectCompletion_percentage] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    const { isLoading, errorinfetchingupdates, data } = useQuery({
        queryKey: ["order_updates"],
        queryFn: () =>
            newRequest.get(`/orderTracking/${id}`).then((res) => {
                return res.data;
            }),
    });





    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await newRequest.post(`orderTracking/createOrderUpdate`, { id, title, desc });
            console.log(res)
            window.location.reload(true);
        } catch (err) {
            setError(err.response.data);
        }
    };

    if (!currentUser.isSeller) {
        return (
            <>
                <div className="seller-intrusion">Clients are not authorised to perform this action</div>
            </>
        )
    }



    return (
        <>
            <div className="orders">
                {isLoading ? (
                    "loading"
                ) : errorinfetchingupdates ? (
                    "error"
                ) : (
                    <div className="container">
                        <div className="title">
                            <h1>Project Tracking</h1>
                        </div>
                        <br />
                        <br />
                        <table>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>Project Info</th>
                                <th>Complete</th>
                            </tr>
                            {data?.map((update, index) => (
                                <tr key={update._id}>
                                    <td>{index + 1}</td>
                                    <td>{update.title}</td>
                                    <td>{update.desc}</td>
                                    {update.complete ? <td>Approved</td> : <td>Waiting for Approval from Client</td>}
                                </tr>
                            ))}
                        </table>
                    </div>
                )}
            </div>



            <div className="login">
                <form onSubmit={handleSubmit}>
                    <h1>Add Project Progress</h1>
                    <label htmlFor="">Title</label>
                    <input 
                        required
                        name="title"
                        type="text"
                        placeholder="johndoe"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="">Project Info</label>
                    <textarea
                        required
                        rows={10}
                        cols={100}
                        name="desc"
                        type="text"
                        placeholder="Project Info"
                        onChange={(e) => setdesc(e.target.value)}
                    />

                    {/* <label htmlFor="">Completion Percentage</label> */}
                    {/* <input
                    name="completion_percentage"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Completion Percentage"
                    onChange={(e) => setProjectCompletion_percentage(e.target.value)}
                /> */}
                    <button type="submit">Update</button>
                    {error && error}
                </form>
            </div>
        </>
    )
}

export default Projectstatus_update;