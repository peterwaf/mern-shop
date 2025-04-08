// eslint-disable-next-line no-unused-vars
import React from "react";
import successImage from '/images/pexels-olly-3813341.jpg';
// import failedImage from './images/pexels-guy-kawasaki-783630-1654494.jpg';

function VerifyAccountSuccess() {
  return (
    <div className="mt-40 md:mt-32 px-8 py-8 h-auto">
      <div className="bg-white border border-amber-600 border-dotted rounded-md p-4 flex flex-col items-center justify-start h-auto">
        <h1 className="font-bold text-2xl pb-4">Account Verified Successfully, <a className="text-amber-600 hover:underline" href="/login">Login</a></h1>
        <img src={successImage} alt="Success" className="w-1/2 rounded" />
      </div>
    </div>
  );
}

export default VerifyAccountSuccess;
