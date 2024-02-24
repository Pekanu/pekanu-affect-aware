import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Divider,
} from "@mui/material";

const QuizQuestion = ({
  index,
  question,
  handleQuestionChange,
  handleOptionSelect,
  handleOptionChange,
  handleExplanationChange,
  isModuleEdit,
}) => {
  return (
    <div>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          display: "flex",
          width: "400px",
          justifyContent: "center",
        }}
      >
        <TextField
          label={`Question ${index + 1}`}
          defaultValue={question.question}
          onChange={(e) => handleQuestionChange(index, e.target.value)}
          variant="standard"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <span className="font-bold text-black">Options:</span>
          </FormLabel>
          <RadioGroup>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <FormControlLabel
                  defaultValue={option}
                  control={
                    <Radio
                      checked={question.answer === option}
                      onChange={() => handleOptionSelect(index, optionIndex)}
                    />
                  }
                  label={
                    <TextField
                      variant="standard"
                      defaultValue={option}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e.target.value)
                      }
                    />
                  }
                />
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        <div>
          <span className="font-bold">Correct Answer: {question.answer}</span>
        </div>
        <TextField
          id="standard-multiline-flexible"
          label="Explanation"
          multiline
          maxRows={4}
          variant="standard"
          defaultValue={question.explanation}
          onChange={(e) => handleExplanationChange(index, e.target.value)}
        />

        <div className="pb-5">
          <Divider variant="horizontal" sx={{ width: "650px" }} />
        </div>
      </Stack>
    </div>
  );
};

export default QuizQuestion;
