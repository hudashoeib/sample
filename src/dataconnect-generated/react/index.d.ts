import { CreateUserData, GetNotesData, UpdateNoteData, UpdateNoteVariables, ListPublicCategoriesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useGetNotes(options?: useDataConnectQueryOptions<GetNotesData>): UseDataConnectQueryResult<GetNotesData, undefined>;
export function useGetNotes(dc: DataConnect, options?: useDataConnectQueryOptions<GetNotesData>): UseDataConnectQueryResult<GetNotesData, undefined>;

export function useUpdateNote(options?: useDataConnectMutationOptions<UpdateNoteData, FirebaseError, UpdateNoteVariables>): UseDataConnectMutationResult<UpdateNoteData, UpdateNoteVariables>;
export function useUpdateNote(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateNoteData, FirebaseError, UpdateNoteVariables>): UseDataConnectMutationResult<UpdateNoteData, UpdateNoteVariables>;

export function useListPublicCategories(options?: useDataConnectQueryOptions<ListPublicCategoriesData>): UseDataConnectQueryResult<ListPublicCategoriesData, undefined>;
export function useListPublicCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListPublicCategoriesData>): UseDataConnectQueryResult<ListPublicCategoriesData, undefined>;
