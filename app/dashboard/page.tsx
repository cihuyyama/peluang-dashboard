"use client"
import { BASE_URL } from '@/types/BaseURL';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const DashboardPage = () => {
    const [user, setUser] = React.useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookieValue = document.cookie.split('; ')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1];
                const response = await fetch(`${BASE_URL}/users`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${cookieValue}`,
                    }
                });
                const data = await response.json();
                setUser(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>{user ? `Welcome, ${user.email}` : 'Loading...'}</p>
        </div>
    )
}

export default DashboardPage