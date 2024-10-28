declare module 'rate-limit-redis' {
    import { Store } from 'express-rate-limit';
    
    interface RedisStoreOptions {
        sendCommand: (...args: any[]) => Promise<any>;
        prefix?: string;
    }

    class RedisStore implements Store {
        constructor(options: RedisStoreOptions);
    }

    export default RedisStore;
}
