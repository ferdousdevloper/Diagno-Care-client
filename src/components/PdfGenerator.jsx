// src/components/PdfGenerator.js

import jsPDF from 'jspdf';
import useAxiosPublic from './../hooks/useAxiosPublic';
import { useState } from 'react';

const PdfGenerator = () => {
    const axiosPublic = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  console.log(users);

  const [selectedData, setSelectedData] = useState(null);

    const generatePdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Fetched Data', 10, 10);
    
        doc.setFontSize(12);
        if (data) {
          let yPosition = 20;
          data.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.name}: ${item.value}`, 10, yPosition);
            yPosition += 10;
          });
        } else {
          doc.text('No data available.', 10, 20);
        }
    
        doc.save('fetched-data.pdf');
      };

  return (
    <div>
      <button onClick={generatePdf} onClick={() => setSelectedData(users)}>Generate PDF</button>
    </div>
  );
};

export default PdfGenerator;
