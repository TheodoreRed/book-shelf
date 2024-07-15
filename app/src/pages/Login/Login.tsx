import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <Link
          className="absolute text-xl transition ease-in-out top-10 left-10 hover:underline"
          to="/"
        >
          Back
        </Link>
      </div>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">Login Portal</h1>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faGoogle} className="pr-2" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
