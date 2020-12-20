import { Action } from '@ngrx/store';

export interface TypedAction<T extends string> extends Action {
  readonly type: T;
}
