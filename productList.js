import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:3010/products",{
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        // here get method so no need to write method and all in fetch
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:3010/product/${id}`, {
            method:"Delete",
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        })
        result = await result.json();
        if(result){
            getProducts();
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
       if(key){
        let result = await fetch(`http://localhost:3010/search/${key}`,{
            method:"get",
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            setProducts(result);
        }
       }
       else{
        getProducts();
       }
    }

    console.warn("products", products);

    return (
        <div className='product-list'>
            <h1>Product list</h1>
            <input className='search-product-box' type="text" placeholder='Search Product'
            onChange={searchHandle} />
            <ul>
                <li>S. No.</li>
                <li>NAME</li>
                <li>PRICE</li>
                <li>CATEGORY</li>
                <li>OPERATION</li>
            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                        <Link to={'/update/'+item._id} >Update</Link>
                        </li>
                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}
export default ProductList;