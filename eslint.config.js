const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const preferArrowPlugin = require('eslint-plugin-prefer-arrow');

module.exports = tseslint.config(
  // ─── Ignored paths ──────────────────────────────────────────────────────────
  {
    ignores: ['projects/**/*', 'dist/**/*', '.angular/**/*']
  },

  // ─── TypeScript files ────────────────────────────────────────────────────────
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    plugins: {
      '@angular-eslint': angularPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      'prefer-arrow': preferArrowPlugin
    },
    // Extracts inline templates from .ts files so the HTML block below can lint them
    processor: angularTemplatePlugin.processors['extract-inline-html'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json']
      }
    },
    rules: {
      // ── Angular: recommended baseline ──────────────────────────────────────
      ...angularPlugin.configs.recommended.rules,
      // NgModule-based project: prefer-standalone is 'error' in recommended;
      // downgrade to warn until the project is migrated to standalone components
      '@angular-eslint/prefer-standalone': 'warn',

      // ── Angular: selectors ─────────────────────────────────────────────────
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],

      // ── Angular: best practices (not covered by recommended) ───────────────
      '@angular-eslint/no-async-lifecycle-method': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/sort-lifecycle-methods': 'warn',
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
            'instance-method'
          ]
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/require-await': 'error',

      // ── General: clean code ─────────────────────────────────────────────────
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': 'warn',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',
      radix: 'error',

      // ── Imports: ordering & deduplication ──────────────────────────────────
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always'
        }
      ],
      'import/no-duplicates': 'error',

      // ── Arrow functions ─────────────────────────────────────────────────────
      'prefer-arrow/prefer-arrow-functions': [
        'warn',
        { disallowPrototype: true, singleReturnOnly: false, classPropertiesAllowed: false }
      ],

      // ── Prettier ────────────────────────────────────────────────────────────
      'prettier/prettier': 'error'
    }
  },

  // ─── HTML templates ──────────────────────────────────────────────────────────
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin
    },
    languageOptions: {
      parser: angularTemplateParser
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
      '@angular-eslint/template/use-track-by-function': 'warn'
    }
  },

  // ─── Prettier: must be last — disables formatting rules that conflict with Prettier ──
  prettierConfig
);
