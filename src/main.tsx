import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a new QueryClient to provide to the entire app.
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider
    // Provide the queryClient to the entire App (Similar to how context works)
    client={queryClient}
  >
    <StrictMode>
      <App />
      <ReactQueryDevtools
        initialIsOpen={ false }
        position='bottom'
      />
    </StrictMode>
  </QueryClientProvider>,
)
