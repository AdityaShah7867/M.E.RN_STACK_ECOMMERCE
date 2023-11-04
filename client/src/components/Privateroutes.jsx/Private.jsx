import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const Private = () => {
    // const [isAuth, setisAuth] = useState(false);
    const token = localStorage.getItem('token');



    return (
        <>
            {token ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
};

export default Private;