import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./adminHome.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";



function AdminHome() {
  const navigate = useNavigate();

  if(localStorage.getItem("currentUser")==="null"){
    useEffect(()=>{
      navigate("/")
    })
  }

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
  console.log(gigs);
  

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">

      <div className="text-center pb-12">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
          Admin DashBoard
        </h1>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
          <div className="mb-8 text-4xl">
            {users?.length}
          </div>
          <div className="text-center">
            <Link className="link" to="/adminhome/users"><div className="text-xl text-gray-700 font-bold mb-2">Users</div>
            </Link>
            <p className="text-base text-gray-400 font-normal">Users in Skillsprint</p>
          </div>
        </div>



        <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
          <div className="mb-8 text-4xl">
            {orders?.length}
          </div>
          <div className="text-center">
            <Link className="link" to="/adminhome/orders"><div className="text-xl text-gray-700 font-bold mb-2">Orders</div>
            </Link>
            <p className="text-base text-gray-400 font-normal">Orders in Skillsprint</p>
          </div>
        </div>


        <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
          <div className="mb-8 text-4xl">
            {gigs?.length}
          </div>
          <div className="text-center">
            <Link className="link" to="/adminhome/gigs"><div className="text-xl text-gray-700 font-bold mb-2">Gigs</div>
            </Link>
            <p className="text-base text-gray-400 font-normal">Gigs in Skillsprint</p>
          </div>
        </div>

      </div>
    </section>

  );
}

export default AdminHome;
