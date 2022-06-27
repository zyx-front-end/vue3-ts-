export interface ListInt {
  userId: number;
  id: number;
  title: string;
  introduce: string;
}
interface selectData {
  title: string;
  introduce: string; //详情
  page: number; //页码
  count: number; //总条数
  pagesize: number; //默认一页显示几条
}
export class InitData {
  selectData: selectData = {
    title: "",
    introduce: "", //详情
    page: 1, //页码
    count: 0, //总条数
    pagesize: 5, //默认一页显示几条
  };
  list: ListInt[] = []; //展示的内容的数据，接收后台返回的数据
}
