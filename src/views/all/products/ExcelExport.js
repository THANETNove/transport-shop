import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
const CSVExport = () => {
  const { product, statusProduct } = useSelector((state) => state.post);

  const [productExport, setProductExport] = useState(null);
  const [customerCode, setCustomerCode] = useState(null);
  const [chineseWarehouse, setChineseWarehouse] = useState(false);
  const [closeCabinet, setCloseCabinet] = useState(false);
  const [toThailand, setToThailand] = useState(false);

  useEffect(() => {
    setProductExport(product);
  }, []);

  useEffect(() => {
    const filteredProducts =
      productExport &&
      productExport.filter((product) => {
        // เงื่อนไขการกรองตาม customerCode
        const conditionCustomerCode =
          !customerCode || product.customer_code.includes(customerCode);

        // เงื่อนไขการกรองตาม chineseWarehouse
        const conditionChineseWarehouse =
          !chineseWarehouse ||
          product.chinese_warehouse === "null" ||
          product.chinese_warehouse === "";

        // เงื่อนไขการกรองตาม closeCabinet
        const conditionCloseCabinet =
          !closeCabinet ||
          product.close_cabinet === "null" ||
          product.close_cabinet === "";

        // เงื่อนไขการกรองตาม toThailand
        const conditionToThailand =
          !toThailand ||
          product.to_thailand === "null" ||
          product.to_thailand === "";

        // ใช้เงื่อนไขดังกล่าวเพื่อรวมผลลัพธ์การกรองทั้งหมด
        return (
          conditionCustomerCode &&
          conditionChineseWarehouse &&
          conditionCloseCabinet &&
          conditionToThailand
        );
      });

    console.log("filteredProducts", filteredProducts);
    /*     setProductExport(filteredProducts); */
  }, [customerCode, toThailand, chineseWarehouse, closeCabinet]);

  // Check if productExport exists and is an array
  if (!productExport || !Array.isArray(productExport)) {
    return null;
  }

  // Convert inputFields JSON data to a CSV-compatible array
  const csvData = productExport.map((item) => ({
    id: item.id,
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
    inputFields: item.inputFields || "NULL", // Wrap inputFields in double quotes
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
  }));

  const selectProductExport = (event) => {
    const { name, type, value } = event.target;
    if (name == "customerCode") {
      setCustomerCode(value);
    }
    if (name == "chineseWarehouse") {
      setChineseWarehouse(!chineseWarehouse);
    }
    if (name == "closeCabinet") {
      setCloseCabinet(!closeCabinet);
    }
    if (name == "toThailand") {
      setToThailand(!toThailand);
    }
  };

  console.log("csvData", csvData);

  return (
    <div className="col-8 col-sm-8  col-md-6 col-lg-3">
      <h6>เลือก Export</h6>
      <div class="mb-3">
        {/* <label for="exampleFormControlInput1" class="form-label">
          รหัสลูกค้า
        </label> */}
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="รหัสลูกค้า"
          name="customerCode"
          onChange={selectProductExport}
        />
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          name="chineseWarehouse"
          value={closeCabinet}
          onChange={selectProductExport}
        />
        <label class="form-check-label" for="flexCheckDefault">
          วันที่ถึงโกดังจีน
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="closeCabinet"
          value={closeCabinet}
          onClick={selectProductExport}
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          วันที่ปิดตู้
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="toThailand"
          id="flexCheckDefault"
          value={toThailand}
          onClick={selectProductExport}
        />
        <label class="form-check-label" for="flexCheckDefault">
          วันที่ถึงโกดังไทย
        </label>
      </div>
      {productExport != null && (
        <CSVLink
          data={csvData}
          separator={";"} // Use semicolon as the separator
          filename={"sample.csv"}
        >
          Export to CSV
        </CSVLink>
      )}
    </div>
  );
};

/* วันที่ถึงโกดังจีน
2. วันที่ปิดตู้
3. รหัสลูกค้า 
4.วันที่ถึงโกดังไทย
 */
export default CSVExport;
