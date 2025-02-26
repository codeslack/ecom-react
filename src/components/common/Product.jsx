import React from 'react'
import productImage from '../../assets/images/six.jpg';
import { Link } from 'react-router-dom';


const Product = () => {
    return (
        <>
            <div className="product card shadow-0 border-0">
                <div className="card-img">
                    <Link to="/product"> 
                        <img src={productImage} alt="Product Image" className='w-100' />
                    </Link>
                </div>
                <div className="card-body pt-3">
                    <Link to="/product">White Shirt for Men</Link>
                    <div className='price'>
                        Rs 100 
                        <span className='text-decoration-line-through ms-1'>Rs 200</span>
                    </div>		
                </div>
            </div>
        </>

    )
}

export default Product