export interface ExampleData {
    id: number;
    name: string;
    description?: string;
}

export type ExampleResponse = {
    data: ExampleData[];
    total: number;
};

export type ExampleProps = {
    title: string;
    onClick: () => void;
};