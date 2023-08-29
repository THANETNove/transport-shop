import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Service from "../../../server_api/server";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



 const CreateProductCode = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [userCustomerCode, setUserCustomerCode] = useState(user.customerCode);
    const [errors, setErrors] = useState(null);

/*     console.log("user",user.id);
    console.log("user",user.customerCode);
    console.log("user",user); */

    const generateRandomString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }
      
        return randomString;
      }


      const handleChange = (event) => {
        const { name, value } = event.target;
        setUserCustomerCode(value);
      }

      const randomString  = () => {
        const randomString = generateRandomString(6);
        setUserCustomerCode(user.customerCode+randomString);
      } 

      

      const validate = () => {
        let isValid = true;
        if (!userCustomerCode.trim()) {
            setErrors("customer_code is required");
            isValid = false;
        } else if (user.customerCode == userCustomerCode) {
            setErrors("มี รหัสอยู่เเล้ว is required");
            isValid = false;
        }
    
        return isValid;
      };
      

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
           const response = await Service.createProductCode(user.id,userCustomerCode, dispatch);
        if (response.status == "success") {
          navigate("/product-code");
        } else {
          console.log("response", response);
        }
        }
       
      }

      useEffect(() => {
        setUserCustomerCode(user.customerCode)
      },[])

      console.log("errors",errors);

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">สร้างรหัสพัสดุ</h6>
          </div>

          <div className="card-body ">
            <div className="d-flex justify-content-center mt-5">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <div className="col-sm-12 col-md-10 mb-3 mb-sm-0">
                    <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          รหัสพัสดุ
                        </label>
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="statusProduct"
                        placeholder="รหัสพัสดุ"
                        name="statusProduct"
                        value={userCustomerCode}
                        onChange={handleChange}
                      />
                      {errors && (
                        <div className="error-from">
                          {errors}
                        </div>
                      )}
                     
                    </div>
                    <div className="col-sm-12 col-md-2"> 
                    <i className="fa-solid fa-shuffle cursor-pointer" 
                    style={{ fontSize: '24px',marginTop:'40px' }} onClick={randomString} ></i>
                    </div>

                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block mt-5 mb-5"
                  >
                    บันทึก
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CreateProductCode;