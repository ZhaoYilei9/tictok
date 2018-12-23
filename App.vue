<script>
	export default {
		data:{
			userInfo:{}
		},
		
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		checkStrNotNull(str) {
			if (str == '' || str == undefined || str == null){
				return false;
			}
			return true;
		},
		serverUrl:'http://192.168.1.7:8081',
		imageServerUrl:'http://47.99.243.19:88',
		getGlobalUserInfo: function () {
			var key = 'userInfo';
			if (key.length === 0) {
				uni.showModal({
					title: '读取数据失败',
					content: "key 不能为空",
					showCancel:false
				})
			} else {
				return JSON.parse(uni.getStorageSync(key));
			}
		},
		setGlobalUserInfo: function (userInfo) {
			var key = "userInfo"
			var data = JSON.stringify(userInfo);
			if (key.length === 0) {
				uni.showModal({
					title: '保存数据失败',
					content: 'key 不能为空',
					showCancel:false
				})
			} else {
				uni.setStorage({
					key: key,
					data: data,
					success() {
						
					},
					fail: () => {
						uni.showModal({
							title: '储存数据失败!',
							showCancel:false
						})
					}
				})
			}
		},
		clearStorage: function () {
			uni.clearStorageSync()
			
			uni.showModal({
				title: '清除数据成功',
				content: ' ',
				showCancel:false
			})
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";

</style>
