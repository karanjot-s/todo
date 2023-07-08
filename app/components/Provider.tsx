import { ReactNode } from "react";
import AuthProvider from "../auth/Provider";

interface Props {
  children: ReactNode;
}

function Provider({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Provider;
