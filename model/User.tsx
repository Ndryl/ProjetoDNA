import { DocumentData, Timestamp } from "firebase/firestore";

export default interface User {
  id?: string;
  uid: string;
  email: any;
  token: string;
  accepted?: boolean;
  created_at?: Timestamp;
  name?: string;
  project_id?: DocumentData | string;
  role?: string;
  status?: boolean;
  user_id?: DocumentData | string;
  imageUrl?: any;
}
