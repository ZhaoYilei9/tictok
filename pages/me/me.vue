<template>
	<view class="container">
		
		<image :src="imageSrc" class="face" @tap="chooseImage"></image>
		<label class='nickname'>{{nickname}}</label>
		 <button size='mini' class='primary' @tap='chooseVideo'> 上传作品</button>
		 <button size='mini' type='' class='logout' @tap='logout'>注销</button>
		<view class='container-row'>
		  <label class='info-items'>{{fansCounts}} 粉丝</label>
		  <label class='info-items'>{{followCounts}} 关注</label>
		  <label class='info-items'>{{receiveLikeCounts}} 获赞</label>
		</view>
		<view class="container">
			
			<video :src="videoSrc" controls></video>
			
		</view>
		
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
				imageSrc:'',
				nickname:'',
				fansCounts:'',
				followCounts:'',
				receiveLikeCounts:'',
				sourceTypeIndex: 2,
				sourceType: ['拍摄', '相册', '拍摄或相册'],
				videoSrc: ''
			};
		},
		created() {
			var userInfo = app.getGlobalUserInfo();
			if(userInfo != null && userInfo != undefined){
				this.imageSrc = app.serverUrl + userInfo.faceImage;
				this.nickname = userInfo.nickname;
				this.fansCounts = userInfo.fansCounts;
				this.followCounts = userInfo.followCounts;
				this.receiveLikeCounts = userInfo.receiveLikeCounts;
			}
			
			
			
		},
		methods:{
			chooseImage: function () {
							uni.showLoading({});
							uni.chooseImage({
								count: 1,
								sizeType: ['compressed'],
								sourceType: ['album'],
								success: (res) => {
									console.log('chooseImage success, temp path is', res.tempFilePaths[0])
									var imageSrc = res.tempFilePaths[0];
									var user = app.getGlobalUserInfo();
									uni.uploadFile({
										url: app.serverUrl + "/user/upload?userId=" + user.id,
										filePath: imageSrc,
										name: 'file',
										success: (res) => {
											console.log('uploadImage success, res is:', res)
											uni.showToast({
												title: '上传成功',
												icon: 'success',
												duration: 1000
											});
											var resObject = JSON.parse(res.data);
											var userInfo = resObject.data;
											console.log(userInfo);
											var faceImage = app.serverUrl + userInfo.faceImage;
											
											this.imageSrc = faceImage;
											console.log(this.imageSrc);
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
								fail: (err) => {
									console.log('chooseImage fail', err)
									uni.hideLoading();
								}
							})
						},
						chooseVideo:function(){
								uni.navigateTo({
									url:'../uploadVideo/uploadVideo'
								})
// 								uni.chooseVideo({
// 									sourceType: ['album'],
// 									success: (res) => {
// 										this.videoSrc = res.tempFilePath
// 										console.log(res.duration);
// 									}
// 								})
// 							
						},
						
		}
	}
</script>

<style>
.container {
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
	
}

.container-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-top: 10px;
}

.info-items {
    margin-left: 30px;
}

.face {
    width: 180rpx;
    height: 180rpx;
    border-radius: 50%;
    margin-top: 20px;
}

.nickname {
    margin-top: 5px;
    font-weight: bold;
    font-size: 18px;
}

.logout {
    margin-top: 3px;
    float: right;
}

.follow {
    margin-top: 3px;
}

.line {
    width: 100%;
    height: 1px;
    background-color: gainsboro;
    margin-top: 1px;
}

.container-video {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    text-align: center;
    border: solid 1px;
    line-height: 30px;
}

.video-info {
    width: 100%;
}

.video-info-selected {
    background-color: gainsboro;
}

.container-video-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.videoImage {
    width: 250rpx;
    height: 180px;
}
</style>
