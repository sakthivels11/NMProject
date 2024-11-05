import React from "react";
import "./Project_track.scss"
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Project_track = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { id } = useParams();
    const queryClient = useQueryClient();


    const { isLoading, error, data } = useQuery({
        queryKey: ["order_updates"],
        queryFn: () =>
            newRequest.get(`/orderTracking/${id}`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.put(`/orderTracking/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["order_updates"]);
        },
    });


    const handleComplete = (updateId) => {
        mutation.mutate(updateId);
    }

    const navigate = useNavigate();
    const handleOrderCompletion = async (e) => {
        e.preventDefault();
        try {
            const res1 = await newRequest.put(`/orders/ordercomplete/${id}`);
            console.log(res1);
            const res2 = await newRequest.delete(`/orderTracking/${id}`);
            console.log(res2);
            navigate("/orders");
        } catch (err) {
            console.log(err);
        }
    }



    if (currentUser.isSeller) {
        return (
            <>
                <div className="seller-intrusion">Sellers are not authorised to perform this action</div>
            </>
        )
    }
    return (
        <div className="orders">
            {isLoading ? (
                "loading"
            ) : error ? (
                "error"
            ) : (
                <div className="container">
                    <div className="title">
                        <h1>Project Tracking</h1>
                    </div>
                    <br />
                    <br />
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>Project Info</th>
                                <th>Complete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data?.map((update, index) => (
                                <tr key={update._id}>
                                    <td>{index + 1}</td>
                                    <td>{update.title}</td>
                                    <td>{update.desc}</td>
                                    {update.complete ? <td>Marked as Complete</td> : <td><button onClick={() => handleComplete(update._id)}>Mark as Complete</button></td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div>
                <button onClick={handleOrderCompletion}>Mark Order Completion</button>
            </div>
        </div>
    )

}
export default Project_track;