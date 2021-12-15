export interface Permission {
    id: number;
    name: string;
    description: string;
    core_only: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface GetPermissionResponse {
    permissions: Permission[];
  }
  