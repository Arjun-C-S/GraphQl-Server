import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ['**/.eslintrc.js', '**/node_modules/', '**/commitlint.config.ts'],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:prettier/recommended',
            'plugin:import/recommended',
            'plugin:import/typescript',
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
        ),
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslintEslintPlugin),
            prettier: fixupPluginRules(prettier),
            import: fixupPluginRules(importPlugin),
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: 'module',

            parserOptions: {
                project: 'tsconfig.json',
            },
        },

        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },

                typescript: {
                    project: './tsconfig.json',
                },
            },
        },

        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],

            'no-console': 'off',
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            indent: ['error', 4],
            'new-cap': 'off',

            'max-len': [
                'error',
                {
                    code: 120,
                    comments: 120,
                },
            ],

            'global-require': 'error',
            'handle-callback-err': ['error', '^(err|error)$'],
            'no-buffer-constructor': 'error',

            'no-mixed-requires': [
                'error',
                {
                    grouping: true,
                    allowCall: true,
                },
            ],

            'no-path-concat': 'error',
            'import/extensions': 'off',
            'import/prefer-default-export': 'off',
            'import/no-default-export': 'error',

            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: true,
                },
            ],

            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],

            'require-jsdoc': 'off',
            'linebreak-style': 'off',
            'import/no-unresolved': 'error',

            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index', 'unknown'],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    'newlines-between': 'always',

                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
];
