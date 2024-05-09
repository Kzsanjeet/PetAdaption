import React from 'react';

const IconCard = (props) => {
  return (
    <div className="flex justify-center items-center cursor-pointer">
      <div>
        <div className="card flex flex-col justify-center py-5 px-8 bg-white rounded-lg shadow-2xl border-indigo-500 border-2 border-opacity-0 transition ease-in-out transform hover:-translate-y-1 hover:scale-110 duration-200 hover:bg-gray-200 hover:border-indigo-800 hover:border-2">
          <div className="prod-img">
            <img src={props.icon} className="sm-6 object-cover object-center" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
            <p className="m-auto font-normal">{props.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconCard;