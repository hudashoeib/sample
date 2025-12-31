import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface GetNotesData {
  notes: ({
    id: UUIDString;
    title: string;
    content: string;
  } & Note_Key)[];
}

export interface ListPublicCategoriesData {
  categories: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Category_Key)[];
}

export interface Note_Key {
  id: UUIDString;
  __typename?: 'Note_Key';
}

export interface UpdateNoteData {
  note_update?: Note_Key | null;
}

export interface UpdateNoteVariables {
  id: UUIDString;
  content: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface GetNotesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetNotesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetNotesData, undefined>;
  operationName: string;
}
export const getNotesRef: GetNotesRef;

export function getNotes(): QueryPromise<GetNotesData, undefined>;
export function getNotes(dc: DataConnect): QueryPromise<GetNotesData, undefined>;

interface UpdateNoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
  operationName: string;
}
export const updateNoteRef: UpdateNoteRef;

export function updateNote(vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;
export function updateNote(dc: DataConnect, vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;

interface ListPublicCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublicCategoriesData, undefined>;
  operationName: string;
}
export const listPublicCategoriesRef: ListPublicCategoriesRef;

export function listPublicCategories(): QueryPromise<ListPublicCategoriesData, undefined>;
export function listPublicCategories(dc: DataConnect): QueryPromise<ListPublicCategoriesData, undefined>;

