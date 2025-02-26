import React from 'react'
import productImage from '../../assets/images/ten.jpg';



const FeaturedProducts = () => {
    return (
        <section className="section-2 py-5">
            <div className="container">
                <h2>Featured Products</h2>
                <div className="row mt-4">
                    <div className="col-md-3 col-6">
                        <div className="product card shadow-0 border-0">
                            <div className="card-img">
                                <img src={productImage} alt="Product Image" className='w-100' />
                            </div>
                            <div className="card-body pt-3">
                                <a href="">White Shirt for Men</a>
                                <div className='price'>
                                    Rs 100 
                                    <span className='text-decoration-line-through ms-1'>Rs 200</span>
                                </div>		
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="product card shadow-0 border-0">
                            <div className="card-img">
                                <img src={productImage} alt="Product Image" className='w-100' />
                            </div>
                            <div className="card-body pt-3">
                                <a href="">White Shirt for Men</a>
                                <div className='price'>
                                    Rs 100 
                                    <span className='text-decoration-line-through ms-1'>Rs 200</span>
                                </div>		
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="product card shadow-0 border-0">
                            <div className="card-img">
                                <img src={productImage} alt="Product Image" className='w-100' />
                            </div>
                            <div className="card-body pt-3">
                                <a href="">White Shirt for Men</a>
                                <div className='price'>
                                    Rs 100 
                                    <span className='text-decoration-line-through ms-1'>Rs 200</span>
                                </div>		
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="product card shadow-0 border-0">
                            <div className="card-img">
                                <img src={productImage} alt="Product Image" className='w-100' />
                            </div>
                            <div className="card-body pt-3">
                                <a href="">White Shirt for Men</a>
                                <div className='price'>
                                    Rs 100 
                                    <span className='text-decoration-line-through ms-1'>Rs 200</span>
                                </div>		
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts