import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { persistQueryClient } from '@tanstack/query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

// Query
const queryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60,
        refetchOnMount: false
      }
    }
  },
  clientPersister(queryClient) {
    return persistQueryClient({
      queryClient,
      persister: createSyncStoragePersister({ storage: localStorage })
    })
  }
}

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, queryOptions)
app.mount('#app')
