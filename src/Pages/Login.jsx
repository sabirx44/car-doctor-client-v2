import { Link } from 'react-router-dom';
import login from '../assets/images/login/login.svg';
import useAuth from '../hooks/useAuth';
// import { useContext } from 'react';
// import { AuthContext } from '../AuthProvider';

const Login = () => {
    // const { signIn } = useContext(AuthContext);
    const { signIn } = useAuth();
    console.log(location);

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = e.target.elements;

        try {
            const { user } = await signIn(email.value, password.value);
            console.log(user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div>
                    <img src={login} alt="login img" />
                </div>
                <div className="card bg-base-100 max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p>New to this website? <Link to="/signUp">Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;