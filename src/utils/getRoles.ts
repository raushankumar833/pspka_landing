const roles: Record<string, string> = {
  ret: 'Retailer',
};

export const getRole = (role: string) => {
  if (role) return roles[role] || '';
};
