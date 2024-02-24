import { useHttpRequest } from "./httpClient";

export const ACTIONS = {
  LOGIN: "login",
  OPENED_COURSE: "opened_course",
  CLICK: "click",
  OPENED_MODULE: "opened_module",
  MUTE: "mute",
  UNMUTE: "unmute",
  PLAY: "play",
  PAUSE: "pause",
  SUBMIT_QUIZ: "submit_quiz",
  COURSE_REGISTRATION: "course_registration",
  COURSE_STARTED: "course_started",
  LOGOUT: "logout",
}

export default function useEventLogger() {
  const sendRequest = useHttpRequest();

  return async (event) => {
    const { action, context } = event;

    const data = {
      action: action || "unknown",
      context: context ,
    };

    const URI = "/api/log";

    sendRequest(URI, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log("Log Created - " + action);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
