declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV?: 'development' | 'production'
        }
    }
}

export { };
