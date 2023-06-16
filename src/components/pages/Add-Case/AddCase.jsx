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
  const [pklNumber, setPklNumber] = useState("");
  const [invNumber, setInvNumber] = useState("");
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
    formData.append("caseName", `PKL_${pklNumber}_INV_${invNumber}`);
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
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="case_id">
                    PKL Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="case_id"
                    value={pklNumber}
                    onChange={(event) => setPklNumber(event.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="case_id">
                    INV Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="case_id"
                    value={invNumber}
                    onChange={(event) => setInvNumber(event.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="date_id">Case Date</label>
                  {/* <input type="date" id='date_id' className='form-control' /> */}
                  <DatePicker
                    selected={startDate}
                    value={startDate}
                    className="form-control"
                    onChange={(date) => setStartDate(date)}
                  />
                  {!file && (
                    <div className="no-files">
                      <strong>
                        <i class="uil uil-folder-open"></i>
                      </strong>
                      <span>No Packing list Added Yet!</span>
                    </div>
                  )}
                  {file && (
                    <div className="no-files">
                      <strong>
                        <i class="uil uil--open"></i>
                      </strong>
                      <span className="file-name success">
                        <i class="uil uil-folder-check "></i>{" "}
                        {file && `${file.name}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
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
              </div>
            </div>
            <div className="btn-add-case">
              <button
                type="button"
                className="shark-btn-main"
                disabled={!file || invNumber === "" || pklNumber === ""}
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
