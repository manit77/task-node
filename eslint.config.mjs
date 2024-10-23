// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['node_modules/', 'build/'],
    }
    , eslint.configs.recommended
    , ...tseslint.configs.recommended
    , {
        "rules": {
            "@typescript-eslint/adjacent-overload-signatures": "off",
            "@typescript-eslint/array-type": "off",
            "@typescript-eslint/consistent-type-assertions": "off",
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/indent": [
                "off",
                4,
                {
                    "FunctionDeclaration": {
                        "parameters": "first"
                    },
                    "FunctionExpression": {
                        "parameters": "first"
                    }
                }
            ],
            "@typescript-eslint/member-ordering": "off",
            "@typescript-eslint/naming-convention": [
                "off",
                {
                    "selector": "variable",
                    "format": [
                        "camelCase",
                        "UPPER_CASE",
                        "PascalCase"
                    ],
                    "leadingUnderscore": "forbid",
                    "trailingUnderscore": "forbid"
                }
            ],
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-inferrable-types": [
                "off",
                {
                    "ignoreParameters": true
                }
            ],
            "@typescript-eslint/no-misused-new": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-parameter-properties": "off",
            "@typescript-eslint/no-shadow": [
                "off",
                {
                    "hoist": "all"
                }
            ],
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/prefer-for-of": "off",
            "@typescript-eslint/prefer-function-type": "off",
            "@typescript-eslint/prefer-namespace-keyword": "off",
            "@typescript-eslint/quotes": [
                "off",
                "single"
            ],
            "@typescript-eslint/triple-slash-reference": [
                "off",
                {
                    "path": "always",
                    "types": "prefer-import",
                    "lib": "always"
                }
            ],
            "@typescript-eslint/typedef": "off",
            "@typescript-eslint/unified-signatures": "off",
            "arrow-body-style": "off",
            "complexity": "off",
            "constructor-super": "off",
            "curly": "off",
            "dot-notation": "off",
            "eol-last": "off",
            "eqeqeq": [
                "off",
                "smart"
            ],
            "guard-for-in": "off",
            "id-denylist": [
                "off",
                "any",
                "Number",
                "number",
                "String",
                "string",
                "Boolean",
                "boolean",
                "Undefined",
                "undefined"
            ],
            "id-match": "off",
            "indent": "off",
            "new-parens": "off",
            "no-bitwise": "off",
            "no-caller": "off",
            "no-cond-assign": "off",
            "no-console": [
                "off",
                {
                    "allow": [
                        "log",
                        "warn",
                        "off",
                        "dir",
                        "timeLog",
                        "assert",
                        "clear",
                        "count",
                        "countReset",
                        "group",
                        "groupEnd",
                        "table",
                        "dirxml",
                        "groupCollapsed",
                        "Console",
                        "profile",
                        "profileEnd",
                        "timeStamp",
                        "context",
                        "createTask"
                    ]
                }
            ],
            "no-debugger": "off",
            "no-empty": "off",
            "no-empty-function": "off",
            "no-eval": "off",
            "no-fallthrough": "off",
            "no-invalid-this": "off",
            "no-new-wrappers": "off",
            "no-restricted-imports": [
                "off",
                "rxjs/Rx"
            ],
            "no-shadow": "off",
            "no-throw-literal": "off",
            "no-trailing-spaces": "off",
            "no-undef-init": "off",
            "no-underscore-dangle": "off",
            "no-unsafe-finally": "off",
            "no-unused-expressions": "off",
            "no-unused-labels": "off",
            "no-use-before-define": "off",
            "no-var": "off",
            "object-shorthand": "off",
            "one-var": [
                "off",
                "never"
            ],
            "prefer-const": "off",
            "quote-props": [
                "off",
                "as-needed"
            ],
            "quotes": "off",
            "radix": "off",
            "semi": "off",
            "space-before-function-paren": [
                "off",
                {
                    "anonymous": "never",
                    "asyncArrow": "always",
                    "named": "never"
                }
            ],
            "spaced-comment": [
                "off",
                "always",
                {
                    "markers": [
                        "/"
                    ]
                }
            ],
            "use-isnan": "off",
            "valid-typeof": "off",

        }
    }
);

