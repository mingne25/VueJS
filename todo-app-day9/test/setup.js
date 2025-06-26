import '@testing-library/jest-dom'
import { config } from '@vue/test-utils'

// Nếu dùng i18n hoặc global mocks, có thể thêm:
config.global.mocks = {
  $t: (msg) => msg
}