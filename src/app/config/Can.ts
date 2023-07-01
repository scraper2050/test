import { PureAbility } from '@casl/ability';
import { createCanBoundTo } from '@casl/react';
import defineRulesFor from './ability';
import store from '../../store';

export const ability = new PureAbility();

store.subscribe(() => {
  const { user } = store.getState().auth;
  if (user) {
    ability.update(defineRulesFor(user));
  }
});

export const Can = createCanBoundTo(ability);
