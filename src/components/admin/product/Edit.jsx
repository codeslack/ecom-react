import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';
import Sidebar from '../../common/Sidebar';
import { useForm } from 'react-hook-form';
import Layout from '../../common/Layout';

const Edit = () => {
    const [disabled, setDisable] = useState(false)
    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(`${apiUrl}/products/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${adminToken()}`
                }
            })
            .then(res => res.json())
            .then(result => {
                console.log(result.data)
                if (result.status === 200) {
                    setProduct(result.data)
                    reset({
                        name: result.data.name,
                        status: result.data.status
                    })
                } else {
                    toast.error(result.message)
                }   
            })
        }
    });

    const updateProduct = async(data) => {
        setDisable(true)
        const res = await fetch(`${apiUrl}/products/${params.id}`, {
            method: 'PUT',
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
                navigate('/admin/products')
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
						<h4 className="h4 pb-0 mb-0">Products / Edit</h4>
                        <Link to="/admin/products" className='btn btn-primary'>Back</Link>
					</div>

					<div className="col-md-3">
						<Sidebar />
					</div>

					<div className="col-md-9">
						<form onSubmit={handleSubmit(updateProduct)}>
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
                            >Update</button>
                        </form>

					</div>
				</div>
			</div>
		</Layout>
    )
}

export default Edit