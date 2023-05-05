import Login from "../components/login";
import Signup from "../components/signup";
import Cookies from "js-cookie";
const NavBar = ({ isLogged, setIsLogged }) => {
  const handleLogout = () => {
    localStorage.removeItem("userJwtToken");
    Cookies.remove("userId");
    setIsLogged(false);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>

      {!isLogged && (
        <label htmlFor="my-modal-signup" className="btn">
          Sign up
        </label>
      )}
      <Signup />
      {isLogged ? (
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      ) : (
        <>
          <label htmlFor="my-modal-login" className="btn">
            Login
          </label>
          <Login isLogged={isLogged} setIsLogged={setIsLogged} />
        </>
      )}
    </div>
  );
};

export default NavBar;
