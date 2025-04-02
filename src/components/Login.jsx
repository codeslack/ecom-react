import React, {useContext} from 'react'
import Layout from './common/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiUrl } from './common/http';
import { toast } from 'react-toastify';
import { AuthContext } from './context/Auth';


const Login = () => {
    const {login} = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data)

        const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res =>res.json())
        .then(result => {
            if (result.status == 200) {
                const userInfo = {
                    token: result.token,
                    id: result.id,
                    name: result.name
                }

                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                toast.success('Login successful')
                login(userInfo)
                navigate('/account')
            } else {
                toast.error(result.message)
            }
        })
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center py-5">
                <div className="card shadow border-0 login">
                    <div className="card-header">Login</div>
                    <div className="card-body p-4">
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    {
                                        ...register('email',{
                                            required: "The email field is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })
                                    }
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="email"
                                    placeholder='Email'
                                    autoFocus={true}
                                />
                                {errors.email && <span className="invalid-feedback">{errors.email?.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    {...register("password", { required: "The password field is required." })}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    type="password"
                                    id="password"
                                    placeholder='Password'
                                />
                                {errors.password && <span className="invalid-feedback">{errors.password?.message}</span>}
                            </div>
                            <button className="btn btn-secondary w-100">Login</button>

                            <div className="d-flex justify-content-center pt-4 pb-2">
                                Don't have an account? &nbsp; <Link to="/account/register">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login