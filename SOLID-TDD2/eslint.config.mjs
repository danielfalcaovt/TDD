import config from "eslint-config-love";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ...[].concat(config),
    files: ['**/*.ts'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);