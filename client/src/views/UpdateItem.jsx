import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import {navigate, Link} from "@reach/router"


const UpdateItem = (props) => {
    const [itemDetail, setItemDetail] = useState ({
        Title: "",
        Price: 0,
        Description:""
    })
    console.log("Here's the item id", props)
    const [errors, setErrors] = useState({})
    useEffect(() => {
        Axios.get(`http://localhost:8000/api/oneItem/${props.id}`)
        .then(response =>{
            console.log("Here's the response call for this item", response)
            setItemDetail(response.data.results)
        })
        .catch(err =>{
            console.log("Here's the error", err)
        })
    }, [errors]);
    
// ****************************************************************************
    const changeHandler = (e) =>{
        setItemDetail({
            ...itemDetail,
            [e.target.name] : e.target.value
        })
    }
// ****************************************************************************
    const submitHandle = (e) =>{
        e.preventDefault();
        Axios.put(`http://localhost:8000/api/update/${props.id}`, itemDetail)
            .then(res => {
                console.log("This is the Form Submission", res)
                if(res.data.results){
                    navigate("/api/items")
                }
                else{
                    console.log("Fix it**********************")
                    console.log(res)
                    setErrors(res.data.error.errors)
                }
            })
            .catch(err=> console.log("These are the posting errors", err))
    };

// *************************************************************************
    return (
        <div>
            <h1>Product Manager</h1>
            <Link className="btn btn-success m-1" to="/api/create/item">
            Create New Item
            </Link>
            <Link className="btn btn-primary m-1" to="/api/items">
             Home
            </Link>
            <form onSubmit = {submitHandle}>
                <div>
                <label htmlFor="">Title:</label>
                <br/>
                <input type="text" name="Title"  id="" onChange ={changeHandler} value = {itemDetail.Title} />
                <br/>
                <span className = "text-danger"> {errors.Title? errors.Title.message : ""}</span>
                </div>
                <div>
                <label htmlFor="">Price:</label>
                <br/>
                <input type="number" name="Price" onChange ={changeHandler}  value = {itemDetail.Price} id=""/>
                <br/>
                <span className = "text-danger"> {errors.Price? errors.Price.message : ""}</span>
                </div>
                <div>
                <label htmlFor="">Description:</label>
                <br/>
                <input type="text" name="Description" onChange ={changeHandler} value = {itemDetail.Description} id=""/>
                <br/>
                <span className = "text-danger"> {errors.Description? errors.Description.message : ""}</span>
                </div>
                <br/>
                <input type="submit" value="Update Item"/>
            </form>
        </div>
    );
};

export default UpdateItem;