<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="showData">
      <el-table :data="dataList.comList" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180" />
        <el-table-column prop="title" label="名称" width="180" />
        <el-table-column prop="introduce" label="内容介绍" />
      </el-table>
      <el-pagination
        @current-change="currentChange"
        @size-change="sizeChange"
        layout="prev, pager, next"
        :total="selectData.count * 2"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  onMounted,
} from "vue";
import { getGoodsList } from "../request/api";
import { InitData, ListInt } from "../type/goods";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    //在挂载阶段获取数据
    onMounted(() => {
      getGoods()
    });
    //获取商品数据
    const getGoods = () =>{
        getGoodsList().then((res) => {
        data.list = res.data;
        data.selectData.count = res.data.length;
      });
    }
    const currentChange = (page: number) => {
      data.selectData.page = page;
    };
    const dataList = reactive({
      //计算属性
      comList: computed(() => {
        //1--->[1-10]
        //2--->[11-20]
        //3--->[21-30]
        //....
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pagesize,
          data.selectData.page * data.selectData.pagesize
        );
      }),
    });
    const sizeChange = (pagesize: number) => {
      data.selectData.pagesize = pagesize;
    };
    //查询的功能
    const onSubmit = () => {
      // console.log(data.selectData.title)
      // console.log(data.selectData.introduce)
      let arr: ListInt[] = []; //定义数组  用来接收查询过后要展示的数据
      if (data.selectData.title || data.selectData.introduce) {
        //判断两个搜索框是否有值
        if (data.selectData.title) {
          arr = data.list.filter((value) => {
            //将过滤出来的数组赋值给arr
            return value.title.indexOf(data.selectData.title) !== -1;
          });
        }
        if (data.selectData.introduce) {
          arr = data.list.filter((value) => {
            //将过滤出来的数组赋值给arr
            return value.title.indexOf(data.selectData.introduce) !== -1;
          });
        }
      } else {
        arr = data.list;
      }
      data.selectData.count = arr.length;
      data.list = arr;
    };
    //监听输入框的两个属性
    watch(
      [() => data.selectData.title, () => data.selectData.introduce],
      () => {
        if (data.selectData.title == "" && data.selectData.introduce == "") {
          //重新向服务器获取数据
          getGoods()
        }
      }
    );
    return { ...toRefs(data), currentChange, sizeChange, dataList, onSubmit };
  },
});
</script>

<style scoped></style>
