import { vi } from 'vitest'

// Mock vue-router globally for all tests
vi.mock('vue-router', () => ({
  RouterLink: {
    name: 'RouterLink',
    template: '<a><slot /></a>',
  },
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
  }),
  useRoute: () => ({
    params: {},
    query: {},
    path: '/',
    name: 'mocked-route',
  }),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock window.confirm
window.confirm = vi.fn()

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: []
})

// Mock route
const route = {
  params: {},
  query: {}
}

// Global mocks
vi.stubGlobal('$router', router)
vi.stubGlobal('$route', route)

// Mock router-link component
vi.mock('vue-router', () => ({
  RouterLink: {
    name: 'RouterLink',
    template: '<a><slot /></a>'
  },
  useRouter: () => router,
  useRoute: () => route
})) 