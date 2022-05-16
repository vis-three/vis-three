export interface Plugin<O extends Object> {
    (params: O): boolean;
}
