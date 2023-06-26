export const canAddVendor = (user: any) => {
  return user.rolesAndPermission?.admin?.addVendors;
};
