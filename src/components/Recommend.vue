<template>
  <div class="Recommend">
    <van-sticky :offset-top="52">
      <van-divider
        :style="{
          fontSize: '18px',
          color: '#1e90ff',
          borderColor: '#1e90ff',
          padding: '0 10px'
        }"
      >
        {{ info.title }}
      </van-divider>
    </van-sticky>
    <!--    <span></span>-->
    <rec-item v-for="item in info.list" :key="item.r.id" :info="item.r" />
  </div>
</template>

<script>
import RecItem from '@/components/RecItem'
export default {
  name: 'Recommend',
  components: { RecItem },
  props: ['info']
}
</script>
