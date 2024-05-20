import { defineConfig } from 'orval'

export default defineConfig({
  warehouseManagement: {
    input: {
      target: './swagger.json'
    },
    output: {
      mode: 'split',
      target: 'src/services/generated-api.ts',
      schemas: 'src/services/model',
      client: 'axios',
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: 'src/services/api.ts',
          name: 'customInstance'
        }
      }
    }
  }
})
