import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContexr'
import {useDispatch, useSelector} from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'

function ProductCard({limit}) {
    const context = useContext(myContext);
    const { mode, product, filterPrice, filterType, searchkey } = context;
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 900);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const addCart = (event, product) => {
        event.stopPropagation(); // Prevent parent click event
        dispatch(addToCart(product));
        toast.success('Added to cart');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
    // Determine the number of products to display
    const displayedProducts = limit ? product.slice(0, limit) : product;

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                

                <div className="flex flex-wrap -m-4" /*style={isSmallScreen ? {marginLeft:'5%', marginRight:'5%'}:{}}*/>
                    {displayedProducts
                        .filter((obj) => obj.title.toLowerCase().includes(searchkey))
                        .filter((obj) => obj.category.toLowerCase().includes(filterType))
                        .filter((obj) => obj.price.includes(filterPrice))
                        .map((item, index) => {
                            const { title, price, imageUrl, id, description } = item;
                            
                            return (
                                <div
                                    key={index}
                                    className="p-4 md:w-1/4 drop-shadow-lg" style={isSmallScreen ? {width:'100%'} :{}}
                                    onClick={() => window.location.href = `/productinfo/${id}`}
                                >
                                    <div
                                        className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                    >
                                        <div className="flex justify-center cursor-pointer">
                                            <img
                                                className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-transform duration-300 ease-in-out"
                                                src={imageUrl}
                                                alt="product"
                                            />
                                        </div>
                                        <div className="p-5 border-t-2">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                Event
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {title}
                                            </h1>
                                            <p class="flex gap-2 mt-2 whitespace-nowrap text-[.825rem] items-center" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                <span class="flex items-center font-[600]  text-[#000000] ">₹{price - price/100*10}</span>
                                                <span class="flex items-center font-[400]  text-[gray] line-through ">₹{price}</span>
                                                <span class="flex items-center text-[#00a807] font-[400]">₹{price/100*0.5} off</span>
                                            </p>
                                            <div className="flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={(event) => addCart(event, item)}
                                                    className="focus:outline-none text-white  hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"style={{background:'linear-gradient(to top,#0a3d9f, rgb(4 33 89))'}}
                                                >
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}

export default ProductCard;