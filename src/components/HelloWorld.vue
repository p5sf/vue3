<template>
  <h1>{{ msg }}</h1>
  <el-button  @click="inCrement"> count is: </el-button>
  <el-button type="primary">按钮</el-button>
  <el-button type="primary">buttonCont</el-button>
  <p>{{ count }}</p>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { ElButton } from 'element-plus'
import { useStore } from 'vuex'
import { key } from '../store'

export default defineComponent({
  name: 'HelloWorld',
  components:{
    ElButton
  },
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  setup() {
    const store = useStore(key)

    const count = computed(() => store.state.count)

    return {
      count,
      inCrement: () => store.commit('increment')
    }
  }
})
</script>