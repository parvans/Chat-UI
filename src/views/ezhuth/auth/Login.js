import { min } from 'moment'
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, CardSubtitle, CardTitle, Col, Container, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import { verifyUserEmail } from 'utilities/apiService'
import { userResetPassword } from 'utilities/apiService'
import { verifyUserOtp } from 'utilities/apiService'
import { userRegister } from 'utilities/apiService'
import { userLogin } from 'utilities/apiService'
import chatbot from '../../../assets/img/Chat bot-amico.png'
import ImagePicker from 'components/ImagePicker'
export default function Login() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [otp, setOtp] = useState('')
    // errors
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [otpError, setOtpError] = useState('')

    const [isRegister, setIsRegister] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [isOtp, setIsOtp] = useState(false)
    const [isResetPassword, setIsResetPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigation = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email === '') {
            setEmailError('Email is required')
        } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{3}$/.test(email)) {
            setEmailError('Email is invalid')
        } else {
            setEmailError('')
        }
        if (password === '') {
            setPasswordError('Password is required')
        } else {
            setPasswordError('')
        
            setLoading(true)
            const response = await userLogin(email, password)
            console.log(response);
            if (response.ok) {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                    toast.success('Login Success')
                    localStorage.setItem('auth-token', response.data.token)
                    navigation.push('/chatbot/chat')
                    window.location.reload()
                }
                
                
            } else {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                    toast.error(response.data.message)
                }
            }
        }
    }

    const handleRegister = async (e) => {
        setError(true)
        e.preventDefault()
        if (!name) {
            setNameError('Name is required')
        } else {
            setNameError('')
        }
        if (!email) {
            setEmailError('Email is required')
        } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{3}$/.test(email)) {
            setEmailError('Email is invalid')
        } else {
            setEmailError('')
        }
        if (!password) {
            setPasswordError('Password is required')
        }else if(password.length < 6){
            setPasswordError('Password must be at least 6 characters')
        }else if(password.length > 15){
            setPasswordError('Password must be at most 15 characters')
        }else if(!/(?=.*?[A-Z])/.test(password)){
            setPasswordError('Password must contain at least one uppercase letter')
        }else if(!/(?=.*?[a-z])/.test(password)){
            setPasswordError('Password must contain at least one lowercase letter')
        }else if(!/(?=.*?[0-9])/.test(password)){
            setPasswordError('Password must contain at least one digit')
        }else if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
            setPasswordError('Password must contain at least one special character')
        }else{
            setPasswordError('')
        }
        if (!confirmPassword) {
            setConfirmPasswordError('Confirm Password is required')
        }else if(confirmPassword !== password){
            setConfirmPasswordError('Confirm Password must be same as Password')
        }else{
            setConfirmPasswordError('')
        }

        if(nameError || emailError || passwordError  || confirmPasswordError){
            console.log("error"); 
        }else{
            try {
                setLoading(true)
                const regResponse = await userRegister({
                    name: name,
                    email: email,
                    password: password
                })
                if (regResponse.ok) {
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000);
                    if(!loading){
                    toast.success('Welcome to Ezhuth')
                    setTimeout(() => {
                        setIsRegister(false)
                    }, 1000);
                    }
                } else {
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000);
                    if(!loading){
                    toast.error(regResponse.data.message)
                    }
                }
            } catch (error) {
                console.log(error);
            }
           
        }
            
    }

    const verifyEmail = async (e) => {
        e.preventDefault()
        if (email === '') {
            setEmailError('Email is required')
        } else if (email.includes('@') === false) {
            setEmailError('Email is invalid')
        } else {
            setEmailError('')
            setLoading(true)
            const res = await verifyUserEmail({ email: email })
            if (res.ok) {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                toast.success('OTP sent to your email')
                setTimeout(() => {
                    setIsForgotPassword(false)
                    setIsOtp(true)
                }, 1000);
                }
            } else {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                toast.error(res.data.message)
                }
            }
        }
    }

    const clearError = () => {
        setEmailError('')
        setPasswordError('')
        setConfirmPasswordError('')
        setNameError('')
        setOtpError('')
    }
    

    const verifyOtp = async (e) => {
        e.preventDefault()
        if (otp === '') {
            setOtpError('OTP is required')
        } else {
            setOtpError('')
            setLoading(true)
            const res = await verifyUserOtp({ email: email, otp: otp })
            console.log(res);
            if (res.ok) {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                toast.success(res.data.message)
                setTimeout(() => {
                    setIsOtp(false)
                    setIsResetPassword(true)
                }, 1000);
                }
            } else {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                toast.error(res.data.message)
                }
            }
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (password === '') {
            setPasswordError('Password is required')
        } else {
            setPasswordError('')
        }
        if (confirmPassword === '') {
            setConfirmPasswordError('Confirm Password is required')
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Password does not match')
        } else {
            setConfirmPasswordError('')
            setLoading(true)
            const res = await userResetPassword({ email: email, password: password })
            if (res.ok) {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                toast.success(res.data.message)
                setTimeout(() => {
                    setIsResetPassword(false)
                    setIsRegister(false)
                }, 1000);
                }
            } else {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                toast.error(res.data.message)
                }
            }
        }
    }
    return (
        <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
            {/* <Container style={{
                backgroundColor: '#6bd098',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Row>
                    <Col className='justify-content-center d-flex flex-column align-items-center'>
                        <img src={chatbot} alt='logo' style={{ width: '70%', height: '70%' }} />
                    </Col>
                </Row>
            </Container> */}
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8}>
                        <CardGroup>
                            <Card className='p-4'>
                                <CardBody>
                                    {
                                        isResetPassword ? (
                                            <>
                                                <CardTitle tag='h1'>Reset Password</CardTitle>
                                                <CardSubtitle tag='h6' className='mb-2 text-muted'>Reset your password</CardSubtitle>
                                                <FormGroup>
                                                    <Label for='newPassword'>New Password</Label>
                                                    <Input disabled={loading} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    {passwordError && <p className='text-danger'>{passwordError}</p>}
                                                    <Label for='confirmPassword'>Confirm Password</Label>
                                                    <Input disabled={loading} placeholder="Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                    {confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>}
                                                    <br />
                                                    <Button disabled={loading} color='success' className='mt-3 btn-round' block onClick={handleResetPassword}>
                                                    {loading ? <Spinner style={{width:20,height:20}} color='light' /> : 'Reset Password'}
                                                        </Button>
                                                </FormGroup>
                                            </>
                                        ) : isOtp ? (
                                            <>
                                                <CardTitle tag='h1'>Verify OTP</CardTitle>
                                                <CardSubtitle tag='h6' className='mb-2 text-muted'>Verify your OTP</CardSubtitle>
                                                <FormGroup>
                                                    <Label for='otp'>OTP</Label>
                                                    <Input disabled={loading} placeholder="OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                                    {otpError && <p className='text-danger'>{otpError}</p>}
                                                    <br />
                                                    <Button disabled={loading} color='success' className='mt-3 btn-round' block onClick={verifyOtp}>
                                                    {loading ? <Spinner style={{width:20,height:20}} color='light' /> : 'Verify OTP'}
                                                    </Button>
                                                </FormGroup>
                                            </>
                                        ) : isForgotPassword ? (
                                            <>
                                                <CardTitle tag='h1'>Verify Email</CardTitle>
                                                <CardSubtitle tag='h6' className='mb-2 text-muted'>Verify your email</CardSubtitle>
                                                <FormGroup>
                                                    <Label for='email'>Email</Label>
                                                    <Input disabled={loading} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    {emailError && <p className='text-danger'>{emailError}</p>}
                                                    <span style={{cursor:'pointer',color: "#4ec94e"}} onClick={() => {
                                                        setIsForgotPassword(false)
                                                        clearError()
                                                        }}>
                                                        Back to Login
                                                    </span>
                                                    <br />
                                                    <Button disabled={loading} color='success' className='mt-3 btn-round' block onClick={verifyEmail}>
                                                    {loading ? <Spinner style={{width:20,height:20}} color='light' /> : 'Verify Email'}
                                                    </Button>
                                                    {/* <p className='text-center mt-3'>Don't have an account? <a href='#' onClick={()=>setIsRegister(true)}>Sign Up</a></p> */}
                                                </FormGroup>
                                            </>
                                        ) : isRegister ? (
                                            <>
                                                <CardTitle tag='h1'>REGISTER</CardTitle>
                                                <CardSubtitle tag='h6' className='mb-2 text-muted'>Create your account</CardSubtitle>
                                                <ImagePicker/>
                                                <FormGroup>
                                                    
                                                    <Label for='Name'>Name</Label>
                                                    <Input disabled={loading} placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                                    {nameError && <p className='text-danger' >{nameError}</p>}
                                                    <Label for='Email'>Email</Label>
                                                    <Input disabled={loading} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    {emailError && <p className='text-danger'>{emailError}</p>}
                                                    <Label for='Password'>Password</Label>
                                                    <Input disabled={loading} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    {passwordError && <p className='text-danger'>{passwordError}</p>}
                                                    <Label for='ConfirmPassword'>Confirm Password</Label>
                                                    <Input disabled={loading} placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                    {confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>}
                                                    <Button disabled={loading} color='success' className='mt-3 btn-round' block onClick={handleRegister}>
                                                    {loading ? <Spinner style={{width:20,height:20}} color='light' /> : 'Register'}
                                                    </Button>
                                                    <p className='text-center mt-3'>Already have an account? <span style={{cursor:'pointer',color: "#4ec94e"}} 
                                                    onClick={() => {
                                                        setIsRegister(false)
                                                        clearError()
                                                        }}>Login</span></p>
                                                </FormGroup>
                                                

                                            </>
                                        ) : (
                                            <>
                                                <CardTitle tag='h1'>LOGIN</CardTitle>
                                                <CardSubtitle tag='h6' className='mb-2 text-muted'>Sign In to your account</CardSubtitle>
                                                <FormGroup>
                                                    <Label for='exampleEmail'>Email</Label>
                                                    <Input disabled={loading} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    {emailError && <p className='text-danger'>{emailError}</p>}
                                                    <Label for='examplePassword'>Password</Label>
                                                    <Input disabled={loading} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    {passwordError && <p className='text-danger'>{passwordError}</p>}
                                                    <span style={{cursor:'pointer',color: "#4ec94e"}} onClick={() => setIsForgotPassword(true)}>
                                                        Forgot Password?</span>
                                                    <br />
                                                    <Button disabled={loading} color='success' className='mt-3 btn-round' block onClick={handleLogin}>
                                                        {loading ? <Spinner style={{width:20,height:20}} color='light' /> : 'Login'}
                                                        </Button>
                                                    <p className='text-center mt-3'>Don't have an account? <span style={{cursor:'pointer',color: "#4ec94e"}} onClick={() => setIsRegister(true)}>Sign Up</span></p>
                                                </FormGroup>
                                            </>
                                        )
                                    }
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
                
            </Container>
            
            <Toaster
                position='top-center'
                reverseOrder={false}
            />
        </div>
    )
}