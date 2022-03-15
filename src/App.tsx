import React from 'react';
import './App.css';
import { User } from './utils/types';
import * as api from '././utils/api';
import SignedOutPage from './Components/SignedOutPage';
import LoggedInPage from './Components/LoggedInPage';
import SignupForm from './Components/SignupForm';
import { Link } from 'react-router-dom';

const App = function () {
    const [userData, setUserData] = React.useState<User | null>(null);
    const [shouldShowRegisterModal, setShouldShowRegisterModal] =
        React.useState<boolean>(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        api.signInWithJWT().then((resp) => {
            console.log(resp);
            if (!resp) return;

            resp.data && setUserData(resp.data);
        });
    }, []);

    const handleLogin = React.useCallback(
        (email, password) => {
            setError(null);

            return api.handleLogin({ email, password }).then((resp) => {
                if (resp.error) return setError(resp.error);

                return setUserData(resp.data);
            });
        },
        [api.handleLogin, setUserData, setError]
    );

    const toggleRegisterModal = React.useCallback((): void => {
        setError(null);

        setShouldShowRegisterModal(!shouldShowRegisterModal);
    }, [shouldShowRegisterModal, setShouldShowRegisterModal]);

    return (
        <div>
            <header>
                <img
                    onClick={(e) =>
                        api.handleSignUp({
                            fullName: 'a',
                            email: 'asreqsdswweqweeeqqqwtaaa',
                            password: 'a123',
                        })
                    }
                    src='./src/logo.png'
                />
            </header>
            <main>
                {userData ? (
                    <LoggedInPage userData={userData} />
                ) : (
                    <SignedOutPage
                        handleToggleRegister={toggleRegisterModal}
                        handleLogin={handleLogin}
                    />
                )}
                {error && <p className='error-message'>{error}</p>}
            </main>
            <SignupForm
                isOpen={shouldShowRegisterModal}
                handleClose={toggleRegisterModal}
            />
        </div>
    );
};

export default App;
