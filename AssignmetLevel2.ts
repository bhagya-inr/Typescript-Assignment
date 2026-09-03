//q1
type Optional<T> = {
    [P in keyof T]?: T[P];
};

type ReadonlyKeys<T, K extends keyof T> =
    {
        readonly [P in K]: T[P];
    } & {
        [P in Exclude<keyof T, K>]: T[P];
    };

type User = {
    name: string;
    age: number;
    email: string;
};


type OptionalUser = Optional<User>;

const user1: OptionalUser = {};

type ReadonlyUser = ReadonlyKeys<User, "name" | "email">;

const user2: ReadonlyUser = {
    name: "Bhagyashree",
    age: 32,
    email: "test@example.com"
};

user2.age = 33;

//q2

type IsArray<T> = T extends any[] ? true : false;

type ArrayElement<T> = T extends (infer U)[] ? U : never;


type MyNonNullable<T> = T extends null | undefined ? never : T;

type Test1 = IsArray<string[]>;
type Test2 = IsArray<string>;
type Test3 = ArrayElement<number[]>;
type Test4 = ArrayElement<string[]>;
type Test5 = ArrayElement<string>;
type Test6 = MyNonNullable<string | null | undefined>;

//q3
type EventName<T extends string> = `on${Capitalize<T>}`;

type Event1 = EventName<"click">;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiRoute<
    Method extends HttpMethod,
    Path extends `/${string}`
> = `${Method} ${Path}`;

type Api1 = ApiRoute<"GET", "/users">;


type Api2 = ApiRoute<"POST", "/users">;

type RouteParams<Route extends string> =
    Route extends `${string}:${infer Param}/${infer Rest}`
        ? Param | RouteParams<`/${Rest}`>
        : Route extends `${string}:${infer Param}`
            ? Param
            : never;

type Params = RouteParams<"/users/:id/posts/:postId">;

//q4
type ApiResponse = {
    users: { id: number; name: string }[];
    posts: { id: number; title: string }[];
    comments: { id: number; text: string }[];
};

type UsersType = ApiResponse["users"];


type User = ApiResponse["users"][number];


type ApiKeys = keyof ApiResponse;

type ApiValues = ApiResponse[keyof ApiResponse];

//q5
type MyReturnType<T> =
    T extends (...args: any[]) => infer R
        ? R
        : never;

type MyParameters<T> =
    T extends (...args: infer P) => any
        ? P
        : never;

type FirstParameter<T> =
    T extends (first: infer F, ...rest: any[]) => any
        ? F
        : never;


type Result1 = MyReturnType<() => string>;
type Result2 = MyReturnType<(a: number) => boolean>;
type Result3 = MyParameters<
    (a: string, b: number) => void
>;

type Result4 = FirstParameter<
    (a: string, b: number) => void
>;

//q6

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object
        ? DeepReadonly<T[P]>
        : T[P];
};


type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
        ? DeepPartial<T[P]>
        : T[P];
};

type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object
        ? DeepRequired<T[P]>
        : T[P];
};
//q7

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};


type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
};


type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

//q8
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    role: "admin" | "user" | "guest";
}


type UserUpdate = Partial<User>;


type ReadonlyUser = Readonly<User>;


type UserContact = Pick<User, "name" | "email">;


type UserWithoutId = Omit<User, "id">;

type Value = string | number | null | undefined;

type CleanValue = NonNullable<Value>;


//q9
type Method = "GET" | "POST";

type Response = {
    status: number;
    data: unknown;
};

type ApiReturn<M extends Method> =
    M extends "GET"
        ? Promise<Response>
        : M extends "POST"
            ? Promise<Response>
            : never;


type ApiArgs<M extends Method, Path, Body> =
    M extends "GET"
        ? [path: Path]
        : [path: Path, body: Body];


async function createApiClient<
    M extends Method,
    Path extends string,
    Body = never
>(
    method: M,
    ...args: ApiArgs<M, Path, Body>
): ApiReturn<M> {

    const [path, body] = args;

    console.log("Method:", method);
    console.log("Path:", path);
    console.log("Body:", body);

    return {
        status: 200,
        data: {}
    } as ApiReturn<M>;
}

//q10

type UserId = string & {
    readonly __brand: "UserId";
};


type Email = string & {
    readonly __brand: "Email";
};


interface User {
    id: UserId;
    name: string;
    email: Email;
}


function createUserId(id: string): UserId {
    if (!id) {
        throw new Error("Invalid user ID");
    }

    return id as UserId;
}

function createEmail(email: string): Email {
    if (!email.includes("@")) {
        throw new Error("Invalid email");
    }

    return email as Email;
}


function getUserById(id: UserId): User {
    return {
        id: id,
        name: "Bhagyashree",
        email: createEmail("user@example.com")
    };
}