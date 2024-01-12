import { HTTP } from "./enum";

export interface iError {
  name: string;
  message: string;
  status: HTTP;
  success: boolean;
}
