import type { ActorSubclass } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface Profile {
  nickname: string;
  password: string;
}

export interface LegalContent {
  id: bigint;
  title: string;
  body: string;
  author: string;
  createdAt: bigint;
}

export interface PaymentConfirmation {
  nickname: string;
  transactionHash: string;
  submittedAt: bigint;
  approved: boolean;
}

export interface _SERVICE {
  register: (nickname: string, password: string) => Promise<undefined>;
  login: (nickname: string, password: string) => Promise<boolean>;
  getMemberContent: () => Promise<[] | [Profile]>;
  changePassword: (profile: Profile, newPassword: string) => Promise<undefined>;
  submitPaymentConfirmation: (nickname: string, transactionHash: string) => Promise<undefined>;
  getPaymentConfirmations: () => Promise<PaymentConfirmation[]>;
  getAllLegalContent: () => Promise<LegalContent[]>;
  getLegalContentById: (id: bigint) => Promise<[] | [LegalContent]>;
}

export declare const idlFactory: IDL.InterfaceFactory;
export declare const canisterId: string;
export declare function createActor(
  canisterId: string,
  options?: { agentOptions?: import("@dfinity/agent").HttpAgentOptions }
): ActorSubclass<_SERVICE>;
