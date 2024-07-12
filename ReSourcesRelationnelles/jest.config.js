export const preset = 'jest-expo'
export const setupFilesAfterEnv = ['@testing-library/jest-native/extend-expect']
export const testPathIgnorePatterns = ['/node_modules/', '/android/', '/ios/']
export const transformIgnorePatterns = [
  'node_modules/(?!(@react-native|react-native|expo-.*|@expo-.*)/)',
]
