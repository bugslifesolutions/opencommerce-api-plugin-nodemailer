import {migrationsNamespace} from './migrationsNamespace.js';
import migration1 from './1.js';

export default {
  tracks: [
    {
      namespace: migrationsNamespace,
      migrations: {
        1: migration1,
      },
    },
  ],
};
