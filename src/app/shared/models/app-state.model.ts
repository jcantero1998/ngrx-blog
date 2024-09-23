import { AuthState } from "@shared/state/reducers/auth.reducer";
import { BlogState } from "@shared/state/reducers/blog.reducers";
import { GeneralState } from "@shared/state/reducers/general.reducer";

export interface AppState {
  auth: AuthState;
  blogs: BlogState;
  general: GeneralState;
}
