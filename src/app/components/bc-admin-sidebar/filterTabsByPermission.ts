import { ability } from 'app/config/Can';

const filterTabsByPermission = (user: any, links: any) => {
  const linksToRemove: string[] = [];

  const isAdmin = user?.permissions?.role === 3;

  if (!ability.can('manage', 'Employee') && !isAdmin) {
    linksToRemove.push('employees');
  }

  if (!ability.can('manage', 'Company') && !isAdmin) {
    linksToRemove.push('company');
  }

  if (!ability.can('manage', 'Tickets') && !isAdmin) {
    linksToRemove.push('tickets');
  }

  if (!ability.can('manage', 'Jobs') && !isAdmin) {
    linksToRemove.push('jobs');
  }

  if (!ability.can('manage', 'Tickets') && !ability.can('manage', 'Jobs') && !isAdmin) {
    linksToRemove.push('calendar');
    linksToRemove.push('map');
  }

  if (!user?.rolesAndPermission?.superAdmin.editBillingInformation && !user?.rolesAndPermission?.dispatch.jobs && !isAdmin) {
    linksToRemove.push('billing');
  }

  return links.filter((link: any) => !linksToRemove.includes(link.key));
};

export default filterTabsByPermission;
