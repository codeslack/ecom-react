import React from 'react'
import Layout from './common/Layout'
import Product from './common/Product'
import { Link } from 'react-router-dom'

const Shop = () => {
    return (
        <Layout>
            <div className="container">
                <nav aria-label="breadcrumb" className="py-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Shop</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card shadow border-0 mb-3">
                            <div className="card-body p-4">
                                <h3 className="card-title mb-3">Categories</h3>
                                <ul>
                                    <li className='mb-2'>
                                        <input type="checkbox" name="" id="" />
                                        <label htmlFor="" className='ps-2'>Kids</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" name="" id="" />
                                        <label htmlFor="" className='ps-2'>Mens</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" name="" id="" />
                                        <label htmlFor="" className='ps-2'>Women</label>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>

                        <div className="card shadow border-0 mb-3">
                            <div className="card-body p-4">
                                <h3 className="card-title mb-3">Brands</h3>
                                <ul>
                                    <li className='mb-2'>
                                        <input type="checkbox" name="" id="" />
                                        <label htmlFor="" className='ps-2'>Puma</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" name="" id="" />
                                        <label htmlFor="" className='ps-2'>Killer</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" name="" id="" />
                                        <label htmlFor="" className='ps-2'>Levis</label>
                                    </li>
                                    <li className='mb-2'>
                                        <input type="checkbox" name="" id="" />
                                        <label htmlFor="" className='ps-2'>Flying Machine</label>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 pb-5">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                <Product />
                            </div>
                            <div className="col-md-4 col-6">
                                <Product />
                            </div><div className="col-md-4 col-6">
                                <Product />
                            </div>
                            <div className="col-md-4 col-6">
                                <Product />
                            </div>
                            <div className="col-md-4 col-6">
                                <Product />
                            </div>
                            <div className="col-md-4 col-6">
                                <Product />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop
