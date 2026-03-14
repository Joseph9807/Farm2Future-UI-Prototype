export type Role = 'farmer' | 'buyer' | 'regulator';

export type Page =
'dashboard' |
'esg-report' |
'token-monitoring' |
'transfer-ownership' |
'transaction-history' |
'collect-farm-data';

export interface User {
  id: string;
  name: string;
  role: Role;
  entityName: string;
}