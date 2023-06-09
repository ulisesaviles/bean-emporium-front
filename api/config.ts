// To perform HTTP requests
import { LC_KEYS } from "@/app/config/types";
import { Auth } from "aws-amplify";
import axios from "axios";

// API configuration
const config = {
  apiId: "dt9ucis4i6",
  stageName: "dev",
};
const baseUrl = `https://${config.apiId}.execute-api.us-east-1.amazonaws.com/${config.stageName}/`;

/**
 * Perform a query to our AWS API.
 * @param method The HTTP method to perform.
 * @param path The API route, not starting with / and not including the params.
 * @param params The query params to use, in a JSON format (they will be parsed to url query params).
 * @param body The object to send as a body.
 * @returns A promise with the axios result.
 */
export const baseRequest = async (
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  params?: { [key: string]: string },
  body?: object,
  tokenRequired?: boolean
) => {
  // Build params as string in the form of "?param=value&param2=value2"
  let paramsAsStr = "?";
  if (params) {
    const paramKeys = Object.keys(params);
    for (let i = 0; i < paramKeys.length; i++) {
      const paramKey = paramKeys[i];
      paramsAsStr += `${paramKey}=${params[paramKey]}`;
      if (i < paramKeys.length - 1) paramsAsStr += `&`;
    }
  }

  let request: any = {
    method,
    url: `${baseUrl}${path}${params ? paramsAsStr : ""}`,
    data: body,
  }

  if (tokenRequired) {
    const token = localStorage.getItem(LC_KEYS.SESSION_TOKEN);
    if (token) {
      request["headers"] = {};
      request["headers"]["Authorization"] = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;
    }
    else {
      throw new Error('NO token.');
    }
  }

  // Perform base axios operation
  return await axios(request);
};
