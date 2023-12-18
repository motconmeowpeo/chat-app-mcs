import { createStore, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IMessage } from 'src/libs/models/message.model';

const STORE_NAME = 'message';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<IMessage>(),
  withActiveId()
);
