<template>
	<view class="content">
		<view class="">
			
			<view class="login-icon">
				<image class="login-img" src="../../static/images/dsp.jpg"></image>
			</view>
			
			<form @submit="formSubmit" @reset="formReset">
				 <!--账号-->
				<view class="inputView">
					<image class="nameImage" src="../../static/images/username.png"></image>
					<label class="loginLabel">账号</label>
					<input id="username" name="username" value='zyl123' class="inputText" placeholder="请输入账号" />
				</view>
				<view class="line"></view>

				<!--密码-->
				<view class="inputView">
					<image class="keyImage" src="../../static/images/password.png"></image>
					<label class="loginLabel">密码</label>
					<input id="password" name="password" value='123' class="inputText" password="true" placeholder="请输入密码" />
				</view>

				<!--按钮-->
				<view>
					<button class="loginBtn" type="primary" form-type='submit'>登录</button>
				</view>
				<view>
					<button class="goRegistBtn" type="warn" bindtap="goRegistPage">没有账号？点击注册</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue';
	export default {
		data() {
			return {
				
				
				
			};
		},
		methods:{
			formSubmit(e){
				var formObject = e.target.value;
				// console.log(formObject.username);
				var username = formObject.username;
				var password = formObject.password;
				if (!app.checkStrNotNull(username)){
					uni.showToast({
						title:"用户名不能为空"
					});
					return false;
				}
				if (!app.checkStrNotNull(password)){
					uni.showToast({
						title:"密码不能为空"
					});
					return false;
				}
				uni.request({
					url: app.serverUrl + '/login' ,
					method: 'POST',
					data: {
						username:username,
						password:password
					},
					success(res) {
						var userInfo = res.data.data;
						app.setGlobalUserInfo(userInfo);
						uni.redirectTo({
							url: '../me/me'
						});
						
						
						
					}
				});
				
			}
		}
	}
</script>

<style>
.login-img {
    width: 750rpx;
}

/*表单内容*/
.inputView {
    background-color: white;
    line-height: 45px;
}

/*输入框*/
.nameImage, .keyImage {
    margin-left: 22px;
    width: 20px;
    height: 20px;
}

.loginLabel {
    margin: 15px 15px 15px 10px;
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

.line {
    width: 100%;
    height: 1px;
    background-color: gainsboro;
    margin-top: 1px;
}

/*按钮*/
.loginBtn {
    width: 80%;
    margin-top: 35px;
}

.goRegistBtn {
    width: 80%;
    margin-top: 15px;
}
</style>
