import { useEffect, useState } from "react";

const useServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://car-doctor-server-v2-c57l2wixi-codtob.vercel.app')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return services;
};

export default useServices;