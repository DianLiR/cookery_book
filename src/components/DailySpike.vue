<template>
  <div class="daily_spike">
    <van-cell :title="info.t" class="shop_title" />
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in info.ps" :key="item.id">
        <!-- {{item.id}} -->
        <spike-item :com="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import SpikeItem from './SpikeItem.vue'
export default {
  components: { SpikeItem },
  name: 'DailySpike',
  props: ['info'],
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true
      }
    }
  }
}
</script>
