export type  FF<T> = T | {
count:number
}
export interface RepositoryInterface<T>{
    create(queryArgs:any ):Promise<T> | T;
    createMany(queryArgs:any):Promise<T[]> | T[];
    find(queryArgs:any ):Promise<T> | T;
    findMany(queryArgs:any ):Promise<T[]> | T[];
    findUniqueOrThrow(queryArgs:any):Promise<T | null> | T;
    findFirst(queryArgs:any):Promise<FF<T>> | FF<T>;
    exists(queryArgs:any):Promise<FF<T>> | FF<T>;
    findFirstOrThrow(queryArgs:any):Promise<T | null> | T;
    update(queryArgs:any ):Promise<T | null> | T;
    updateMany(queryArgs:any ):Promise<T[] | null> | T[];
    upsert(queryArgs:any):Promise<T | null> | T;
    aggregate(queryArgs:any):Promise<T[] | null> | T[];
    groupBy(queryArgs:any):Promise<T[] | null> | T[];
    count(queryArgs:any):Promise<FF<T> | null> | FF<T>;
    delete(queryArgs:any ):Promise<Boolean | null | T> | T;
    deleteMany(queryArgs:any ):Promise<T[] | null | T> | T[];
    
}