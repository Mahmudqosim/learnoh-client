module.exports = {
  extends: [],
  plugins: [],
  ignoreFiles: ["./coverage/**/*.css", "./dist/**/*.css"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          // --------
          // Tailwind
          // --------
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-no-duplicate-custom-properties": null,
    "named-grid-areas-no-invalid": null,
    "no-duplicate-selectors": null,
    "no-empty-source": null,
    "selector-pseudo-element-no-unknown": null,
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "string-no-newline": null,
    "selector-max-universal": 1,
    // --------
    // SCSS rules
    // --------
    "scss/dollar-variable-colon-space-before": "never",
    "scss/dollar-variable-colon-space-after": "always",
    "scss/dollar-variable-no-missing-interpolation": true,
    "scss/dollar-variable-pattern": /^[a-z-]+$/,
    "scss/double-slash-comment-whitespace-inside": "always",
    "scss/operator-no-newline-before": true,
    "scss/operator-no-unspaced": true,
    "scss/selector-no-redundant-nesting-selector": true,
    // Allow SCSS and CSS module keywords beginning with `@`
    "scss/at-rule-no-unknown": null,
  },
}
