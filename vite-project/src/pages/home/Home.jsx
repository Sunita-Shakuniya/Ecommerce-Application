import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContexr';
import HeroSection from '../../components/heroSection/HeroSection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';
import { useSelector } from 'react-redux';
import Contact from '../../components/contact/Contact';
import Topcategory from '../../components/topcategory/Topcategory';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const cartItem = useSelector((state) => state.cart)
    console.log(cartItem)
  return (
      <Layout>
        <HeroSection/>
        <Topcategory/>
        <Contact/>
        <div>
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10 pl-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: '#042159'}}>
                Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>
          <ProductCard limit={8}/>
          <div className="flex justify-center mt-1 mb-8">
                <Link to="/allproducts">
                    <button
                        type="button"
                        className="focus:outline-none text-black bg-white-200 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center flex items-center gap-2 border border-black-1000"
                    >
                        View 
                        <FontAwesomeIcon icon={faCircleChevronDown} />
                    </button>
                </Link>
            </div>
        </div>
        <Contact/>
        <Testimonial/>
        
      </Layout>
  )
}

export default Home
