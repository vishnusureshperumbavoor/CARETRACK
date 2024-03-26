import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function MedicalHistoryForm1() {
  const pdfURL = "../pdfs/AdultMedicalHistoryForm1.pdf";

  return (
    <div>
      {/* <iframe src="../pdfs/Adult-Medical-History-Form-1.pdf" title="PDF Viewer" width="100%" height="600px"></iframe> */}
      {/* <iframe src="Adult-Medical-History-Form-1.pdf" width="100%" height="500px" /> */}
      {/* <embed src="../assets/pdfs/Adult-Medical-History-Form-1.pdf" type="application/pdf" width="100%" height="600px" /> */}
      <Document file={pdfURL}>
        <Page pageNumber={1} />
      </Document>
      {pdfURL}
    </div>
  );
}

export default MedicalHistoryForm1;
