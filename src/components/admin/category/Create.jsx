import React, { useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { adminToken, apiUrl } from '../../common/http';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

const Create = () => {
    const [disabled, setDisable] = useState(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const saveCategory = async(data) => {
        setDisable(true)
        console.log(data)

        const res = await fetch(`${apiUrl}/categories`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res =>res.json())
        .then(result => {
            console.log(result)
            setDisable(false)

            if (result.status === 200) {
                toast.success(result.message)
                navigate('/admin/categories')
            } else {
                toast.error(result.message)
            }
        })
    }

    return (
        <Layout>
			<div className="container">
				<div className="row">
					<div className="d-flex justify-content-between mt-5 pb-3">
						<h4 className="h4 pb-0 mb-0">Categories / Create</h4>
                        <Link to="/admin/categories" className='btn btn-primary'>Back</Link>
					</div>

					<div className="col-md-3">
						<Sidebar />
					</div>

					<div className="col-md-9">
						<form onSubmit={handleSubmit(saveCategory)}>
                            <div className="card shadow">
                                <div className="card-body p-4">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Name</label>
                                        <input 
                                            {
                                                ...register('name', {
                                                    required : 'The name field is required'
                                                })
                                            }
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            type="text" 
                                            placeholder="Name" />
                                        {errors.name && <span className="invalid-feedback">{errors.name?.message}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Status</label>
                                        <select
                                            {
                                                ...register('status', {
                                                    required : 'Please select a status'
                                                })
                                            } 
                                            className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                            >
                                            <option value="">Select a status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                        {errors.status && <span className="invalid-feedback">{errors.status?.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <button 
                                disabled={disabled}
                                className="btn btn-primary mt-3"
                            >Create</button>
                        </form>

					</div>
				</div>
			</div>
		</Layout>
    )
}

export default Create