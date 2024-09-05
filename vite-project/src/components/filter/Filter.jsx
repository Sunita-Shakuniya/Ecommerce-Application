import React, { useContext } from 'react'
import myContext from '../../context/data/myContexr'


function Filter() {
    const context = useContext(myContext)
    const { mode,filterPrice,filterType, searchkey,setSearchkey,setFilterType,setFilterPrice, product } = context
    const resetFilters = () =>{
        setSearchkey('');
        setFilterType('');
        setFilterPrice('');
    };
    return (
        <div>
           <div className=' container mx-auto px-4 mt-5 '>
                <div className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200">                
                    <div className="flex items-center justify-between mt-4">
                        <p className="font-medium text-gray-800">
                            Filters
                        </p>
                        
                    </div>
                    <div>
                        <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}  className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                {product.map((item, index) => {
                                    return (
                                        <option key={index} value={item.category}>{item.category}</option>
                                    )
                                })}
                            </select>
                            <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0  focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                {product.map((item, index) => {
                                    return (
                                        <option key={index} value={item.price}>{item.price}</option>
                                    )
                                })}
                            </select>
                            <button onClick={resetFilters} className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" style={{ color: mode === 'dark' ? 'white' : '' }}>
                            Reset Filter
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter