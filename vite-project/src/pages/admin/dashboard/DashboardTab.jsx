import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import myContext from '../../../context/data/myContexr';
import { Link } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';

function DashboardTab() {
    const context = useContext(myContext);
    const { mode, product, edithandle,deleteProduct, order,user } = context;
    
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    

    return (
        <div >
            <div className="container mx-auto">
                <div className="tab container mx-auto ">
                    <Tabs defaultIndex={0} className=" " >
                        <TabList className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-20 mt-4 text-center pl-20 pr-20">
                            <Tab>
                                <button type="button" className="focus:outline-none text-white   focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-full py-2"style={{background:'linear-gradient(to top,#0a3d9f, rgb(4 33 89))'}}>
                                    <div className="text-center">Products</div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="focus:outline-none text-white   focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-full py-2"style={{background:'linear-gradient(to top,#0a3d9f, rgb(4 33 89))'}}>
                                    <div className="text-center">Order</div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="focus:outline-none text-white   focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-full py-2"style={{background:'linear-gradient(to top,#0a3d9f, rgb(4 33 89))'}}>
                                    <div className="text-center">Users</div>
                                </button>
                            </Tab>
                        </TabList>
                        {/* product  */}
                        <TabPanel>
                            <div className='  px-4 md:px-0 mb-16'>
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline pt-20 pb-1'>Product Details</h1>
                                <div className=" flex justify-end">
                                   <Link to={'/addproduct'}>
                                   <button
                                        type="button"
                                        className="focus:outline-none text-white   focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm w-full p-2 mb-3 pr-2"style={{background:'linear-gradient(to top,#0a3d9f, rgb(4 33 89))'}}  > <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div></button>
                                        </Link>
                                </div>
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"  >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                      {product.map((item,index)=>{
                                        const {title,price,imageUrl, category,date} = item;
                                        return(
                                            <tbody className=''>
                                            <tr className="bg-gray-50 border-b  dark:border-gray-700" >
                                                <td className="px-6 py-4 text-black " >
                                                    {index + 1}.
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                    <img className='w-16' src={imageUrl} alt="img" />
                                                </th>
                                                <td className="px-6 py-4 text-black " >
                                                    {title}
                                                </td>
                                                <td className="px-6 py-4 text-black " >
                                                    ₹{price}
                                                </td>
                                                <td className="px-6 py-4 text-black " >
                                                    {category}
                                                </td>
                                                <td className="px-6 py-4 text-black " >
                                                    {date}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className=" flex gap-2">
                                                        <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            <div onClick={() => deleteProduct(item)}  >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </div>
                                                            <Link to={'/updateproduct'}>
                                                            <div onClick={()=> edithandle(item)} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                            </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                        )
                                      })}
                                    </table>

                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="relative overflow-x-auto mb-16">
                                <h1 className='text-center mb-5 text-3xl font-semibold underline pt-20 pb-5'>Order Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No.
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Payment Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Pincode
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.map((allorder, orderIndex) => {
                                            return allorder.cartItems.map((item, itemIndex) => (
                                                <tr className="bg-gray-50 border-b dark:border-gray-700" key={itemIndex}>
                                                    <td className="px-6 py-4 text-black">
                                                        {orderIndex + 1}.
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {allorder.paymentId}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                    <img className='w-16' src={item.imageUrl} alt="img" />
                                                    </td>                                                   
                                                    <td className="px-6 py-4 text-black">
                                                        {item.title}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        ₹{item.price}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {item.category}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {allorder.addressInfo.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {allorder.addressInfo.address}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {allorder.addressInfo.pincode}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {allorder.addressInfo.phoneNumber}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {allorder.email}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                        {allorder.date}
                                                    </td>
                                                </tr>
                                            ));
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline pt-20 pb-5' >User Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                User ID
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Password
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    {user.map((item, index) => {
                                        const {name,uid,email,time, password} = item;
                                        return (
                                            <tbody>
                                                <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {index + 1}.
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {name}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {email}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {uid}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {time}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {password}
                                                    </td>
                                                    
                                                </tr>
                                            </tbody>
                                        )
                                    })}

                                </table>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>
        </div >
    )
}




export default DashboardTab