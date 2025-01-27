import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = ({ isUserLogin }) => {
    const navigate = useNavigate();

    const [isDialogueOpen, setIsDialogueOpen] = useState(false);
    const [authCode, setAuthCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [authEndpoint, setAuthEndpoint] = useState('validate_employee')

    useEffect(() => {
      if (isUserLogin) {
        setIsDialogueOpen(true);
        setAuthEndpoint('validate_user');
      } else {
        setIsDialogueOpen(false);
        setAuthEndpoint('validate_employee');
      }
    
    }, [isUserLogin])

    const handleAdminLogin = () => {
        setIsDialogueOpen(!isDialogueOpen);
        setAuthEndpoint('validate_employee');
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${authEndpoint}/${authCode}`);

            const result = await response.json();
            console.log(result);

            if (response.ok && result.valid) {
                // Save employee role and code to local storage
                if (authEndpoint == 'validate_employee') {
                    localStorage.setItem('role', result.employee_details.role);
                } else {
                    localStorage.setItem('role', result.user_details.role);
                }
                localStorage.setItem('authCode', authCode);

                // Optionally close the dialogue or give success feedback
                setIsDialogueOpen(false);
                alert('Login successful.');
                navigate('/dashboard');
            } else {
                // Handle invalid code response
                setErrorMessage(result.message || 'Invalid employee code.');
            }
        } catch (error) {
            // Handle errors like network issues
            setErrorMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className='w-100 text-white'>
            <button 
                className='btn btn-primary btn-c p-3 px-4 float-end'
                onClick={handleAdminLogin}
            >
                Admin Login →
            </button>

            <div className={`${!isDialogueOpen ? 'd-none' : 'd-flex'} w-100 h-80 align-items-center`}>
                <div className="form-card">
                    <form className="mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="authCode" className="form-label mb-5">
                                <h5>Login</h5>
                                <span className='fs-10 text-secondary-2'>
                                    Enter access code to gain access.
                                </span>
                            </label>
                            <input
                                type="text"
                                className="input-border-bottom mb-3"
                                id="authCode"
                                placeholder="Enter your employee code"
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && (
                            <div className="text-danger mb-3">
                                {errorMessage}
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary w-80">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminAuth;
