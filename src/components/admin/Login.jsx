import React, {useContext} from 'react'
import Layout from './../common/Layout'
import { useForm } from 'react-hook-form'
import { apiUrl } from '../common/http'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AdminAuthContext } from '../context/AdminAuth'

const Login = () => {
    const {login} = useContext(AdminAuthContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()
    
    const onSubmit = async (data) => {
        console.log(data)

        const res = await fetch(apiUrl + '/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res =>res.json())
        .then(result => {
            console.log(result)

            if (result.status == 200) {
                const adminInfo = {
                    token: result.token,
                    id: result.id,
                    name: result.name
                }

                localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
                toast.success('Login successful')
                login(adminInfo)
                navigate('/admin/dashboard')
            } else {
                toast.error(result.message)
            }
        })
    }
    
    return (
        <Layout>            
            <div className="container d-flex justify-content-center py-5">
                <div className="card shadow border-0">
                    <div className="card-header">Admin Login</div>
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
                            <button className="btn btn-secondary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login