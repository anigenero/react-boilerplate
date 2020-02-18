declare module '*.graphql' {

    import { DocumentNode } from 'graphql';
    const Schema: DocumentNode;

    export = Schema;

}

declare module '*.jpg' {
    const Value: string;
    export = Value;
}

declare module '*.json' {
    const Value: any;
    export = Value;
}

declare module '*.png' {
    const Value: string;
    export = Value;
}

declare module '*.svg' {
    const Value: string;
    export = Value;
}
