import React, { useEffect, useState } from "react";
import "./cases.scss";
import { ArchiveFileType, CaseStatus, ToastType } from "../Enum/Constants";
import { showToastMessage } from "../shared/Toaster/Toaster";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../config/Config";
import { formateDate } from "../shared/functions/global";

export const Cases = () => {
  const [filePKL, setFilePKL] = useState({});
  const [currentCase, setCurrentCase] = useState();
  const [filePOE, setFilePOE] = useState();
  const [fileAS, setFileAS] = useState();
  const [allCases, setAllCases] = useState([]);
  const [bufferAllCases, setBufferAllCases] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Function to handle the search query
  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);
    // Call a search function to get the results
    //  const searchResults = allCases.filter(a => a.caseName === value);
    //  setAllCases(searchResults);
  };
  // const updatedFiles = []
  // const [updatedFiles, setUpdatedFiles] = useState([]);
  const FileType = ArchiveFileType;
  // handler File PKL
  const handleFilePklChange = (e) => {
    if (e.target.files) {
      setFilePKL(e.target.files[0]);
      // console.log(filePKL);
      // setFilePKL(e.target.files[0]);
      // const index = updatedFiles.findIndex(el => el.type === FileType.PKL)
      // index != -1 ?  updatedFiles[index].file = filePKL :  setFilePKL({fileType : FileType.PKL,file:e.target.files[0]});
    } else {
      showToastMessage("Select Only PDF File,  Try Again", ToastType.Warning);
    }
    // console.log(filePKL)
  };
  // handler File POE
  const handleFilePOEChange = (e) => {
    if (e.target.files[0]) {
      setFilePOE(e.target.files[0]);
      // console.log(filePOE);
      // let index = updatedFiles.findIndex(el => el.type === FileType.BEOE)
      //   index != -1 ?   updatedFiles[index].file = filePOE :   setFilePOE({fileType : FileType.BEOE,file:e.target.files[0]});
    }
  };
  // handler File PKL
  const handleFileASChange = (e) => {
    if (e.target.files[0]) {
      setFileAS(e.target.files[0]);
      // console.log(fileAS);
      // setFileAS(e.target.files[0]);
      // let index = updatedFiles.findIndex(el => el.type === FileType.AS)
      // index != -1 ?  updatedFiles[index].file = fileAS :  setFilePOE({fileType : FileType.AS,file:e.target.files[0]})
    } else {
      showToastMessage("Select Only PDF File,  Try Again", ToastType.Warning);
    }
  };
  const openPdfFile = (caseName, type) => {
    //  axios
    // .get(`${BASE_URL}/archive/archive/${caseName}?type=${type}`)
    // .then( async (response) => {
    //   console.log(response.data)
    //   setTimeout(() => {
    //    const url = window.URL.createObjectURL(new Blob([response.data]));
    //    const link = document.createElement("a");
    //    link.href = url;
    //    link.setAttribute("download", `dd.pdf`);
    //    document.body.appendChild(link);
    //    link.click();
    //    document.body.removeChild(link);
    //   }, 2000);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    //
    axios({
      url: `${BASE_URL}/archive/archive/${caseName.replace(
        / /g,
        "_"
      )}?type=${type}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `new.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const UploadFile = (type, file) => {
    const formData = new FormData();
    formData.append("caseName", currentCase.caseName);
    formData.append("fileType", type);
    formData.append("archiveEmployee", "Archiver_Osama");
    formData.append("file", file);
    axios
      .patch(`${BASE_URL}/archive/${currentCase._id}`, formData)
      .then((response) => {
        // console.log(response.data);
        setRefresh((prev) => !prev);
        showToastMessage("File Updated Successfuly", ToastType.Success);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  const handleSaveFiles = () => {
    // console.log(updatedFiles)
    // const formData = new FormData()
    // formData.append("files",updatedFiles)
    // formData.append("caseName","sss")
    // console.log( formData.get("files"))
    //    axios.patch('http://10.255.254.43:5000/test', {
    //       formData
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.error(err));
    // };
    axios
      .patch(`${BASE_URL}/archive/test`, {})
      .then((response) => {
        // Handle the response data
        // console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  useEffect(() => {
    const getAllCases = async () => {
      await axios
        .get(`${BASE_URL}/archive/${CaseStatus.DRAFT}`)
        .then(async (response) => {
          setAllCases(response.data);
          setBufferAllCases(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getAllCases();
  }, [refresh]);
  useEffect(() => {
    const filterCases = () => {
      if (query?.length > 2) {
        let bufferCases = allCases.filter((item) =>
          item.caseName.toLowerCase().includes(query.toLowerCase())
        );
        setAllCases(bufferCases);
      } else {
        setAllCases(bufferAllCases);
      }
    };
    filterCases();
  }, [query]);
  return (
    <>
      <ToastContainer />
      {/* <button onClick={() => openPdfFile('https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf')}>MYDPF</button> */}
      <div className="card">
        <div className="card-tittle">
          <h5>All Cases </h5>
        </div>
        <div className="card-body">
          {allCases.length > 0 && (
            <div className="form-group">
              <input
                type="text"
                value={query}
                className="form-control"
                placeholder="Enter case name "
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          )}
          <div className="cases-grid">
            {allCases.length > 0 &&
              allCases.map((item, index) => (
                <div className="case-grid">
                  <div className="case-grid-tittle">
                    <h5>{item.caseName}</h5>
                    <span>{formateDate(item.caseDate)}</span>
                  </div>
                  <div className="files-cases">
                    <div className="file-case">
                      {item.files.findIndex(
                        (f) => f.type === ArchiveFileType.PKL
                      ) != -1 ? (
                        <i
                          class="fas fa-file-pdf"
                          onClick={() => {
                            openPdfFile(item.caseName, ArchiveFileType.PKL);
                          }}
                        ></i>
                      ) : (
                        <i class="far fa-file-pdf"></i>
                      )}
                      <strong>Packing List</strong>
                    </div>
                    <div className="file-case">
                      {item.files.findIndex(
                        (f) => f.type === ArchiveFileType.BEOE
                      ) != -1 ? (
                        <i
                          class="fas fa-file-pdf"
                          onClick={() => {
                            openPdfFile(item.caseName, ArchiveFileType.BEOE);
                          }}
                        ></i>
                      ) : (
                        <i class="far fa-file-pdf"></i>
                      )}
                      <strong>PER</strong>
                    </div>
                    <div className="file-case">
                      {item.files.findIndex(
                        (f) => f.type === ArchiveFileType.AS
                      ) != -1 ? (
                        <i
                          class="fas fa-file-pdf"
                          onClick={() => {
                            openPdfFile(item.caseName, ArchiveFileType.AS);
                          }}
                        ></i>
                      ) : (
                        <i class="far fa-file-pdf"></i>
                      )}
                      <strong>CR</strong>
                    </div>
                  </div>
                  <div
                    className="case-grid-footer"
                    onClick={() => setCurrentCase(item)}
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                  >
                    <span>upload</span>
                  </div>
                </div>
              ))}
          </div>
          {allCases.length <= 0 && (
            <div className="empty-img">
              <img src="./images/Empty.png" alt="empty-img" />
              <strong>No Items Added Yet!</strong>
            </div>
          )}
        </div>
      </div>
      {/* modal for upload pdfs */}
      {currentCase && (
        <div
          class="modal fade bd-example-modal-lg"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit {currentCase.caseName}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="cases-grid">
                  <div className="case-grid">
                    {/* <span className='btn-delete'><i class="uil uil-trash-alt"></i></span> */}
                    <div className="files-cases">
                      <div className="file-case">
                        {currentCase.files.findIndex(
                          (f) => f.type === ArchiveFileType.PKL
                        ) != -1 ? (
                          <i
                            class="fas fa-file-pdf"
                            onClick={() => {
                              openPdfFile(
                                currentCase.caseName,
                                ArchiveFileType.PKL
                              );
                            }}
                          ></i>
                        ) : (
                          <i class="far fa-file-pdf"></i>
                        )}
                        {/* <i class="fas fa-file-pdf"></i> */}
                        <strong>Packing List</strong>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="file_pkl"
                      className="d-none"
                      accept="application/pdf"
                      onChange={handleFilePklChange}
                    />
                    <label htmlFor="file_pkl" className="case-grid-footer">
                      <span>Select</span>
                    </label>
                    <label
                      className="case-grid-footer"
                      onClick={() => UploadFile(ArchiveFileType.PKL, filePKL)}
                    >
                      <span>Upload</span>
                    </label>
                  </div>
                  <div className="case-grid">
                    {/* <span className='btn-delete'><i class="uil uil-trash-alt"></i></span> */}
                    <div className="files-cases">
                      <div className="file-case">
                        {currentCase.files.findIndex(
                          (f) => f.type === ArchiveFileType.BEOE
                        ) != -1 ? (
                          <i
                            class="fas fa-file-pdf"
                            onClick={() => {
                              openPdfFile(
                                currentCase.caseName,
                                ArchiveFileType.PEOE
                              );
                            }}
                          ></i>
                        ) : (
                          <i class="far fa-file-pdf"></i>
                        )}
                        {/* <i class="far fa-file-pdf"></i> */}
                        <strong>PER</strong>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="file_poe"
                      className="d-none"
                      accept="application/pdf"
                      onChange={handleFilePOEChange}
                    />
                    <label htmlFor="file_poe" className="case-grid-footer">
                      <span>Select</span>
                    </label>
                    <label
                      className="case-grid-footer"
                      onClick={() => UploadFile(ArchiveFileType.BEOE, filePOE)}
                    >
                      <span>Upload</span>
                    </label>
                  </div>
                  <div className="case-grid">
                    {/* <span className='btn-delete'><i class="uil uil-trash-alt"></i></span> */}
                    <div className="files-cases">
                      <div className="file-case">
                        {currentCase.files.findIndex(
                          (f) => f.type === ArchiveFileType.AS
                        ) != -1 ? (
                          <i
                            class="fas fa-file-pdf"
                            onClick={() => {
                              openPdfFile(
                                currentCase.caseName,
                                ArchiveFileType.AS
                              );
                            }}
                          ></i>
                        ) : (
                          <i class="far fa-file-pdf"></i>
                        )}
                        {/* <i class="far fa-file-pdf"></i> */}

                        <strong>CR</strong>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="file_as"
                      className="d-none"
                      accept="application/pdf"
                      onChange={handleFileASChange}
                    />
                    <label htmlFor="file_as" className="case-grid-footer">
                      <span>Select</span>
                    </label>
                    <label
                      className="case-grid-footer"
                      onClick={() => UploadFile(ArchiveFileType.AS, fileAS)}
                    >
                      <span>Upload</span>
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className="modal-footer">
              <button className='shark-btn-success'  onClick={handleSaveFiles} >Save</button>
             </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Cases;
