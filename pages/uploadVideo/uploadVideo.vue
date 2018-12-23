<template>
	<view class="container">
		<form @submit="upload" @reset="formReset">
		<!-- 选择视频 -->
		<!-- <button class="submitBtn" type="primary" form-type='submit'>选择视频</button> -->
		<button  class='submitBtn' @tap='chooseVideo'> 选择视频</button>
		<block v-if="show">
			<view class="video">
				<video :src="videoSrc" controls></video>
			</view>
		</block>
		<scroll-view  scroll-y="true" class="scroll-Y" 
				>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in bgmList" :key="item.id" >
						<view>
							<radio :value="item.id" />
						</view>
						<view class="container">
							<audio style="text-align: left" :src="bgmServerUrl + item.path" :poster="current.poster" :name="item.name" :author="item.author"
							:action="audioAction" controls></audio>
						</view>
						
					</label>
				</radio-group>
			</view>
		</scroll-view>
		
       

        <view class="inputView">
            <label class="loginLabel">视频描述：</label>
            <input v-model="video.desc" name="desc" class="inputText" placeholder="说点什么吧" />
        </view>

        <!-- 提交 -->
		<button formType="submit" class="submitBtn" type="primary">上传视频</button>
		<button type="default" formType="reset" class="gobackBtn">重置</button>
		
       
    </form>
		
		
	</view>
</template>

<script>
	import app from '../../App.vue';
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	];
	export default {
		data() {
			return {
				show:false,
				bgmList:[],
				audioAction: {
					method: 'pause'
				},
				bgmServerUrl:'',
				videoPoster:'',
				bgmId:'',
				video:{},
				// sourceTypeIndex: 2,
				// sourceType: ['拍摄', '相册', '拍摄或相册'],
				videoSrc:'',
				current: {
					poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
					name: '致爱丽丝',
					author: '暂无',
					src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
				},
				
			};
		},
		methods: {
// 			chooseVideo:function(){
// 			// 								uni.navigateTo({
// 			// 									url:'../uploadVideo/uploadVideo'
// 			// 								})
// 											uni.chooseVideo({
// 												sourceType: sourceType[this.sourceTypeIndex],
// 												success: (res) => {
// 													this.videoSrc = res.tempFilePath
// 													console.log(res);
// 												}
// 											})
// 										
// 									},
			chooseVideo:function(){
					uni.chooseVideo({
						sourceType: sourceType[this.sourceTypeIndex],
						success: (res) => {
							console.log(JSON.stringify(res));
							
							this.videoSrc = res.tempFilePath
							this.show = true;
							var me = app.getGlobalUserInfo();
								var duration = res.duration;
							
								var tempFilePath = res.tempFilePath;
								var height = res.height;
								var width = res.width;
								this.video.videoHeight = height;
								this.video.videoWidth = width;
								this.video.userId = me.id;
								this.video.audioId = this.bgmId;
								this.video.videoPath = tempFilePath;
								
						}
					})
			},
			upload(e) {
				// console.log(JSON.stringify(this.video) );
				
				console.log(JSON.stringify(this.video));
				uni.uploadFile({
					url: app.serverUrl + "/video/upload",
					filePath: this.video.videoPath,
					name: 'file',
					formData:{
							userId:this.video.userId,
						  audioId:this.video.audioId,
						  videoHeight: this.video.videoHeight ,
						  videoWidth: this.video.videoWidth ,
						  videoDesc:e.detail.value.desc
					},
					
					success: (res) => {
						console.log('uploadImage success, res is:', res)
						uni.showToast({
							title: '上传成功',
							icon: 'success',
							duration: 1000
						})
					},
					fail: (err) => {
						console.log('uploadImage fail', err);
						uni.showModal({
							content:err.errMsg,
							showCancel:false
						});
						uni.hideLoading();
					},
					complete: () => {
						console.log("complate")
					}
				})
			},
			radioChange(e){
				var bgmId = e.detail.value;
				this.bgmId = bgmId;
				console.log(this.bgmId);
			}
		},
		created(){
			this.bgmServerUrl = app.serverUrl;
			uni.request({
				url: this.bgmServerUrl + '/bgm/list',
				method: 'GET',
				data: {},
				success: res => {
					var bgmList = res.data.data.list;
					this.bgmList = bgmList;
					
					
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
</script>

<style>
	.scroll-Y {
		height: 300upx;
	}
.container {
    display: flex;
    margin-top: 20rpx; 
    justify-content: space-around;   
}
.video{
	display: flex;
	margin-top: 20rpx; 
	justify-content: space-around;
	width: 100%;
}

.submitBtn {
    width: 80%;
    margin-top: 15px;
}

.gobackBtn {
    width: 80%;
    margin-top: 15px;
}


.loginLabel {
    color: gray;
    font-size: 15px;
}

.inputText {
    float: right;
    text-align: right;
    margin-right: 22px;
    margin-top: 11px;
    font-size: 15px;
}

.inputView {
    padding: 5px;
    background-color: white;
    line-height: 45px;
    border: solid 1px whitesmoke;
}
.radio{
  margin-top: 20px
}
.uploadBtn{
  margin-left: 50px;
  margin-right: 50px;
}
.videoImageBox{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.videoImage {
    width: 280rpx;
    height: 280rpx;
	
}
</style>
