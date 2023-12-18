import { createStore, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IUser } from 'src/libs/models';
import { IMessage } from 'src/libs/models/message.model';

const STORE_NAME = 'users';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<IUser>(),
  withActiveId()
);
