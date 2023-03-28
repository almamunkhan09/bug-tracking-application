export interface NewIssue {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  reporterId: string;
  assigneeIds: string[];
  relatedProjectIds: string;
}

export interface UpdateIssueData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assigneeIds?: string[];
}
