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
    <div className="navbar bg-gradient-to-r from-sky-500 to-indigo-500 p-3">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">MeltingPot</a>
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
          <label htmlFor="my-modal-login" className="btn ml-3">
            Login
          </label>
          <Login isLogged={isLogged} setIsLogged={setIsLogged} />
        </>
      )}
    </div>
  );
};

export default NavBar;
