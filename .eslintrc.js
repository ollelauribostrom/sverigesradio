module.exports = {
  "extends": "airbnb",
  "plugins": [
      "react",
      "jsx-a11y",
      "import"
  ],
  "env": {
    "node": true,
  },
  "rules": {
    "no-console": 0,
    "import/prefer-default-export": 0,
    "no-unused-vars": ["error", {
      "varsIgnorePattern": "chai|should",
      "ignoreRestSiblings": true,
    }],
    "no-param-reassign": 0
  },
  "globals": {
    "jest": true,
    "describe": true,
    "before": true,
    "it": true,
    "expect": true,
  },
  "parser": "babel-eslint",
};

