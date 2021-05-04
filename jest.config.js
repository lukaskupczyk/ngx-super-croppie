module.exports = {
  // stop upon first failing test
  bail: true,
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/projects/ngx-super-croppie/package.json',
  ],
};
