import config from "eslint-config-love";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ...[].concat(config),
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);