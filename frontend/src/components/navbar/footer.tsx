import React from "react";
import { IconBrandInstagram, IconBrandX, IconBrandYoutube, IconMail, IconMapPin, IconPhoneFilled } from '@tabler/icons-react';

export function Footer() {
    return (
        <>
            <div id="footer" className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
                <div className="p-5">
                    <ul>
                        <p className="text-gray-800 font-bold text-3xl pb-6">
                            Bannerghatta<span className="text-blue-600"> Zoo</span>
                        </p>
                        <div className="flex gap-6 pb-5">
                            <a href="#" aria-label="Instagram" className="text-2xl cursor-pointer hover:text-yellow-600"><IconBrandInstagram /></a>
                            <a href="#" aria-label="Twitter" className="text-2xl cursor-pointer hover:text-blue-600"><IconBrandX /></a>
                            <a href="#" aria-label="YouTube" className="text-2xl cursor-pointer hover:text-red-600"><IconBrandYoutube /></a>
                        </div>
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="text-gray-800 font-bold text-2xl pb-4">Quick Links</p>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                            <a href="/about">About Us</a>
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                            <a href="/animals">Our Animals</a>
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                            <a href="/tickets">Plan Your Visit</a>
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                            <a href="/adopt">Conservation</a>
                        </li>
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="text-gray-800 font-bold text-2xl pb-4">Zoo Timings</p>
                        <li className="text-gray-500 text-md pb-2 font-semibold">
                            Tuesday - Sunday
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold">
                            9:30 AM - 5:30 PM
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold">
                            (Gates close at 5:00 PM)
                        </li>
                        <br />
                        
                        <li className="text-md pb-2 font-semibold text-red-600">
                            Closed on all Mondays
                        </li>
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="text-gray-800 font-bold text-2xl pb-4">Contact Info</p>
                        <li className="text-gray-500 text-md pb-2 font-semibold flex items-start gap-2">
                            <IconMapPin />
                            <div>
                                Bengaluru Gandhi Zoological Park & WRC<br />
                                Bannerghatta, Bengaluru, <br />
                                Karnataka 560083.
                            </div>
                        </li>
                        <li className="text-gray-500 text-md py-2 font-semibold">
                            <a href="tel:+918029776466" className="flex items-center gap-2 hover:text-blue-600">
                                <IconPhoneFilled />
                                <div>080 - 1234567</div>
                            </a>
                        </li>
                        <li className="text-gray-500 text-md pb-2 font-semibold">
                            <a href="mailto:info@bannerghattazoo.org" className="flex items-center gap-2 hover:text-blue-600">
                                <IconMail />
                                info@benagaluruzoo.org
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-50">
                <h1 className="text-gray-800 font-semibold">
                    © 2025 All rights reserved | Bengaluru Gandhi Zoological Park & Wildlife Research Center
                </h1>
            </div>
        </>
    );
}