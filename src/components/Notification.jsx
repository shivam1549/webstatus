import React, { useEffect, useState } from 'react'

const Notification = ({ message }) => {
    const [showNotification, setShowNotification] = useState(false);

    const triggerNotification = () => {
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 5000);
    }

    useEffect(() => {
        triggerNotification();
    }, [])
    return (
        showNotification && (
            <div className='notification'>{message}</div>
        )

    )
}

export default Notification