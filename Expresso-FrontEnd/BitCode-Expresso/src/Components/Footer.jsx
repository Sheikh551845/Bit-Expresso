import React from 'react';
import logo from '../images/more/logo1.png';
import bg from '../images/more/13.jpg';
import { FaFacebook, FaGithub, FaPhone } from "react-icons/fa";
import { FaLinkedin } from 'react-icons/fa6';
import { MdMail } from 'react-icons/md';

const Footer = () => {
  return (
    <div>
      <footer
        className="bg-base-200 bg-cover bg-center text-black shadow-sm items-center p-4"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className='flex flex-col md:flex-row justify-between items-center w-full md:w-[80%] mx-auto gap-4'>
          
          {/* Left Section */}
          <div className='flex flex-col items-start gap-2'>
            <div className="flex justify-center items-center gap-2">
              <img className='w-7 h-7 md:w-10 md:h-10 bg-white rounded-full' src={logo} alt="Logo" />
              <p className='text-sm md:text-xl font-bold'>Bit Expresso</p>
            </div>
            <p className='text-start text-xs md:text-base'>
              Always ready to be your friend. Come & Contact with us to share your <br />
              memorable moments, to share with your best companion.
            </p>
          </div>

          {/* Right Section */}
          <div className='flex flex-col gap-4'>
            <div className='flex gap-4 justify-center'>
              <a className='text-xl md:text-3xl' href='https://github.com/Sheikh551845' target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a className='text-xl md:text-3xl' href='https://www.facebook.com/sheikhmohammod.asif.90' target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
              <a className='text-xl md:text-3xl' href='https://www.linkedin.com/in/sheikh-mohammad-zia-uddin-09860123b' target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </div>

            <div>
              <p className='text-base md:text-2xl font-bold'>Get in Touch</p>
              <div className='flex gap-2 items-center py-1'>
                <FaPhone className='w-4 h-4' />
                <p className='text-sm md:text-base'>+8801851308413</p>
              </div>
              <div className='flex gap-2 items-center'>
                <MdMail className='w-4 h-4' />
                <p className='text-sm md:text-base'>sheikh551845@gmail.com</p>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;
