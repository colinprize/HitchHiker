import { useState, useEffect } from "react";

const useUser = (token) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`${process.env.REACT_APP_HIKES_API_SERVICE_API_HOST}/token`, {
                headers: {
                    Authorization: `bearer ${token}`,
                }
            });
            const result = await res.json();
            setUser(result.account);
        }
        if (token) {
            getUser();
        }
    }, [token])
    return user;
};

export default useUser;
