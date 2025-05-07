import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

export const AuthModal = ({ type, show, handleClose, sendRequest }) => {
    const [confirm, setConfirm] = useState({ success: false, message: "" });
    useEffect(() => {
        if (!show) {
            setConfirm({ success: false, message: "" });
        }
    }, [show]);

    let Email;
    let Password;
    let ConfirmPassword;

    const handlerSendRequest = async () => {
        const res = await sendRequest({ type: type, Email, Password });
        setConfirm(res);
        if (!res.success) {
            handleClose();
        }
    }

    const handleRegister = async () => {
        if (Password !== ConfirmPassword) {
            setConfirm({ success: true, message: "Passwords do not match." });
            return;
        }
        handlerSendRequest();
    };


    return (
        <>
            {type == "Login" ? <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className={`form-control mb-2 ${confirm.success ? 'is-invalid' : ''}`} placeholder="Email" onChange={(e) => Email = e.target.value} />
                    <input className={`form-control mb-2 ${confirm.success ? 'is-invalid' : ''}`} placeholder="Password" type="password" onChange={(e) => Password = e.target.value} />
                </Modal.Body>
                {confirm.success && <small className='text-danger ms-3'>{confirm.message}</small>}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlerSendRequest}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal> :
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            className={`form-control mb-2 ${confirm.success ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            onChange={(e) => Email = e.target.value}
                        />
                        <input
                            className={`form-control mb-2 ${confirm.success ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            type="password"
                            onChange={(e) => Password = e.target.value}
                        />
                        <input
                            className={`form-control mb-2 ${confirm.success ? 'is-invalid' : ''}`}
                            placeholder="Confirm Password"
                            type="password"
                            onChange={(e) => ConfirmPassword = e.target.value}
                        />
                    </Modal.Body>
                    {confirm.success && (<small className="text-danger ms-3">{confirm.message}</small>)}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleRegister}>
                            Register
                        </Button>
                    </Modal.Footer>
                </Modal>}
        </>
    )
}