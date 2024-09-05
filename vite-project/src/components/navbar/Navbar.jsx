import React, { Fragment, useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContexr'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';


function Navbar() {
  const context = useContext(myContext);
  const {mode, toggleMode,searchkey, setSearchkey} = context;  
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const Logout = () => {
    localStorage.clear('user');
    window.location.href = "/";
  } 
  const navigate = useNavigate();
  const handleSerach = (e) =>{
    if (e.key === 'Enter' || e.type === 'click') {
    // Navigate to the Products page with the search query as a URL parameter
    navigate(`/allproducts?search=${searchkey}`);
  }
  };
  const currentPath = location.pathname;
  const cartItems = useSelector((state)=>state.cart)
  return (
    <div style={{width:"100%"}} className="root bg-white sticky top-0 z-50 w-full  " >
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {currentPath === '/' ? 
                    "": 
                    (<Link to={'/'} className="text-sm font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Home
                      </Link>
                    )}
                  {currentPath === '/allproducts' ? 
                    "": 
                    (<Link to={'/allproducts'} className=" flow-root text-sm font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        All Products
                      </Link>
                    )}
                  {currentPath === '/aboutus'?
                    '':
                    (<Link to={'/aboutus'} className=" -m-2 block p-2 font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                      aboutus
                    </Link>
                    )}
                  
                  {user && currentPath !=='/order' ? <div className="flow-root">
                    <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      Order
                    </Link>
                  </div>:""}
                  
                  {user?.user?.email ==='admin@gmail.com' ?
                  <div className="flow-root">
                  <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    admin
                  </Link>
                  </div> : ""}
                  
                {user ?(<div className="flow-root">
                    <a onClick={Logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>
                  </div>):(<a href='/login' className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Login
                    </a>)}    
                  
                <div className="flow-root">
                  <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">                                        
                    </Link>
                </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
        </Transition.Root>        
        <header className="relative bg-white">            
            <a href="https://wa.me/+919892479608?text=Hi, I need help to book!" >
              <p className="flex h-10 items-center justify-center  px-4 text-sm font-medium text-white sm:px-6 lg:px-8 " style={{backgroundColor: '#042159', fontSize:'11px'}} >
                For Customization Inquiries : Call/WhatsApp +91 9892479608
              </p>
            </a>            
            <nav aria-label="Top" className=" px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: '#ffffff' }}>
            <div className="">
                <div className="flex h-16 items-center">
                <button
                    type="button"
                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                    onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
                >
                    <span className="sr-only">Open menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                    <Link to={'/'} className='flex'>
                    <div className="flex ">
                        <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h1>
                    </div>
                    </Link>
                </div>

                <div className="ml-auto flex items-center">
                    {/*search function*/}
                    <div class="mr-4 bg-gray-100 drop-shadow-xl border border-gray-200">
                      <div class="relative">
                        <div class="absolute flex items-center ml-2 h-full">
                          <svg class="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z">
                            </path>
                          </svg>
                        </div>
                        <input
                            type="text"
                            name="searchkey"
                            value={searchkey}
                            onChange={e => setSearchkey(e.target.value)}
                            onClick={handleSerach} 
                            id="searchkey"
                            placeholder="Search here"
                            className="px-8 py-3 w-full rounded-md bg-violet-0 border-transparent outline-0 text-sm" />
                    </div>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      {currentPath === '/' ? 
                        "": 
                        (<Link to={'/'} className="text-sm font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                            Home
                          </Link>
                        )}
                      {currentPath === '/allproducts' ? 
                    "": 
                    (<Link to={'/allproducts'} className=" flow-root text-sm font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        All Products
                      </Link>
                    )}
                  {currentPath === '/aboutus'?
                    '':
                    (<Link to={'/aboutus'} className=" -m-2 block p-2 font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                      aboutus
                    </Link>
                    )}
                  
                  {user && currentPath !=='/order' ? <div className="flow-root">
                    <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      Order
                    </Link>
                  </div>:""}

                      {user?.user?.email === 'admin@gmail.com' && currentPath !=='/dashboard' ?
                      <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Admin
                      </Link> : ""}
                      
                      {user ?(<div className="flow-root">
                    <a onClick={Logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>
                  </div>):(<a href='/login' className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Login
                    </a>)} 
                    
                    </div>
                    

                    {/* Theme */}
                    <div className="flex lg:ml-6">
                    <button className='' onClick={toggleMode}>
                        {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                        {mode === 'light' ?
                        (<FiSun className='' size={30} />
                        ) : 'dark' ?
                            (<BsFillCloudSunFill size={30} />
                            ) : ''}
                    </button>
                    </div>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-6">
                    <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '', }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                        <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartItems.length}</span>
                        <span className="sr-only">items in cart, view bag</span>
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </nav>
        </header>      
    </div>
  )
}

export default Navbar
