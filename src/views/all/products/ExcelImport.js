import React, { useState, useRef } from "react";
import Service from "../../../server_api/server";
import { useSelector, useDispatch } from "react-redux";

const CSVReader = () => {
  const dispatch = useDispatch();
  const [csvData, setCSVData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const fileInputRef = useRef(null); // สร้าง ref สำหรับ input

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split("\n").map((row) => row.split(/,|;/));

        console.log("rows", rows);
        // ตรวจสอบว่าข้อมูลมีหัวข้อหรือไม่
        const hasHeader = true; // ใส่ค่า true หรือ false ตามที่เป็นจริง

        const headers = hasHeader ? rows[0] : null;

        const dataRows = hasHeader ? rows.slice(1) : rows;

        // แปลงข้อมูลให้อยู่ในรูปแบบที่ต้องการ
        const formattedData =
          dataRows &&
          dataRows.map((row) => {
            const item = {};

            row.forEach((value, index) => {
              if (hasHeader) {
                if (headers && index < headers.length) {
                  // ตรวจสอบ headers และ index ก่อนใช้งาน
                  const header = headers[index];
                  const cleanHeader = header.includes('"')
                    ? header.replace(/"/g, "")
                    : header;

                  item[cleanHeader] = value.replace(/"/g, "");
                }
                /*  item[cleanHeader[index]] = value.replace(/"/g, ""); */
              } else {
                item[index] = value.replace(/"/g, "");
              }
            });

            const itemForm = {
              idProduct: item.id,
              customer_code: item.customer_code,
              tech_china: item.tech_china,
              warehouse_code: item.warehouse_code,
              cabinet_number: item.cabinet_number,
              chinese_warehouse: item.chinese_warehouse,
              close_cabinet: item.close_cabinet,
              to_thailand: item.to_thailand,
              parcel_status: item.parcel_status,
              quantity: item.quantity,
              wide_size: item.wide_size,
              long_size: item.long_size,
              height_size: item.height_size,
              cue_per_piece: item.cue_per_piece,
              weight: item.weight,
              inputFields: item.inputFields || "NULL",
              total_weight: item.total_weight,
              total_queue: item.total_queue,
              payment_amount_chinese_thai_delivery:
                item.payment_amount_chinese_thai_delivery,
              product_type: item.product_type,
              image: item.image,
              status_withdrawal: item.status_withdrawal,
              status_recorder: item.status_recorder,
              created_at: item.created_at,
              updated_at: item.updated_at,
            };

            updateProductImport(itemForm);
          });
      };
      reader.readAsText(file);
    }
  };

  const updateProductImport = async (item) => {
    const response = await Service.UpdateProduct(item, dispatch);
    if (response.status == "success") {
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // รีเซ็ตค่าใน input เป็นค่าว่าง
      }
      fetchData();
    }
  };

  const fetchData = async () => {
    const pro_log_1 = await Service.getProductType(dispatch); // ดึงประเภทสินค้า
    const pro_log_2 = await Service.getStatusList(dispatch); // ดึงสถานะสิค้า
    const pro_log_3 = await Service.getProduct(dispatch); // ดึงสิค้า
    const pro_log_4 = await Service.getProductCode(user.id, dispatch); // ดึงรหัสพัสดุ
    const pro_log_5 = await Service.getCustomerCodeAll(dispatch); // ดึงประเภทพัสดุ

    setTimeout(() => {
      dispatch({
        type: "STATUS_PRODUCT_SUCCESS",
        payload: "default",
      });
    }, 2000);
  };

  /* console.log("csvData", csvData); */

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
    </div>
  );
};

export default CSVReader;
