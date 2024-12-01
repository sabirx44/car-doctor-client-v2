import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "./firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribeAuthListener = onAuthStateChanged(auth, (authUser) => {
            // Set loading state while processing authentication change
            setLoading(true);

            // Determine the user's email; if no authUser, fall back to default user state
            const userEmail = authUser?.email || user?.email;
            const userPayload = { email: userEmail };

            // Set the current user in state
            setUser(authUser);
            console.log("Authenticated User: ", authUser);
            setLoading(false);

            if (authUser) {
                // If user is logged in, request JWT token
                axios.post('https://car-doctor-server-v2-c57l2wixi-codtob.vercel.app/jwt', userPayload, { withCredentials: true })
                    .then(response => {
                        console.log("JWT Token Response: ", response.data);
                    })
                    .catch(error => console.error("Error fetching token: ", error));
            } else {
                // If no user, trigger logout in the backend
                axios.post('https://car-doctor-server-v2-c57l2wixi-codtob.vercel.app/logout', userPayload, { withCredentials: true })
                    .then(response => {
                        console.log("Logout Response: ", response.data);
                    })
                    .catch(error => console.error("Error during logout: ", error));
            }
        });

        // Cleanup the auth listener when component unmounts
        return () => unsubscribeAuthListener();
    }, [user]);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;