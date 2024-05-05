import React from 'react';

const IconCard = (props) => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <div className="card flex flex-col justify-center py-5 px-8 bg-white rounded-lg shadow-2xl transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200">
          <div className="prod-img hover:border-red-500">
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
