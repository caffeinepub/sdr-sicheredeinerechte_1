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

  // Potentially defamatory content flagged by admin
  public type PotentiallyDefamatoryContent = {
    id : Nat;
    title : Text;
    body : Text;
    author : Nickname;
    createdAt : Time.Time;
    isFlagged : Bool;
  };

  // Persistent state
  let callerProfiles = Map.empty<Principal, Profile>();
  let nicknameProfiles = Map.empty<Nickname, Profile>();
  let legalContent = Map.empty<Nat, LegalContent>();

  // Authorization component
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module LegalContent {
    public func compareByTitle(content1 : LegalContent, content2 : LegalContent) : Order.Order {
      Text.compare(content1.title, content2.title);
    };
  };

  // Persistent endpoints
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Not logged in -- please log in to access members area!");
    };
    callerProfiles.get(caller);
  };

  // Be persistent with password changes
  public shared ({ caller }) func changePassword(callerProfile : Profile, newPassword : PasswordHash) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Not logged in -- please log in to access members area!");
    };
    let updatedProfile : Profile = {
      callerProfile with
      password = newPassword;
    };
    callerProfiles.add(caller, updatedProfile);
  };

  // Common content endpoints
  public query ({ caller }) func getAllLegalContent() : async [LegalContent] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access legal content");
    };
    legalContent.values().toArray().sort(LegalContent.compareByTitle);
  };

  public query ({ caller }) func getLegalContentById(contentId : Nat) : async ?LegalContent {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access legal content");
    };
    legalContent.get(contentId);
  };
};
