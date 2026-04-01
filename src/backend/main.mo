import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type PasswordHash = Text;
  public type Nickname = Text;
  public type Profile = {
    nickname : Nickname;
    password : PasswordHash;
  };
  public type LegalContent = {
    id : Nat;
    title : Text;
    body : Text;
    author : Nickname;
    createdAt : Time.Time;
  };
  public type PaymentConfirmation = {
    nickname : Nickname;
    transactionHash : Text;
    submittedAt : Time.Time;
    approved : Bool;
  };

  // Persistent state - stable so data survives upgrades/redeployments
  stable var nicknameProfiles = Map.empty<Nickname, Profile>();
  stable var callerProfiles = Map.empty<Principal, Profile>();
  stable var legalContent = Map.empty<Nat, LegalContent>();
  stable var paymentConfirmations = Map.empty<Text, PaymentConfirmation>();

  // Authorization component
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module LegalContentModule {
    public func compareByTitle(content1 : LegalContent, content2 : LegalContent) : Order.Order {
      Text.compare(content1.title, content2.title);
    };
  };

  // New user registration
  public shared ({ caller }) func register(nickname : Text, password : PasswordHash) : async () {
    if (nicknameProfiles.containsKey(nickname)) {
      Runtime.trap("Nickname already exists. Please choose another one.");
    };
    let profile : Profile = {
      nickname;
      password;
    };
    nicknameProfiles.add(nickname, profile);
  };

  // Login function for users
  public query ({ caller }) func login(nickname : Text, password : PasswordHash) : async Bool {
    switch (nicknameProfiles.get(nickname)) {
      case (null) { false };
      case (?profile) {
        profile.password == password;
      };
    };
  };

  // Fetch member area content
  public query ({ caller }) func getMemberContent() : async ?Profile {
    callerProfiles.get(caller);
  };

  // Change password
  public shared ({ caller }) func changePassword(callerProfile : Profile, newPassword : PasswordHash) : async () {
    let updatedProfile : Profile = {
      callerProfile with
      password = newPassword;
    };
    callerProfiles.add(caller, updatedProfile);
  };

  // Submit payment confirmation (transaction hash + nickname)
  public shared ({ caller }) func submitPaymentConfirmation(nickname : Text, transactionHash : Text) : async () {
    let confirmation : PaymentConfirmation = {
      nickname;
      transactionHash;
      submittedAt = Time.now();
      approved = false;
    };
    paymentConfirmations.add(transactionHash, confirmation);
  };

  // Get all payment confirmations (admin only)
  public query ({ caller }) func getPaymentConfirmations() : async [PaymentConfirmation] {
    paymentConfirmations.values().toArray();
  };

  // Legal content endpoints
  public query ({ caller }) func getAllLegalContent() : async [LegalContent] {
    legalContent.values().toArray().sort(LegalContentModule.compareByTitle);
  };

  public query ({ caller }) func getLegalContentById(contentId : Nat) : async ?LegalContent {
    legalContent.get(contentId);
  };
};
