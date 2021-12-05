export interface Language {
    id: number;
    description: string;
    code: string;
    locale_code: string;
    locale_code_decimal: string;
    language_file: number;
  }
  
  export interface Profile {
    gender?: number;
    title?: any;
    first_name?: string;
    last_name?: string;
    about_me?: any;
    home_port?: any;
    image?: string;
    birthday?: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email?: string;
    language_id: string;
    api_token: string;
    block: number;
    created_at: string;
    avatar_url: string;
    avatar_url_tiny: string;
    is_tester: boolean;
    language: Language;
    profile: Profile;
    timestamp: string;
   
  }
  
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface UserData {
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
  }
  
  export interface subsdata {
    username: string, 
    password: string, 
    grant_type: string, 
    client_id: number, 
    client_secret: string 
  }
  export interface subsid{
    uuid: string
  }
  export interface assignrole
  {
   email:string, 
   role: string, 
   integration_ids: Array<any>, 
   language_ids: Array<any>
  }
  export interface addsubscriptiondata {
    token_type?: string,
    expires_in?: number,
    access_token?: string,
    refresh_token?: string
}
  

