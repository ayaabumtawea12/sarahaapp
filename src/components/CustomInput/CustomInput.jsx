import React from 'react';

const CustomInput = ({text, name, type,onChange,error}) => {

  return (
    <>
    <input type={type} name={name} onChange={onChange} placeholder={text} className="form-control mt-4"/>
{error && (
    <div className="alert alert-danger">
    {error}
    </div>
)}
      
    </>
  );
};

export default CustomInput;
