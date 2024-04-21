import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="bg-gray-800 py-4 text-gray-400">
        <div className="container px-4 mx-auto">
            <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 my-4 w-full xl:w-1/5">
                <a href="/" className="block w-56 mb-10">
                <svg version="1.1" viewBox="0 0 3368 512" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd">
                    <g transform="translate(0 -75)">
                        <g transform="translate(0 75)">
                        <rect width="512" height="512" rx="128" fill="#3D5AFE"></rect>
                        <rect x="149" y="176" width="220" height="220" fill="#fff"></rect>
                        <circle cx="259" cy="156" r="40" fill="#fff"></circle>
                        <circle cx="369" cy="286" r="40" fill="#2962FF"></circle>
                        </g>
                        <text fill="white" fontFamily="Nunito-Bold, Nunito" fontSize="512" fontWeight="bold">
                        <tspan x="654" y="518">PetRescue</tspan>
                        </text>
                    </g>
                    </g>
                </svg>
                </a>
                <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas id iure consequuntur nobis rem porro eaque. Nostrum aliquid error, omnis totam non maxime. Dolore delectus at consequuntur amet, non eligendi fugit dolores ipsam repudiandae possimus. Odit, itaque omnis!
                </p>
            </div>

            <div className="px-4 my-4 w-full sm:w-auto">
                <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Company</h2>
                </div>
                <ul className="leading-8">
                <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms &amp; Conditions</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
                </ul>
            </div>
            <div className="px-4 my-4 w-full sm:w-auto">
                <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Blog</h2>
                </div>
                <ul className="leading-8">
                <li><a href="#" className="hover:text-blue-400">Stories of Love and Hope in Pet Adoption</a></li>
                <li><a href="#" className="hover:text-blue-400">A Journey of Healing and Joy</a></li>
                <li><a href="#" className="hover:text-blue-400">Tales from the World of Pet Rescue</a></li>
                <li><a href="#" className="hover:text-blue-400">The Heartwarming Journey of Pet Rescue</a></li>
                </ul>
            </div>
            <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
                <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Connect With Us</h2>
                </div>
                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
                </a>
                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.493 5.197-37.661 14.545-53.258 52.603 64.568 131.681 106.801 220.846 111.675-1.624-7.797-2.599-15.918-2.599-24.04 0-57.753 46.782-104.859 104.859-104.859 30.213 0 57.103 12.67 75.62 33.137 23.39-4.548 45.13-13.319 64.243-25.34-7.798 23.715-23.39 43.506-44.507 56.826 20.467-2.273 40.933-7.798 59.446-15.268-13.645 20.141-30.214 37.336-49.381 51.653z"></path>
                </svg>
                </a>
                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 0C114.617 0 0 114.615 0 256s114.617 256 256 256c141.385 0 256-114.615 256-256S397.385 0 256 0zm123.438 176H378c-6.617 0-12 5.383-12 12v208c0 6.617 5.383 12 12 12h22.438c32.38 0 56.562-7.75 73.281-23.25 16.719-15.5 25.219-39.75 25.219-72v-56.75c0-31.083-7.313-54.583-21.938-70.5C391.417 70.959 371.763 64 347.5 64c-15.125 0-31.5 4.25-49.25 12.75V76c0-6.617-5.383-12-12-12h-38.562C188.88 63.688 176 78.687 176 102v54.75c-17.188-8.5-34.062-14.969-50.625-19.406-16.563-4.438-30.375-6.688-41.438-6.688-18.438 0-32.062 6.188-40.875 18.563C36.938 156.969 32 172.833 32 192.281v59.25c0 31.271 8.5 55.75 25.219 72.438C73.938 296.688 98.12 304 130.5 304H152c6.617 0 12-5.383 12-12V92c0-6.617-5.383-12-12-12H130.5c-23.479 0-43.125 6.75-58.938 20.25C58.594 113.625 50 138.646 50 173.875v13.25C33.812 203.375 24 228.688 24 256c0 27.969 8.688 53.063 25.875 75.25C50.062 347.938 64.938 360 79.125 368c14.25 8.125 31.5 12.25 51.938 12.25 11.062 0 25.75-2.25 44.25-6.938 18.562-4.688 39.875-11.25 63.813-19.75v79.438c0 6.617 5.383 12 12 12h22.438c6.617 0 12-5.383 12-12V188c0-6.617-5.383-12-12-12z"></path>
                </svg>
                </a>
            </div>
            </div>
        </div>
        </footer>

    </>
  )
}

export default Footer