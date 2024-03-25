import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function Medical_History_Form1() {
  return (
    <div>
        {/* <iframe src="../assets/pdfs/Adult-Medical-History-Form-1.pdf" title="PDF Viewer" width="100%" height="600px"></iframe> */}
        {/* <iframe src="Adult-Medical-History-Form-1.pdf" width="100%" height="500px" /> */}
        {/* <embed src="../assets/pdfs/Adult-Medical-History-Form-1.pdf" type="application/pdf" width="100%" height="600px" /> */}
        <Document file="../../public/Adult-Medical-History-Form-1.pdf">
        <Page pageNumber={1} />
      </Document>
    </div>
  )
}

export default Medical_History_Form1