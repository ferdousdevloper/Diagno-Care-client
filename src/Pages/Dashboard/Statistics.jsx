
import jsPDF from "jspdf";
import { useRef } from "react";

const Statistics = () => {
  const contentRef = useRef();
  const generatePdf = () => {
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.html(contentRef.current, {
      callback: (doc) => {
        doc.save('document.pdf');
      },
      x: 10,
      y: 10,
      html2canvas: { scale: 1 } // Adjust scale for better layout if needed
    });
  };

  return (
    <div ref={contentRef}>
      <h1>hello</h1>
      <p>
        This is the body content of the PDF. Here you can include paragraphs of
        text. Adjust the maxWidth in the doc.text options to fit your layout
        needs. jsPDF makes it easy to create documents on the fly and customize
        them as needed.
      </p>
      <button onClick={() => generatePdf()}>Generate PDF</button>
    </div>
  );
};

export default Statistics;
