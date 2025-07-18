<script setup></script>

<template>
  <page-container title="文章管理">
    <template #extra><el-button>发布文章</el-button></template>
    <el-form inline>
      <el-form-item label="文章分类"
        ><el-select>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option> </el-select
      ></el-form-item>
      <el-form-item label="发布状态">
        <el-select>
          <el-option label="已发布" value="1"></el-option>
          <el-option label="草稿" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped></style>
