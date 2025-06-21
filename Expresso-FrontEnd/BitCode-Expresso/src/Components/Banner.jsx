import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../images/more/3.png'; // adjust if needed

const Banner = () => {
    return (
        <div>
            <div
                className="bg-cover bg-center h-[75vh] flex items-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="w-[90%] md:w-[80%] mx-auto flex justify-end items-center text-white text-start">
                    <div className="max-w-xl p-2 md:p-4">
                        <p className="font-bold text-lg md:text-2xl leading-snug">
                            Would you like a Cup of Delicious Coffee?
                        </p>
                        <p className="text-sm md:text-base py-2 md:py-4 leading-relaxed">
                            It's coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!! Your companion of every moment!!!
                            <br />
                            Enjoy the beautiful moments and make them memorable.
                        </p>
                        <Link to="/AllProducts">
                            <button className="btn btn-warning text-white text-sm md:text-base">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
