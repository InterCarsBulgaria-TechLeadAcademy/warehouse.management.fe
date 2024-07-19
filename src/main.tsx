import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './plugins'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ToggleColorMode from './contexts/Theme.tsx'
import SnackbarProvider from './contexts/Snackbar.tsx'
import { AuthProvider } from './contexts/Auth.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToggleColorMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <BrowserRouter>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ToggleColorMode>
  </React.StrictMode>
)
