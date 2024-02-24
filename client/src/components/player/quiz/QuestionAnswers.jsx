import { Box, Radio, FormControlLabel, RadioGroup } from "@mui/material";

function QuestionAnswers({
  quiz,
  currentQuestionIndex,
  handleAnswerSelect,
  showRC,
}) {
  return (
    <>
      <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        Question {currentQuestionIndex + 1} of {quiz?.questions?.length}
      </p>
      <Box
        style={{
          paddingTop: "9px",
          width: "500px",
          height: "270px",
          overflowY: showRC && "scroll",
        }}
      >
        {showRC && (
          <div>
            {quiz?.questions[currentQuestionIndex]?.correct === true && (
              <p style={{ color: "green", fontWeight: "bold" }}>Correct</p>
            )}
            {quiz?.questions[currentQuestionIndex]?.correct === false ? (
              <p style={{ color: "red", fontWeight: "bold" }}>Incorrect</p>
            ) : (
              !quiz?.questions[currentQuestionIndex]?.attempted && (
                <p style={{ color: "blue", fontWeight: "bold" }}>Unanswered</p>
              )
            )}
          </div>
        )}

        <p style={{ fontWeight: "bold" }}>
          {quiz.questions[currentQuestionIndex]?.question}
        </p>
        <RadioGroup
          onChange={(event) => {
            handleAnswerSelect(
              quiz?.questions[currentQuestionIndex]?._id,
              event.target.value
            );
          }}
        >
          {quiz?.questions[currentQuestionIndex].options.map(
            (option, optionIndex) => (
              <FormControlLabel
                key={optionIndex}
                value={option}
                control={<Radio />}
                label={option}
                disabled={showRC}
              />
            )
          )}
        </RadioGroup>

        {showRC && (
          <>
            <p style={{ padding: "15px 0px 0px 0px" }}>
              <strong>Correct Answer:</strong>{" "}
              {quiz?.questions[currentQuestionIndex].answer}
            </p>
            <p style={{ padding: "15px 0px 30px 0px" }}>
              <strong>Explanation:</strong>{" "}
              {quiz?.questions[currentQuestionIndex].explanation}
            </p>
          </>
        )}
      </Box>
    </>
  );
}

export default QuestionAnswers;
