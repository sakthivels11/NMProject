import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./admingigs.css";


function AdminGigs(){

    const { isLoading: usersLoading, error: errorusers, data: users } = useQuery({
        queryKey: ["users"],
        queryFn: () =>
            newRequest.get(`/users`).then((res) => {
                return res.data;
            }),
    });

    const { isLoading: orderLoading, error: errororders, data: orders } = useQuery({
        queryKey: ["orders"],
        queryFn: () =>
            newRequest.get(`/orders/getallOrders`).then((res) => {
                return res.data;
            }),
    });

    const { isLoading: gigLoading, error: errorgigs, data: gigs } = useQuery({
        queryKey: ["gigs"],
        queryFn: () =>
            newRequest.get(`/gigs`).then((res) => {
                return res.data;
            }),
    });


    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.delete(`/gigs/deleteGig/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["gigs"]);
        },
    });

    const handleDelete = (id) => {
        mutation.mutate(id);
        window.location.reload()
    };






    return (

        <div className="p-10 min-w-full flex items-center justify-center bg-white overflow-y-auto">
            <table className="w-full table-auto text-left">
                <thead>
                    <tr>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Index</p>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Name</p>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Freelancer Username</p>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Gig Rating</p>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Delete</p>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {gigs?.map((gig, index) => (
                        <tr>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{index + 1}</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <img src={gig.cover} alt="Gig Image" className="inline-block relative object-center  w-24 h-14  border border-blue-gray-50 bg-blue-gray-50/50 object-cover" />
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{gig.title}</p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{gig.sellerUsername}</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{gig.totalStars/gig.starNumber}</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <img src="/img/delete.png" alt="User Image" className="inline-block relative object-center rounded w-7 h-7  border border-blue-gray-900 bg-blue-gray-50/50 object-cover" onClick={() => handleDelete(gig._id)} />
                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Delete Order</p>
                                </div>
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>



        </div>
    );


}

export default AdminGigs;


