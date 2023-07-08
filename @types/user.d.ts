export interface UserInterface {
  _id: string;
  username: string;
}

export type UserContextType = {
  user: UserInterface | null;
  refreshUser: () => void;
  login: (username: string, password: string) => Promise<string | null>;
  signOut: () => void;
};
