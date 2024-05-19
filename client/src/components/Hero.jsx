import React, { useState, useEffect } from 'react';
import dogandkids from '../assets/images/dogandkids.jpeg';
import { Link } from 'react-router-dom';

const Hero = ({ title, title2 }) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    const renderTitleWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index !== text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <>
            <div
                className="relative overflow-hidden bg-cover bg-no-repeat bg-center h-[700px]"
                style={{ backgroundImage: `url(${dogandkids})` }}
            >
                <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.75)]">
                    <div className="flex h-full items-center justify-center">
                        <div className="px-6 text-center text-white md:px-12">
                            <h1 className="mt-6 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                                {renderTitleWithLineBreaks(title)}
                                <br />
                                {title2}
                            </h1>
                            {!isLogged && (
                                <>
                                    <Link to="/signup">
                                        <span className="inline-block rounded-full px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-20 hover:text-neutral-200 focus:text-neutral-200 focus:outline-none focus:ring-0 active:text-neutral-300"
                                            data-te-ripple-init data-te-ripple-color="light" href="#!" role="button">Register</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
