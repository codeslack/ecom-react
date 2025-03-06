import React, { useEffect, useState } from 'react'
import { apiUrl } from './http';
import { Link } from 'react-router-dom';


const LatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState([])

    const fetchLatestProducts = async () => {
        const res = await fetch(`${apiUrl}/get-latest-products`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {
            setLatestProducts(result.data)
        })
    }

    useEffect(() => {
        fetchLatestProducts();
    }, [])

    return (
        <section className="section-2 pt-5">
            <div className="container">
                <h2>New Arrivals</h2>
                <div className="row mt-4">
                    {
                        latestProducts && latestProducts.map(product => {
                            return (
                                <div className="col-md-3 col-6" key={`latest-product-${product.id}`}>
                                    <div className="product card shadow-0 border-0">
                                        <div className="card-img">
                                            <Link to={`product/${product.id}`}>
                                                <img 
                                                    src={product.image_url} 
                                                    alt="Product Image" 
                                                    className='w-100' 
                                                />
                                            </Link>
                                        </div>
                                        <div className="card-body pt-3">
                                            <Link to={`product/${product.id}`}>{product.title}</Link>
                                            <div className='price'>
                                                Rs {product.price}

                                                {
                                                    product.compare_price && <span className='text-decoration-line-through ms-3'>Rs {product.compare_price}</span>
                                                } 
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestProducts