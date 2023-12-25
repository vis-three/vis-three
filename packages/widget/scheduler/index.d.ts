import { Component } from "../component";
export interface SchedulerJob extends Function {
    id?: number;
    pre?: boolean;
    active?: boolean;
    computed?: boolean;
    allowRecurse?: boolean;
    ownerInstance?: Component;
}
export type SchedulerJobs = SchedulerJob | SchedulerJob[];
export declare function nextTick<T = void, R = void>(this: T, fn?: (this: T) => R): Promise<Awaited<R>>;
export declare function queueJob(job: SchedulerJob): void;
export declare function invalidateJob(job: SchedulerJob): void;
export declare function queuePostFlushCb(cb: SchedulerJobs): void;
export declare function flushPreFlushCbs(instance?: Component, i?: number): void;
export declare function flushPostFlushCbs(): void;
