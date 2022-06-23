import type { DefineComponent } from 'vue'

declare module '*.vue' {
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'http/element-plus'