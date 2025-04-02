import React, { useContext, useState } from 'react'
import Layout from './common/Layout'
import { Link, useNavigate } from 'react-router-dom'

import productImage from '../assets/images/mens/six.jpg'
import { CartContext } from './context/Cart'
import { useForm } from 'react-hook-form'
import { apiUrl, userToken } from './common/http'
import { toast } from 'react-toastify'

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const {cartData, grandTotal, subTotal, shipping} = useContext(CartContext);
    const navigate = useNavigate()

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    }

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm();

    const processOrder = async(data) => {
        if (paymentMethod == 'cod') {
            saveOrder(data, 'not paid')
        }        
    }

    const saveOrder = async (data, paymentStatus) => {
        const formData = {...data,
            grand_total : grandTotal(),
            sub_total : subTotal(),
            shipping : shipping(),
            discount : 0,
            payment_status : paymentStatus,
            status : 'pending',
            cart : cartData
        }

        const res = await fetch(`${apiUrl}/save-order`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${userToken()}`
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === 200) {
                localStorage.removeItem('cart')
                toast.success(result.message)
                navigate(`/order/confirmation/${result.data.id}`)
            } else {
                const formErrors = result.errors;
                Object.keys(formErrors).forEach( (field) => {
                    setError(field, {message: formErrors[field][0]});
                })
            }
        })
    }

    return (
        <Layout>
            <div className="container checkout-page pb-5">
                <div className="row"> {/*breadcrumb row start */}
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className="py-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                            </ol>
                        </nav>
                    </div>
                </div> {/*breadcrumb row end */}

                <form onSubmit={handleSubmit(processOrder)}>
                    <div className="row">
                        <div className="col-md-7">
                            <h3 className="border-bottom pb-3"><strong>Billing Details</strong></h3>
                            <div className="row pt-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {
                                                ...register('name', {
                                                    required : 'The name field is required'
                                                })
                                            }
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder='Name'
                                        />
                                        {errors.name && <span className="invalid-feedback">{errors.name?.message}</span>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
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
                                        />
                                        {errors.email && <span className="invalid-feedback">{errors.email?.message}</span>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        {
                                            ...register('address', {
                                                required : 'The address field is required'
                                            })
                                        }
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        type="text"
                                        placeholder='Address'
                                        rows={3}
                                    ></textarea>
                                    {errors.address && <span className="invalid-feedback">{errors.address?.message}</span>}
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {
                                                ...register('city', {
                                                    required : 'The city field is required'
                                                })
                                            }
                                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder='City' />
                                        {errors.city && <span className="invalid-feedback">{errors.city?.message}</span>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {
                                                ...register('state', {
                                                    required : 'The state field is required'
                                                })
                                            }
                                            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder='State' />
                                        {errors.state && <span className="invalid-feedback">{errors.state?.message}</span>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {
                                                ...register('zip', {
                                                    required : 'The zip field is required'
                                                })
                                            }
                                            className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder='Zip' />
                                        {errors.zip && <span className="invalid-feedback">{errors.zip?.message}</span>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {
                                                ...register('mobile', {
                                                    required : 'The mobile field is required'
                                                })
                                            }
                                            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder='Mobile' />
                                        {errors.mobile && <span className="invalid-feedback">{errors.mobile?.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h3 className="border-bottom pb-3"><strong>Items</strong></h3>
                            <table className="table">
                                <tbody>
                                    {
                                        cartData && cartData.map(item => {
                                            return (
                                                <tr key={`cart-item-${item.id}`}>
                                                    <td width={100}>
                                                        <img src={item.image_url} width={90} height={90} alt="" />
                                                    </td>
                                                    <td width={600}>
                                                        <h4>{item.title}</h4>
                                                        <div className="d-flex align-items-center pt-3">
                                                            <span>Rs {item.price}</span>
                                                            <div className='ps-3'>
                                                                {
                                                                    item.size && <button className='btn btn-size'>{item.size}</button>
                                                                }
                                                            </div>
                                                            <div className="ps-5">x {item.qty}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div>Subtotal</div>
                                        <div>Rs {subTotal()}</div>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div>Shipping</div>
                                        <div>Rs {shipping()}</div>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div><strong>Grand Total</strong></div>
                                        <div>Rs {grandTotal()}</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="border-bottom pt-4 pb-3"><strong>Payment Method</strong></h3>

                            <div className='pt-2'>
                                <input
                                    type="radio"
                                    onClick={handlePaymentMethod}
                                    defaultChecked={paymentMethod == 'stripe'}
                                    value={'stripe'}
                                    id='stripe'
                                />
                                <label htmlFor="stripe" className='form-label ps-2'>Stripe</label>

                                <input
                                    type="radio"
                                    onClick={handlePaymentMethod}
                                    defaultChecked={paymentMethod == 'cod'}
                                    value={'cod'}
                                    className='ms-3'
                                    id='cod'
                                />
                                <label htmlFor="cod" className='form-label ps-2'>COD</label>
                            </div>

                            <div className="d-flex py-3">
                                <button className='btn btn-primary'>Pay Now</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Checkout