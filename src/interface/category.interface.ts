export interface ICategory {
  id: string;
  name: string;
  description?: string;
  parent?: ICategory;
  isShowOnSite: boolean;
}
