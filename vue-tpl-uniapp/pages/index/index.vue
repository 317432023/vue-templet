<template>
	<view class="home">
		<swiper indicator-dots circular>
			<!-- <swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img"></image>
			</swiper-item> -->
			<swiper-item>
				<image src="../../static/logo.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/logo.png"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: []
			}
		},
		onLoad() {
			//this.getSwipers()
		},
		methods: {
		  // 获取轮播图数据
		  async getSwipers() {
			const res = await this.$http.request({
			  url: '/api/getSwipers'
			})
			this.swipers = res.data.swipers
		  }
		}
	}
</script>

<style lang="scss">
    .home{
        swiper{
            width: 750rpx;
            height: 380rpx;
            image{
                height: 100%;
            }
        }
    }
</style>