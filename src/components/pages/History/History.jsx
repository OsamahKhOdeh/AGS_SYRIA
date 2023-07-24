import React, { useEffect, useState } from "react";
import "./history.scss";
import axios from "axios";
import { ArchiveFileType, CaseStatus, ToastType } from "../Enum/Constants";
import { BASE_URL } from "../../../config/Config";
import { formateDate } from "../shared/functions/global";
import { showToastMessage } from "../shared/Toaster/Toaster";
export const History = () => {
  const [allCases, setAllCases] = useState([]);
  const [bufferAllCases, setBufferAllCases] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const getAllCases = async () => {
      await axios
        .get(`${BASE_URL}/archive/${CaseStatus.COMPLETED}`)
        .then(async (response) => {
          setAllCases(response.data);
          setBufferAllCases(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getAllCases();
  }, []);
  useEffect(() => {
    const filterCases = () => {
      if (query?.length > 2) {
        let bufferCases = allCases.filter((item) => item.caseName.toLowerCase().includes(query.toLowerCase()));
        setAllCases(bufferCases);
      } else {
        setAllCases(bufferAllCases);
      }
    };
    filterCases();
  }, [query]);
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
      url: `${BASE_URL}/archive/archive/${caseName.replace(/ /g, "_")}?type=${type}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${caseName}_${type}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <div className="card">
        <div className="card-tittle">
          <h5>History </h5>
        </div>
        <div className="card-body">
          {allCases.length > 0 && (
            <div className="form-group">
              <input type="text" value={query} className="form-control" placeholder="Enter case name " onChange={(e) => setQuery(e.target.value)} />
            </div>
          )}
          {allCases.length <= 0 && (
            <div className="empty-img">
              <img src="./images/Empty.png" alt="empty-img" />
              <strong>No Items Archived Yet!</strong>
            </div>
          )}
          <div className="cases-grid">
            {allCases.length > 0 &&
              allCases.map((item, index) => (
                <div className="case-grid">
                  <div className="case-grid-tittle">
                    <h7>{item.caseName}</h7>
                    <span>{formateDate(item.caseDate)}</span>
                  </div>
                  <div className="files-cases">
                    <div className="file-case">
                      {item.files.findIndex((f) => f.type === ArchiveFileType.PKL) != -1 ? (
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
                      {item.files.findIndex((f) => f.type === ArchiveFileType.BEOE) != -1 ? (
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
                      {item.files.findIndex((f) => f.type === ArchiveFileType.AS) != -1 ? (
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
                    <div className="file-case">
                      {item.files.findIndex((f) => f.type === ArchiveFileType.INVOICE) != -1 ? (
                        <i
                          class="fas fa-file-pdf"
                          onClick={() => {
                            openPdfFile(item.caseName, ArchiveFileType.INVOICE);
                          }}
                        ></i>
                      ) : (
                        <i class="far fa-file-pdf"></i>
                      )}
                      <strong>INV</strong>
                    </div>
                  </div>
                  <div className="case-footer-view">
                    <h5>INV No</h5>
                    <span>{item.invoiceNumber}</span>
                  </div>
                </div>
              ))}
            {/* <div className="case-grid">
          <div className="case-grid-tittle">
            <h5>6515616</h5>
            <span>5/10/2025</span>
          </div>
          <div className="files-cases">
             <div className="file-case">
                <i class="fas fa-file-pdf"></i>
                <strong>Packing List</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>Beo</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>As</strong>
             </div>
          </div>
          <div className="case-footer-view">
            <h5>INV No</h5>
            <span>521545</span>
          </div>
         </div>
         <div className="case-grid">
          <div className="case-grid-tittle">
            <h5>6515616</h5>
            <span>5/10/2025</span>
          </div>
          <div className="files-cases">
             <div className="file-case">
                <i class="fas fa-file-pdf"></i>
                <strong>Packing List</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>Beo</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>As</strong>
             </div>
          </div>
          <div className="case-footer-view">
            <h5>INV No</h5>
            <span>521545</span>
          </div>
         </div>
         <div className="case-grid">
          <div className="case-grid-tittle">
            <h5>6515616</h5>
            <span>5/10/2025</span>
          </div>
          <div className="files-cases">
             <div className="file-case">
                <i class="fas fa-file-pdf"></i>
                <strong>Packing List</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>Beo</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>As</strong>
             </div>
          </div>
          <div className="case-footer-view">
            <h5>INV No</h5>
            <span>521545</span>
          </div>
         </div>
         <div className="case-grid">
          <div className="case-grid-tittle">
            <h5>6515616</h5>
            <span>5/10/2025</span>
          </div>
          <div className="files-cases">
             <div className="file-case">
                <i class="fas fa-file-pdf"></i>
                <strong>Packing List</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>Beo</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>As</strong>
             </div>
          </div>
          <div className="case-footer-view">
            <h5>INV No</h5>
            <span>521545</span>
          </div>
         </div>
         <div className="case-grid">
          <div className="case-grid-tittle">
            <h5>6515616</h5>
            <span>5/10/2025</span>
          </div>
          <div className="files-cases">
             <div className="file-case">
                <i class="fas fa-file-pdf"></i>
                <strong>Packing List</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>Beo</strong>
             </div>
             <div className="file-case">
                <i class="far fa-file-pdf"></i>
                <strong>As</strong>
             </div>
          </div>
          <div className="case-footer-view">
            <h5>INV No</h5>
            <span>521545</span>
          </div>
         </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
