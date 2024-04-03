export default interface RepositoryInterface<T> {
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    //delete(id: string): void;
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}