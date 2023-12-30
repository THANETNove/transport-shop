import React, { useEffect, useState } from "react";
import Service from "../../../server_api/server";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Money = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errorsImage, setErrorsImage] = useState(null);
  const [time, setTime] = useState(null);
  const [errorTime, setErrorTime] = useState(null);
  const [date, setDate] = useState(null);
  const [errorDate, setErrorDate] = useState(null);
  const [money, setMoney] = useState(null);
  const [errorMoney, setErrorMoney] = useState(null);
  const handleImageChange = (e) => {
    setErrorsImage(null);
    const file = e.target.files[0];

    if (file) {
      const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/svg+xml",
      ];

      if (allowedMimeTypes.includes(file.type)) {
        setImage(file);
        // สร้าง URL ของภาพตัวอย่าง
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setErrorsImage("กรุณาเลือกรูปภาพ .image/jpeg/png/gif/bmp/svg+xml");
      }
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (date != null && date != "") {
      if (time != null && time != "") {
        if (money != null && money != "") {
          if (image) {
  
            const response = await Service.createSlip(
              user && user.customerCode,
              date,
              time,
              money,
              image
            );

            if (response.status == "success") {
              navigate("/record-money-wallet");
            }
          } else {
            setErrorsImage("กรุณาเลือกรูปภาพ .image/jpeg/png/gif/bmp/svg+xml");
          }
        } else {
          setErrorMoney("กรุณาใส่ยอดการโอน");
        }
      } else {
        setErrorTime("กรุณากรอก เวลา");
      }
    } else {
      setErrorDate("กรุณากรอก วัน-เดือน-ปี");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              เเจ้งการชำระ
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    วัน-เดือน-ปี
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="12-30-2566"
                    onChange={(event) => setDate(event.target.value)}
                  />
                  {errorDate && <div className="error-from">{errorDate}</div>}
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    เวลา
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="07:58"
                    onChange={(event) => setTime(event.target.value)}
                  />
                  {errorTime && <div className="error-from">{errorTime}</div>}
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    ยอดการโอน
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="ยอดการโอน"
                    min={0}
                    value={money}
                    onChange={(event) =>
                      setMoney(event.target.value.replace(/\D/g, ""))
                    }
                  />
                  {errorMoney && <div className="error-from">{errorMoney}</div>}
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    สลิป
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    placeholder="อัพโหลดไฟล์ภาพ"
                  />
                  {errorsImage && (
                    <div className="error-from">{errorsImage}</div>
                  )}
                </div>
                {preview && (
                  <div className="form-group">
                    <div className="justify-content-center d-flex">
                      <div className="mt-5">
                        <img src={preview} alt="Image Preview" width="200" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="btn-Upload">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary btn-user btn-block mt-5 mb-5"
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Money;
