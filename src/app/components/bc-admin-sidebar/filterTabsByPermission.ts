const filterTabsByPermission = (user: any, links: any) => {
  const linksToRemove: string[] = [];
  console.log(user);

  const isAdmin = user?.permissions?.role === 3;

  /*
   * If (!user?.rolesAndPermission?.admin.manageItems && !isAdmin) {
   *   linksToRemove.push('/main/admin/services-and-products');
   * }
   */

  if (!user?.rolesAndPermission?.admin.manageEmployeeInfoAndPermissions && !isAdmin) {
    linksToRemove.push('/main/admin/employees');
  }

  if (!user?.rolesAndPermission?.admin.manageCompanyLocationsAndWorkTypes && !isAdmin) {
    linksToRemove.push('/main/admin/company-profile');
  }

  if (!user?.rolesAndPermission?.dispatch.serviceTickets && !isAdmin) {
    linksToRemove.push('/main/customers/schedule/tickets');
  }

  if (!user?.rolesAndPermission?.dispatch.jobs && !isAdmin) {
    linksToRemove.push('/main/customers/schedule/jobs');
  }

  console.log(links);
  return links.filter((link: any) => !linksToRemove.includes(link.link));
};

export default filterTabsByPermission;
