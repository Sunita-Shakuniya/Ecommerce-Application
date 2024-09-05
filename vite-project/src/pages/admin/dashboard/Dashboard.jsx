import React, { useContext, useEffect, useState } from 'react'
import {FaUserTie } from 'react-icons/fa';
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/data/myContexr';
import DashboardTab from './DashboardTab';
import { getOrderCount, getProductCount, getUserCount } from './Dataservice';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { AiFillShopping } from 'react-icons/ai';

function Dashboard() {
    const context = useContext(myContext)
    const { mode} = context
    const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const userCount = await getUserCount();
      const productCount = await getProductCount();
      const orderCount = await getOrderCount();
      setUserCount(userCount);
      setProductCount(productCount);
      setOrderCount(orderCount);
    };

    fetchCounts();
  }, []);

  return (
    <Layout>
        <section className="text-white-600 body-font mt-10 mb-10 ">
            <div className="container px-5 mx-auto mb-10">
                <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-4 mt-4 text-center pl-10 pr-10">
                    <div >
                        <div className=" border-2 hover:shadow-blue-100 shadow-[inset_0_0_10px_rgba(0,0,0,0.15)] bg-white-100 px-4 py-3 rounded-xl  border border-gray-300" style={{color: 'rgb(4, 33, 89)'}}>
                            <div className=" w-12 h-12 mb-3 inline-block" style={{ color: 'rgb(4, 33, 89)'}} viewBox="0 0 24 24">
                                <MdOutlineProductionQuantityLimits size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" >{productCount}</h2>
                            <p className=" text-purple-500  font-bold" style={{ color: 'rgb(4, 33, 89)'}}>Total Products</p>
                        </div>
                    </div>
                    <div >
                        <div className=" border-2 hover:shadow-blue-100 shadow-[inset_0_0_10px_rgba(0,0,0,0.15)] bg-white-100 px-4 py-3 rounded-xl  border border-gray-300" style={{ color: 'rgb(4, 33, 89)' }}>
                            <div className=" w-12 h-12 mb-3 inline-block" style={{ color: 'rgb(4, 33, 89)'}} viewBox="0 0 24 24">
                                <AiFillShopping size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : ''}}>{orderCount}</h2>
                            <p className=" font-bold" style={{ color: 'rgb(4, 33, 89)'}}>Total Orders</p>
                        </div>
                    </div>
                    <div >
                        <div className=" border-2 hover:shadow-blue-100 shadow-[inset_0_0_10px_rgba(0,0,0,0.15)] bg-white-100 px-4 py-3 rounded-xl  border border-gray-300" >
                            <div className="w-12 h-12 mb-3 inline-block" style={{ color: 'rgb(4, 33, 89)'}}viewBox="0 0 24 24">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" >{userCount}</h2>
                            <p className="font-bold" style={{ color: 'rgb(4, 33, 89)'}}>Total Users</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <DashboardTab/>
        </section>
    </Layout>
  )
}

export default Dashboard