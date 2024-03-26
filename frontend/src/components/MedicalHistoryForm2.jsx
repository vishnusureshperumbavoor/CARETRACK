import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function MedicalHistoryForm2() {
  return (
    <div>
      {/* <iframe src="../assets/pdfs/Adult-Medical-History-Form-1.pdf" title="PDF Viewer" width="100%" height="600px"></iframe> */}
      {/* <iframe src="Adult-Medical-History-Form-1.pdf" width="100%" height="500px" /> */}
      {/* <embed src="../assets/pdfs/Adult-Medical-History-Form-1.pdf" type="application/pdf" width="100%" height="600px" /> */}
      <Document file="../../public/pdfs/Adult-Medical-History-Form-2.pdf">
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export default MedicalHistoryForm2;
