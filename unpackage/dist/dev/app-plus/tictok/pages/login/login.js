
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([[2,0],".",[1],"login-img { width: ",[0,750],"; }\n.",[1],"inputView { background-color: white; line-height: 45px; }\n.",[1],"nameImage, .",[1],"keyImage { margin-left: 22px; width: 20px; height: 20px; }\n.",[1],"loginLabel { margin: 15px 15px 15px 10px; color: gray; font-size: 15px; }\n.",[1],"inputText { float: right; text-align: right; margin-right: 22px; margin-top: 11px; font-size: 15px; }\n.",[1],"line { width: 100%; height: 1px; background-color: gainsboro; margin-top: 1px; }\n.",[1],"loginBtn { width: 80%; margin-top: 35px; }\n.",[1],"goRegistBtn { width: 80%; margin-top: 15px; }\n",],undefined,{path:"./pages/login/login.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/login/login.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      