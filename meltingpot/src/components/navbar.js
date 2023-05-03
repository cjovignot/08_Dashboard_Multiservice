import Login from '../components/login';

const NavBar = () => {

    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">MELTING POT</a>
            </div>
            <label htmlFor="my-modal-login" className="btn">Login</label>
            <Login />
        </div>
    );
}

export default NavBar;