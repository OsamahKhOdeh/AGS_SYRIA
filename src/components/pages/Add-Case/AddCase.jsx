import React, { useRef, useState } from "react";
import "./addcase.scss";
import Card from "../shared/Card/Card";
import { showToastMessage } from "../shared/Toaster/Toaster";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import { ArchiveFileType, CaseStatus, ToastType } from "../Enum/Constants";
import { BASE_URL } from "../../../config/Config";
import axios from "axios";
export const AddCase = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [caseName, setCaseName] = useState("");
  // this is for upload file
  const [file, setFile] = useState();
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleUploadClick = () => {
    if (!file) {
      return;
    }
  };

  const resetFrom = () => {
    setStartDate(new Date());
    setCaseName("");
    setFile(null);
  };
  //
  const handleAddCase = () => {
    // console.log(file);
    const formData = new FormData();
    formData.append("caseName", caseName);
    formData.append("fileType", ArchiveFileType.PKL);
    formData.append("caseDate", startDate);
    formData.append("logisticEmployee", "osama");
    formData.append("file", file);
    axios
      .post(`${BASE_URL}/archive`, formData)
      .then((response) => {
        // console.log(response.data);
        resetFrom();
        showToastMessage("Case Added Successfuly", ToastType.Success);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="card card-add-case">
        <div className="card-tittle">
          <h5>Add New Case </h5>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="case_id">
                Case Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="case_id"
                value={caseName}
                onChange={(event) => setCaseName(event.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date_id">Case Date</label>
              {/* <input type="date" id='date_id' className='form-control' /> */}
              <DatePicker
                selected={startDate}
                value={startDate}
                className="form-control"
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="form-group upload-file">
              <div className="upload-file-info">
                <span>
                  <i class="uil uil-upload uil-extra-larg"></i>
                </span>
                <span className="btn-upload" htmlFor="pkl_id">
                  Select
                </span>
                <label htmlFor="pkl_id">Select packing list PDF</label>
              </div>
              <input
                type="file"
                id="pkl_id"
                accept="application/pdf"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
            <div className="text-center">{file && `${file.name}`}</div>
            <div className="btn-add-case">
              <button
                type="button"
                className="shark-btn-main"
                disabled={!file || caseName === ""}
                onClick={handleAddCase}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
