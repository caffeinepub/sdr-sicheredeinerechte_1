import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type PasswordHash = string;
export interface Profile {
    nickname: Nickname;
    password: PasswordHash;
}
export type Time = bigint;
export type Nickname = string;
export interface LegalContent {
    id: bigint;
    title: string;
    body: string;
    createdAt: Time;
    author: Nickname;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changePassword(callerProfile: Profile, newPassword: PasswordHash): Promise<void>;
    getAllLegalContent(): Promise<Array<LegalContent>>;
    getCallerUserRole(): Promise<UserRole>;
    getLegalContentById(contentId: bigint): Promise<LegalContent | null>;
    getMemberContent(): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    login(nickname: string, password: PasswordHash): Promise<boolean>;
    register(nickname: string, password: PasswordHash): Promise<void>;
}
