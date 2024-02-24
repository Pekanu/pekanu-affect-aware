import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function Notes({ link }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      style={{
        paddingTop: "1px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "450px",
      }}
    >
      <div
        style={{
          display: "flex",
          overflowY: "scroll",
        }}
      >
        <Document
          file={import.meta.env.VITE_SERVER_ENDPOINT + `/${link}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>

      <Stack spacing={2} className="flex items-center justify-center py-4">
        <Pagination
          count={numPages}
          renderItem={(item) => {
            setPageNumber(item.page - 1);
            return (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
                color="primary"
              />
            );
          }}
        />
      </Stack>
    </div>
  );
}
