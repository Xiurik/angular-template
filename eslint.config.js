const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const preferArrowPlugin = require('eslint-plugin-prefer-arrow');
const jsdocPlugin = require('eslint-plugin-jsdoc');
const globals = require('globals');

module.exports = tseslint.config(
  // ─── Ignored paths ──────────────────────────────────────────────────────────
  {
    ignores: ['projects/**/*', 'dist/**/*', '.angular/**/*'],
  },

  // ─── TypeScript source files (non-spec) ─────────────────────────────────────
  {
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.spec.ts'],
    extends: [
      js.configs.recommended,
      // Type-checked rules require project info (slower but catches real bugs)
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      '@angular-eslint': angularPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      'prefer-arrow': preferArrowPlugin,
      jsdoc: jsdocPlugin,
    },
    // Extracts inline templates from .ts files so the HTML block below can lint them
    processor: angularTemplatePlugin.processors['extract-inline-html'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        // Modern TypeScript-ESLint project discovery — picks the right tsconfig per file
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // ── Angular: recommended baseline ──────────────────────────────────────
      ...angularPlugin.configs.recommended.rules,
      // NgModule-based project: pending migration to standalone components
      '@angular-eslint/prefer-standalone': 'warn',

      // ── Angular: component & directive naming ───────────────────────────────
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
      '@angular-eslint/consistent-component-styles': 'error',
      '@angular-eslint/contextual-decorator': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
      '@angular-eslint/pipe-prefix': ['error', { prefixes: ['app'] }],
      '@angular-eslint/use-component-selector': 'error',

      // ── Angular: decorators & metadata ─────────────────────────────────────
      '@angular-eslint/no-attribute-decorator': 'error',
      '@angular-eslint/no-developer-preview': 'warn',
      '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
      '@angular-eslint/no-forward-ref': 'warn',
      '@angular-eslint/no-queries-metadata-property': 'error',
      '@angular-eslint/prefer-host-metadata-property': 'warn',
      '@angular-eslint/relative-url-prefix': 'error',
      '@angular-eslint/sort-keys-in-type-decorator': 'warn',

      // ── Angular: lifecycle hooks ────────────────────────────────────────────
      '@angular-eslint/no-async-lifecycle-method': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/require-lifecycle-on-prototype': 'error',
      '@angular-eslint/sort-lifecycle-methods': 'warn',
      '@angular-eslint/use-lifecycle-interface': 'error',

      // ── Angular: performance & best practices ───────────────────────────────
      '@angular-eslint/no-pipe-impure': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@angular-eslint/use-injectable-provided-in': 'error',

      // ── TypeScript: type safety ─────────────────────────────────────────────
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'static-field',
            'decorated-field',
            'instance-field',
            'constructor',
            'static-method',
            'instance-method',
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/prefer-readonly': 'error',
      // Disable noisy unsafe-* rules — Angular DI produces many false positives
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      // Valuable type-checked rules
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],

      // ── General: clean code ─────────────────────────────────────────────────
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': 'warn',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',
      radix: 'error',

      // ── Imports: Angular-style ordering ────────────────────────────────────
      // Separated parent/sibling groups enforce Angular's recommended import structure:
      // 1. @angular/* → 2. third-party → 3. internal aliases → 4. parent ../ → 5. sibling ./
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: '@angular/**', group: 'external', position: 'before' },
            {
              pattern: '@{api,auth,guards,interceptors,mocks,models-core,models-data,services,shared-data,components/**,directives,pages/**,pipes,shared-layout/**}',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',

      // ── Arrow functions ─────────────────────────────────────────────────────
      'prefer-arrow/prefer-arrow-functions': [
        'warn',
        { disallowPrototype: true, singleReturnOnly: false, classPropertiesAllowed: false },
      ],

      // ── JSDoc: structural quality rules (no requirement to document everything) ──
      'jsdoc/check-alignment': 'warn',
      'jsdoc/no-blank-blocks': 'warn',
      'jsdoc/no-multi-asterisks': 'warn',
      'jsdoc/check-indentation': 'warn',

      // ── Prettier ────────────────────────────────────────────────────────────
      'prettier/prettier': 'error',
    },
  },

  // ─── Spec / test files ──────────────────────────────────────────────────────
  {
    files: ['src/**/*.spec.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      '@angular-eslint': angularPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jasmine,
      },
    },
    rules: {
      // Relaxed for test files
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'off',
      'prefer-const': 'error',
      'import/no-duplicates': 'error',
      'prettier/prettier': 'error',
    },
  },

  // ─── HTML templates ──────────────────────────────────────────────────────────
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    languageOptions: {
      parser: angularTemplateParser,
    },
    rules: {
      // Recommended template rules (banana-in-box, eqeqeq, no-negated-async, prefer-control-flow)
      ...angularTemplatePlugin.configs.recommended.rules,
      // Accessibility rules (alt-text, click-events-have-key-events, etc.)
      ...angularTemplatePlugin.configs.accessibility.rules,
      // Additional quality rules
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',
    },
  },

  // ─── Prettier: must be last — disables formatting rules that conflict with Prettier ──
  prettierConfig,
);

