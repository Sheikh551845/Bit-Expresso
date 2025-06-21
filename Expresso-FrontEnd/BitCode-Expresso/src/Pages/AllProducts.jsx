import React, { useEffect, useState } from 'react';
import GeneralCard from '../Components/GeneralCard';
import chobi from '../images/more/1.png';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        fetch('https://expresso-back-end.vercel.app/AllCoffees')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setSortedProducts(data);
            });
    }, []);

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOption(value);

        const sorted = [...products];

        if (value === 'likes') {
            sorted.sort((a, b) => b.likes - a.likes);
        } else if (value === 'price') {
            sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }

        setSortedProducts(sorted);
    };

    return (
        <div
            className="bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url(${chobi})` }}
        >
          
            <div className=" w-[90%] md:w-[80%] mx-auto pt-10 pb-20 min-h-screen">
                <h1 className="text-3xl md:text-5xl font-bold text-center text-[#6f4e37] mb-8">
                    All Coffees
                </h1>

                <div className="flex justify-end mb-6">
                    <select
                        onChange={handleSortChange}
                        value={sortOption}
                        className="px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-800"
                    >
                        <option value="">Sort By</option>
                        <option value="likes">Most Liked</option>
                        <option value="price">Lowest Price</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((coffee) => (
                        <GeneralCard key={coffee._id} Coffee={coffee} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
