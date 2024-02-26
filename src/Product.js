import { useEffect, useState } from "react";
import './Product.css'
import './Shop.css'
import axios from 'axios';
export default function Product()
{
    const url="http://127.0.0.1:5000"
    const [product,setProduct]=useState([])
    const [_id,set_id] = useState(null)
    const [name,setName] = useState('')
    const [price,setPrice] = useState(null)
    const [img,setImg] = useState('')
    useEffect(()=>{
        axios.get(url+"/shop")
        .then(Response=>setProduct(Response.data))
    },[product])
    const input_id = (event) =>{
        set_id(event.target.value)
    }
    const input_name = (event) =>{
        setName(event.target.value)
    }
    const input_price = (event) =>{
        setPrice(event.target.value)
    }
    const input_img = (event) =>{
        setImg(event.target.value)
    }
    const saveitem = ()=>{
        const itemData = {
            _id:_id,
            name:name,
            price:price,
            img:img
        }
        axios.post(url+"/shop",itemData)
    }
    const deleteitem = () => {
            axios.delete(`http://127.0.0.1:5000/shop/${_id}`);
            location.reload();
      };
      const updateitem = () => {
        const itemData = {
            _id:_id,
            name:name,
            price:price,
            img:img
        }
        axios.put(`http://127.0.0.1:5000/shop/${_id}`,itemData);
        location.reload();
  };
    const productlist=product.map(p=><li>{p.id}
    {p.name}<img src={p.img}/> {p.price}</li>)
    return (<>
        <form onSubmit={saveitem}>
            <div className="_id-css">
                <label>_id</label>
                <input type="number" onChange={input_id}/>
            </div>
            <div className="name-css">
                <label>name</label>
                <input type="text" onChange={input_name}/>
            </div>
            <div className="price-css">
                <label>price</label>
                <input type="number" onChange={input_price}/>
            </div>
            <div className="img=css">
                <label>img</label>
                <input type="text" onChange={input_img}/>
            </div>
            <div>
                <button type="submit">insert</button>
            </div>
        </form>
        <form onSubmit={updateitem}>
            <div className="_id-css">
                <label>Update_id</label>
                <input type="number" onChange={input_id}/>
            </div>
            <div className="name-css">
                <label>name</label>
                <input type="text" onChange={input_name}/>
            </div>
            <div className="price-css">
                <label>price</label>
                <input type="number" onChange={input_price}/>
            </div>
            <div className="img=css">
                <label>img</label>
                <input type="text" onChange={input_img}/>
            </div>
            <div>
                <button type="submit">Update</button>
            </div>
        </form>
        <div className="_id-css">
                <label>Delete_id</label>
                <input type="number" onChange={input_id}/>
            </div>
            <div>
                <button onClick={deleteitem}>Delete</button>
            </div>
        <div className='grid-container'>
            {productlist}
        </div>
    </>
    )
}