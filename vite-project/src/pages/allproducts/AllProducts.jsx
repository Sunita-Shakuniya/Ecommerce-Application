import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Filter from '../../components/filter/Filter'
import myContext from '../../context/data/myContexr'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import ProductCard from '../../components/productCard/ProductCard'

function AllProducts() {
  
  const context = useContext(myContext)
  const { mode,product, filterPrice,filterType,searchkey,setSearchkey,setFilterType,setFilterPrice } = context
  const dispatch = useDispatch()
  const cartItems = useSelector((state)=>state.cart) 
  const addCart=(product)=>{
      dispatch(addToCart(product));
      toast.success('add to cart')
  }
  useEffect(()=>{
      localStorage.setItem('cart',JSON.stringify(cartItems));
  },[cartItems])
  return (
    <Layout>
      <Filter/>
      <div>
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10 mt-8 ml-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: '#042159'}}>
              Our Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>
        <ProductCard/>
      </div>
    </Layout>
  )
}

export default AllProducts
