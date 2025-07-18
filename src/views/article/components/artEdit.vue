<script setup>
import { ref } from 'vue'
import { artAddChannalsService, artEditChannalsService } from '@/api/article'
const dialogVisible = ref(false)
const formRef = ref()
const emit = defineEmits(['success'])
const formModel = ref({
  name: '',
  alias: ''
})
const rules = ref({
  name: [
    { required: true, message: '请输入文章名称', trigger: 'blur' },
    { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
  ],
  alias: [
    { required: true, message: '请输入文章别名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ]
})
const open = (row) => {
  console.log(row)
  formModel.value = { ...row }
  rules.value = {
    name: [
      { required: true, message: '请输入文章名称', trigger: 'blur' },
      { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
    ],
    alias: [
      { required: true, message: '请输入文章别名', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ]
  }
  dialogVisible.value = true
}
const submit = async () => {
  await formRef.value.validate()
  if (formModel.value.id) {
    await artEditChannalsService(formModel.value).then(() => {
      ElMessage.success('编辑成功')
    })
  } else {
    await artAddChannalsService(formModel.value).then(() => {
      ElMessage.success('添加成功')
    })
  }
  dialogVisible.value = false
  rules.value = {}
  emit('success')
}
defineExpose({ open })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    width="500"
  >
    <el-form :model="formModel" :rules="rules" label-width="80px" ref="formRef">
      <el-form-item label="分类名称" prop="name">
        <el-input
          v-model="formModel.name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="alias">
        <el-input
          v-model="formModel.alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
