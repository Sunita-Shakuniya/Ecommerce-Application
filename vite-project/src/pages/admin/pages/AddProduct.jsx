import React, { useContext } from 'react'
import myContext from '../../../context/data/myContexr'

function AddProduct() {
    const context = useContext(myContext);
    const {products,setProducts,addProduct} = context
    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className='  px-10 py-10 rounded-xl border border-gray-500 bg-gray-50'>
                    <div className="">
                        <h1 className='text-center text-black text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    <div>
                        <input type="text"
                       onChange={(e) => setProducts({ ...products, title: e.target.value })} value={products.title}
                            name='title'
                            className=' bg-white-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-00 outline-none border border-gray-500'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='price'
                            onChange={(e) => setProducts({ ...products, price: e.target.value })} value={products.price}
                            className=' bg-white-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-300 outline-none border border-gray-500'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='imageurl'
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })} value={products.imageUrl}
                            className=' bg-white-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-300 outline-none border border-gray-500'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='category'
                            onChange={(e) => setProducts({ ...products, category: e.target.value })} value={products.category}
                            className=' bg-white-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-300 outline-none border border-gray-500'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                        <input type="integer"
                            name='star'
                            onChange={(e) => setProducts({ ...products, star: e.target.value })} value={products.star}
                            className=' bg-white-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-300 outline-none border border-gray-500'
                            placeholder='Rating'
                        />
                    </div>
                    <div>
                       <textarea cols="30" rows="10" 
                       name='description' onChange={(e) => setProducts({ ...products, description: e.target.value })} value={products.description}
                            className=' bg-white-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-300 outline-none border border-gray-500'
                            placeholder='Product description'>

                       </textarea>
                    </div>
                    
                    <div className=' flex justify-center mb-3'>
                        <button
                        onClick={addProduct}
                            className="focus:outline-none text-white  hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"style={{background:'linear-gradient(to top,#0a3d9f, rgb(4 33 89))'}}>
                            Add Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default AddProduct