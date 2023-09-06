export const getJobTypesFromJob = (job: any) => job.tasks.reduce((acc: string[], task: any) => {
  const jobTitle: any = [];
  task.jobTypes.forEach((type: any) => {
    if (type.jobType && !jobTitle.includes(type.jobType.title)) jobTitle.push(type.jobType.title)
  });
  acc = acc.concat(jobTitle);
  return acc;
}, []);

export const getJobTypesFromTicket = (ticket: any) => {
  let jobTypes = [];
  if (ticket.tasks) {
    if (ticket.tasks.length === 0) {
     if (ticket.jobType?.title) jobTypes.push(ticket.jobType?.title);
    } else {
      jobTypes = ticket.tasks.map((task: any) => task.jobType?.title || task.title);
    }
  } else if (ticket.jobType) {
    if (ticket.jobType.title) jobTypes.push(ticket.jobType.title);
  }
  return jobTypes;
}

export const getJobTypesTitle = (jobTypes: any) => {
  return jobTypes.length === 0 ? 'N/A' : jobTypes.length === 1 ? jobTypes[0] : 'Multiple Jobs';
}
