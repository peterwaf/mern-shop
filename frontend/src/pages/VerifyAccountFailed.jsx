// eslint-disable-next-line no-unused-vars
import React from "react";
import failedImage from '/images/pexels-guy-kawasaki-783630-1654494.jpg';

function VerifyAccountFailed() {
  return (
    <div className="mt-40 md:mt-32 px-8 py-8 h-auto">
      <div className="bg-white border border-amber-600 border-dotted rounded-md p-4 flex flex-col items-center justify-start h-auto">
        <h1 className="font-bold text-2xl pb-4">Account Verification Failed,Use a valid link</h1>
        <img src={failedImage} alt="Success" className="w-1/2 rounded" />
      </div>
    </div>
  );
}

export default VerifyAccountFailed;
