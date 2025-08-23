import React from "react";
// import { FaInstagram } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandX, IconBrandYoutube, IconMail, IconMapPin, IconPhoneFilled } from '@tabler/icons-react'
export function Footer() {
	return (
		<>
			<div id="footer" className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
				<div className="p-5 ">
					<ul>
						<p className="text-gray-800 font-bold text-3xl pb-6">
							Zoological<span className="text-blue-600">Park</span>
						</p>
						<div className="flex gap-6 pb-5">
							<IconBrandInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
							<IconBrandX className="text-2xl cursor-pointer hover:text-blue-600" />
							<IconBrandLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
							<IconBrandYoutube className="text-2xl cursor-pointer hover:text-red-600" />
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Quick Links</p>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Home
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							About Zoo
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Visitors
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Animals
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Zoo Timings</p>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							FROM 1ST APRIL TO 15TH JUNE
							- 9:00 AM TO 6:00 PM <br />
							(Zoo gates closes at 6:30 pm)
						</li>
						<br />
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							FROM 16TH JUNE TO 31ST MARCH
							- 10:00 AM TO 5:00 PM <br />
							(Zoo gates closes at 5:30 pm)
						</li>
						<br />
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							The Zoo will remain closed on all Mondays
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Contact Info</p>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer flex items-center gap-2">
							<IconMapPin /> Bannerghatta Rd, Bannerughatta,
							<br />
							Bengaluru, Karnataka 560083.
						</li>
						<br />
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							<a href="tel:+08029776466" className="flex items-center gap-2">
								<IconPhoneFilled />
								<div>080 - 29776466</div>
							</a>
						</li>
						<br />
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							<a href="mailto:zoo@banglorecorporation.org" className="flex items-center gap-2">
								<IconMail />
								zoo@banglorecorporation.org
							</a>
						</li>
						{/* <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Downloads & Resources
						</li>
						<li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Videos
						</li> */}
					</ul>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
				<h1 className=" text-gray-800 font-semibold">
					© 2025-2026 All rights reserved | Build with ❤ by{" "}
					<span className="hover:text-blue-600 font-semibold cursor-pointer">
						Ritu Raj{" "}
					</span>
				</h1>
			</div>
		</>
	);
}
