// types/index.ts
import { HomeState } from './modules/home'
import { UserState } from './modules/user'

type VuexModuleType = {
  home: HomeState;
  user: UserState;
};

export type StateType = VuexModuleType;
