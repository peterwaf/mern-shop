// eslint-disable-next-line no-unused-vars
import React, { use } from "react";
import successImage from "/images/pexels-olly-3813341.jpg";
import failedImage from "/images/pexels-guy-kawasaki-783630-1654494.jpg";
import { useParams } from "react-router-dom";

function ResetPasswordStatus() {
  const { status } = useParams();

  return (
    <div className="mt-40 md:mt-32 px-8 py-8 h-auto">
      <div className="bg-white border border-amber-600 border-dotted rounded-md p-4 flex flex-col items-center justify-start h-auto">
        <h1 className="font-bold text-2xl pb-4">
          {status === "success" ? (
            <>
              Password Reset Successfully,{" "}
              <a className="text-amber-600 hover:underline" href="/login">
                Login
              </a>
            </>
          ) : (
            <>
              Something went wrong,try again {" "}
              <a
                className="text-amber-600 hover:underline"
                href="/forgot-password"
              >
                Reset Password
              </a>
            </>
          )}
        </h1>
        <img
          src={status === "success" ? successImage : failedImage}
          alt={status === "success" ? "Success" : "Failed"}
          className="w-1/2 rounded"
        />
      </div>
    </div>
  );
}

export default ResetPasswordStatus;
