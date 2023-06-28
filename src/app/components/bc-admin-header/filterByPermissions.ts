export default function (user: any, links: any) {
  const linksToRemove: string[] = [];

  const isAdmin = user?.permissions?.role === 3;

  if (!user?.rolesAndPermission?.accounting?.invoicing && !isAdmin) {
    linksToRemove.push('/main/invoicing');
  }
  if (!user?.rolesAndPermission?.accounting?.reporting && !isAdmin) {
    linksToRemove.push('/main/reports');
  }

  return links.filter((link: any) => !linksToRemove.includes(link.link));
}
