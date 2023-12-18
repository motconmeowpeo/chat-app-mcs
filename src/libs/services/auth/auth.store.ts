import { createStore, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { IAuth } from 'src/libs/models';

const STORE_NAME = 'auth';

export const store = createStore(
  { name: STORE_NAME },
  withProps<IAuth>({
    user: null,
    accessToken: null,
  })
);
persistState(store, {
  storage: localStorageStrategy,
});
