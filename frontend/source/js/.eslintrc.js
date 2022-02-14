module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended',
    'standard'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 4,
        allowFirstLine: true
      },
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }]
  }
}
  