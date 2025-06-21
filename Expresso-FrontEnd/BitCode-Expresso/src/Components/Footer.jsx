import React from 'react';
import logo from '../images/more/logo1.png';
import { FaFacebook, FaGithub, FaPhone } from "react-icons/fa";
import { FaLinkedin } from 'react-icons/fa6';
import { MdMail } from 'react-icons/md';


const Footer = () => {
  return (
    <div>
      <footer className=" bg-base-200 bg-cover bg-center text-black shadow-sm items-center p-4" style={{ backgroundImage: "url('./src/images/more/13.jpg')" }}>
        <div className='flex justify-between items-center w-full md:w-[80%] mx-auto gap-2'>
          <div className='flex flex-col items-start gap-1'>
             <div className="flex justify-center items-center gap-2">
                <img className='w-7 h-7 md:w-10 md:h-10 bg-white rounded-full' src={logo} alt="" />
                <p className='text-sm md:text-xl font-bold'>Bit Expresso</p>
              </div>
            <p className='text-start text-xs md:text-base'>Always ready to be your friend. Come & Contact with us to share your <br></br>memorable moments, to share with your best companion.</p>

          </div>

          <div>
            <nav className="flex gap-4 md:place-self-center md:justify-self-end">

              <div className='flex flex-col gap-4'>

                <div className='flex gap-2'>
 < a className=' text-xl md:text-4xl' href='https://github.com/Sheikh551845'>
                  <FaGithub></FaGithub>
                </a>


                <a className='text-xl md:text-4xl' href='https://www.facebook.com/sheikhmohammod.asif.90' >
                  <FaFacebook></FaFacebook>
                </a>

                <a className='text-xl md:text-4xl' href='https://www.linkedin.com/in/sheikh-mohammad-zia-uddin-09860123b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>
                  <FaLinkedin></FaLinkedin>
                </a>

                </div>
                
              <div>
                <p className='text-base md:text-2xl font-bold'>
                  Get in Touch
                </p>
                <div className='flex gap-2 items-center py-2'>
                  <FaPhone className='w-3 h-3'></FaPhone>
                  <p>+8801851308413</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <MdMail className='w-3 h-3'></MdMail>
                  <p>sheikh551845@gmail.com</p>
                </div>

              </div>
               
              </div>



            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;