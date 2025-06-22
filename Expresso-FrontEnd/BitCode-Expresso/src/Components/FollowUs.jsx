import React from 'react';
import one from '../images/cups/Rectangle 9.png';
import two from '../images/cups/Rectangle 10.png';
import three from '../images/cups/Rectangle 11.png';
import four from '../images/cups/Rectangle 12.png';
import five from '../images/cups/Rectangle 13.png';
import six from '../images/cups/Rectangle 14.png';
import seven from '../images/cups/Rectangle 15.png';
import eight from '../images/cups/Rectangle 16.png';

const FollowUs = () => {
    return (
        <div className="w-[90%] md:w-[80%] mx-auto my-10 text-center">
            <p className="text-[#6f4e37]">--- Follow Us ---</p>
            <p className="text-2xl font-bold text-[#6f4e37] mb-6">On Facebook</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                {[one, two, three, four, five, six, seven, eight].map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`cup-${idx}`}
                        className="w-full h-auto object-cover rounded shadow-md"
                    />
                ))}
            </div>
        </div>
    );
};

export default FollowUs;
