import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Divider } from "@mui/material";

import PekanuTheme from "../../../../store/Theme";

import LeftForm from "./leftForm";
import RightForm from "./RightForm";

export default function EditForm() {
  const isEdit = true;

  return (
    <PekanuTheme>
      <div className="pt-10"></div>
      <Box sx={{ flexGrow: 1 }}>
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Divider orientation="vertical" flexItem />
          <LeftForm isEdit={isEdit} />

          <Divider orientation="vertical" flexItem />
          <RightForm isEdit={isEdit} />
        </Container>
      </Box>
    </PekanuTheme>
  );
}
