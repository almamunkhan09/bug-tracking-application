export interface NewProject {
  title: string;
  description?: string;
  createdById: string;
  maintainerIds: string[];
}

export interface UpdateProject {
  title: string;
  description?: string;
  maintainerIds: string[];
}
