import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const logoutFnc = () => {
    try {
      signOut(auth)
        .then(() => {
          navigate("/login");
          toast.success("User logged out");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <div className="bg-blue-500 h-[8vh] flex justify-between text-white p-3 ">
      <div>
        <p>Financely</p>
      </div>
      {user && (
        <div className="flex gap-5 ">
          {user?.photoURL && (
            <img src={user?.photoURL} className="rounded-xl " alt="logo" />
          )}
          <p
            className="text-gray-400 hover:text-white cursor-pointer "
            onClick={logoutFnc}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
