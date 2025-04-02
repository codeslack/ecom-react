import React from 'react'
import Layout from './common/Layout'
import Sidebar from './common/Sidebar'
import { Link } from 'react-router-dom'

const Confirmation = () => {
    return (
        <Layout>
			<div className="container mb-5">
				<div className="row">
					<div className="d-flex justify-content-center mt-5">
						<h2 className="pb-0 mb-0 text-success"><strong>Thank You!</strong></h2>
					</div>
                    <div className="d-flex justify-content-center mb-4">
						<h4 className="pb-0 mb-0">You have successfully placed your order.</h4>
					</div>

					<div className="col-md-12">
						<div className="card shadow">
                            <div className="card-header">Order Summary</div>
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className='mb-3'><strong className='me-2'>Order ID:</strong>#2</div>
                                        <div className='mb-3'><strong className='me-2'>Order Date:</strong>23 Feb 2025</div>
                                        <div className='mb-3'><strong className='me-2'>Status:</strong><span className='badge bg-warning'>Pending</span></div>
                                        <div className='mb-3'><strong className='me-2'>Payment:</strong>Cash On Delivery</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className='mb-3'><strong className='me-2'>Customer:</strong>Md Ummar Ali</div>
                                        <div className='mb-3'><strong className='me-2'>Address:</strong>Barua, Beldanga, Msd</div>
                                        <div className='mb-3'><strong className='me-2'>Contact:</strong>9733633091</div>
                                    </div>
                                </div>
                                <h3 className="mt-4">Items</h3>
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">Item</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col" className='text-end'>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Men Red Check Shirt</td>
                                            <td>1</td>
                                            <td className='text-end'>Rs 250</td>
                                        </tr>
                                        <tr>
                                            <td>White red shirt</td>
                                            <td>2</td>
                                            <td className='text-end'>Rs 500</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className='text-end'><strong>Subtotal</strong></td>
                                            <td className='text-end'>Rs 750</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className='text-end'><strong>Shipping</strong></td>
                                            <td className='text-end'>Rs 5</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className='text-end'><strong>Grand Total</strong></td>
                                            <td className='text-end'><strong>Rs 755</strong></td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>

                            <div className="d-flex justify-content-center mb-4">
                                <div className="d-flex">
                                    <button className='btn btn-primary me-2'>View Order Details</button>
                                    <button className='btn btn-outline-secondary'>Continue Shopping</button>
                                </div>
                            </div>
                        </div>
					</div>
				</div>
			</div>
		</Layout>
    )
}

export default Confirmation