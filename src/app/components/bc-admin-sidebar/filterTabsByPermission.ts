const filterTabsByPermission = (user: any, links: any, getLinkByDivision: Function) => {
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

  if (!user?.rolesAndPermission?.admin.manageCompanySettings && !isAdmin) {
    linksToRemove.push('/main/admin/company-profile');
  }

  if (!user?.rolesAndPermission?.dispatch.serviceTickets && !isAdmin) {
    const path = '/main/customers/schedule/tickets';
    linksToRemove.push(getLinkByDivision(path));
  }

  if (!user?.rolesAndPermission?.dispatch.jobs && !isAdmin) {
    linksToRemove.push(getLinkByDivision('/main/customers/schedule/jobs'));
    linksToRemove.push('/main/customers/schedule/job-requests');
  }

  if (!user?.rolesAndPermission?.dispatch.serviceTickets && !user?.rolesAndPermission?.dispatch.jobs && !isAdmin) {
    linksToRemove.push(getLinkByDivision('/main/customers/calendar'));
    linksToRemove.push(getLinkByDivision('/main/customers/ticket-map-view'));
  }

  if (!user?.rolesAndPermission?.superAdmin.editBillingInformation && !user?.rolesAndPermission?.dispatch.jobs && !isAdmin) {
    linksToRemove.push('/main/admin/billing');
  }

  return links.filter((link: any) => !linksToRemove.includes(link.link));
};

export default filterTabsByPermission;
