import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'

import productImage from '../assets/images/mens/six.jpg'

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
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
                
                <div className="row">
                    <div className="col-md-7">
                        <h3 className="border-bottom pb-3"><strong>Billing Details</strong></h3>
                        <form action="">
                            <div className="row pt-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='Name' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='Email' />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea name="" id="" className='form-control' rows={3} placeholder='Address'></textarea>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='City' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='State' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='Zip' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='Mobile' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-5">
                        <h3 className="border-bottom pb-3"><strong>Items</strong></h3>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td width={100}>
                                        <img src={productImage} width={90} height={90} alt="" />
                                    </td>
                                    <td width={600}>
                                        <h4>Dummy Prodcut Title</h4>
                                        <div className="d-flex align-items-center pt-3">
                                            <span>Rs 250</span>
                                            <div className='ps-3'>
                                                <button className='btn btn-size'>S</button>
                                            </div>
                                            <div className="ps-5">x 1</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td width={100}>
                                        <img src={productImage} width={90} height={90} alt="" />
                                    </td>
                                    <td width={600}>
                                        <h4>Dummy Prodcut Title</h4>
                                        <div className="d-flex align-items-center pt-3">
                                            <span>Rs 250</span>
                                            <div className='ps-3'>
                                                <button className='btn btn-size'>S</button>
                                            </div>
                                            <div className="ps-5">x 1</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div>Subtotal</div>
                                    <div>Rs 250</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div>Shipping</div>
                                    <div>Rs 50</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div><strong>Grand Total</strong></div>
                                    <div>Rs 300</div>
                                </div>
                            </div>
                        </div>

                        <h3 className="border-bottom pt-4 pb-3"><strong>Payment Method</strong></h3>

                        <div className='pt-2'>
                            <input 
                                onClick={handlePaymentMethod}
                                type="radio" checked={paymentMethod == 'stripe'} value={'stripe'} />
                            <label htmlFor="" className='form-label ps-2'>Stripe</label>

                            <input 
                                onClick={handlePaymentMethod}
                                type="radio" checked={paymentMethod == 'cod'} value={'cod'} className='ms-3' />
                            <label htmlFor="" className='form-label ps-2'>COD</label>
                        </div>

                        <div className="d-flex py-3">
                            <button className='btn btn-primary'>Pay Now</button>
                        </div>
                    </div>

                </div>                
            </div>
        </Layout>
    )
}

export default Checkout