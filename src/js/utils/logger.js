const PREFIX = '[csocial-ui]';

/**
 * Logging utils
 * 
 */
export const Logger = {
    info() {
        console.info.apply(this, [PREFIX, ...arguments]);
    },
    error() {
        console.error.apply(this, [PREFIX, ...arguments]);
    }
}