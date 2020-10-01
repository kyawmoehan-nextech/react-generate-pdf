import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Box,
  Button,
} from "@material-ui/core";
import { doc } from "prettier";

const users = [
  { no: 1, name: "Kyaw Kyaw", age: 12, phoneNumber: 888 },
  { no: 2, name: "Mg Mg", age: 12, phoneNumber: 888 },
  { no: 3, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 4, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 5, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 6, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 7, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 8, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 9, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 10, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 11, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 12, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 13, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 14, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 15, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 16, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 17, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 18, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 19, name: "Hla Hla", age: 12, phoneNumber: 888 },
  { no: 20, name: "Hla Hla", age: 12, phoneNumber: 888 },
];

const PdfGenerator = () => {
  const getPdfWithZip = (input) => {
    // make canvas
    let copyDom = input.clone();
    opyDom.width(input.width() + "px");
    copyDom.height(input.height() + "px");
    html2canvas(input, {
      scale: 2,
      // windowWidth: input.scrollWidth,
      // windowHeight: input.scrollHeigh,
    }).then((canvas) => {
      var imgWidth = 210;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      // make pdf
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFillColor(245);
      pdf.rect(0, 0, 210, 700, "F");
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      // zip
      const zip = new JSZip();
      zip.file(`download.name}.pdf`, pdf.output("blob"));
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "example.zip");
      });
    });
    //! generate long html
    // var pdf = new jsPDF("l", "pt", "a4");
    // pdf.html(input, {
    //   callback: function (doc) {
    //     const zip = new JSZip();
    //     zip.file(`download.name}.pdf`, doc.output());
    //     zip.generateAsync({ type: "blob" }).then(function (content) {
    //       saveAs(content, "example.zip");
    //     });
    //   },
    //   x: 10,
    //   y: 10,
    // });
  };

  const printDocument = () => {
    const input = document.getElementById("pdfdiv");
    getPdfWithZip(input);
  };
  return (
    <div>
      <Box p={2} id="pdfdiv">
        <TableContainer className="txt" component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>ContactNum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tbody">
              {users.map((user) => (
                <TableRow key={user.name}>
                  <TableCell className="name">{user.no}</TableCell>
                  <TableCell className="name">{user.name}</TableCell>
                  <TableCell className="age">{user.age}</TableCell>
                  <TableCell className="phoneNumber">
                    {user.phoneNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box m={1}>
        <Button onClick={printDocument} variant="contained" color="primary">
          Generate Pdf
        </Button>
      </Box>
    </div>
  );
};

export default PdfGenerator;
