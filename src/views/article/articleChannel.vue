<script setup>
import { artGetChannalsService, artDelChannalsService } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import artEdit from './components/artEdit.vue'
const loading = ref(false)
const articleChannals = ref([])
const dialog = ref()
const getartChannals = async () => {
  loading.value = true
  const res = await artGetChannalsService()
  articleChannals.value = res.data.data
  loading.value = false
  console.log(articleChannals.value)
}
getartChannals()
const onEdit = async (row) => {
  dialog.value.open(row)
}
const onDelete = async (row) => {
  await ElMessageBox.confirm('确定删除吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  await artDelChannalsService(row.id)
  getartChannals()
}
const onAdd = async (row) => {
  dialog.value.open(row)
}
const onSuccess = () => {
  getartChannals()
}
</script>

<template>
  <page-container title="文章分类" style="width: 100%">
    <template #extra
      ><el-button @click="onAdd({})">增加分类</el-button></template
    >
    <el-table :data="articleChannals" v-loading="loading">
      <el-table-column type="index" label="ID" width="180" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="alias" label="分类别名" />
      <el-table-column prop="art_count" label="操作" width="180">
        <template #default="{ row, $index }">
          <el-button
            @click="onEdit(row)"
            type="primary"
            plain
            circle
            :icon="Edit"
          >
          </el-button>
          <el-button
            @click="onDelete(row, $index)"
            type="danger"
            plain
            circle
            :icon="Delete"
          >
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <art-edit ref="dialog" @success="onSuccess"></art-edit>
  </page-container>
</template>

<style scoped></style>
