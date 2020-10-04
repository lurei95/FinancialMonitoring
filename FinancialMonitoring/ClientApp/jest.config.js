const tsJestPreset = require('jest-preset-angular/jest-preset').globals['ts-jest'];

module.exports = {
  coverageReporters: ['html', 'text', 'text-summary'],
  globals: {
    'ts-jest': {
      ...tsJestPreset,
      tsConfig: 'C:/Users/Anwender/source/repos/FinancialMonitoring/FinancialMonitoring/ClientApp/src/tsconfig.spec.json'
    }
  }
};