import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowFeedback() {
    const [showFeedback, setShowFeedback] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/showFeedback')
            .then(response => {
                setShowFeedback(response.data.data); // Assuming response has structure { data: [...] }
            })
            .catch(error => {
                setError(error);
                console.error('Error fetching feedback:', error);
            });
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            {error && <p>Error fetching feedback: {error.message}</p>}
            <ul>
                {showFeedback.map(feedback => (
                    <li key={feedback.id}>
                        {feedback.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShowFeedback;
