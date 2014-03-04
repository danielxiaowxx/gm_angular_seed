## 如何搭建开发环境

1. 在hosts文件中加入

        127.0.0.1 static.globalmarket.com local.globalmarket.com

2. 修改nginx的conf文件

        location ~ ^/p4p_mvo/ {
            rewrite  /p4p_mvo(.*)$ $1 break;
            root [p4p_mvo_prject_path]/app; 
        }
        location ~ ^/(common)/ {
            root "E:\office\GM\workplace\gmued\\trunk\static_webroot";  #修改成你本机的实际路径，注意\\t
        }

3. 配置自动编译LESS文件

	cd到项目根目录，运行以下命令即可  

		grunt	

	注意：需要本地已安装nodejs(安装步骤略)，grunt(安装步骤如下)

	1) 安装grunt命令行接口
		
		npm install -g grunt-cli 

	2) 安装grunt相应插件：cd到项目根目录，运行    
					
		npm install

４. 打开浏览器，输入local.globalmarket.com/p4p_mvo/index.html即可


## 一些规范 

1. controller的格式以tmplCtrl.js为基准  
 
2. 全局常量定义在app.js的APPConst变量中

3. 在html中声明angular directive时用attribute, 不要用class或其它声明方式
  
		推荐：<a dropdown-toggle>
		不推荐：<a class="dropdown-toggle">

4. 命名

	- js文件名：驼峰式，首字母小写，如appCtrl.js
	- Controller:驼峰式，首字母大写，如AppCtrl
	- Service:驼峰式，首字母小写，如msgService
	- html模板:小写字母+中横线连字符，以tmpl结尾，如main-tmpl.html 

## 如何实现国际化

1. 在i18n目录下的国际化json文件增加字段，如下  
  
		{  
		    "menu_mainPage": "首页",  
		    ……  
		    "desc_sayHello": "<%= displayName %>, 您好!",  
			……  
		}

2. 在html相应的位置显示  

		<a href="#">{{I18N.menu_mainPage}}</a>
		……  
		<li><a class="default-cursor">{{ I18N.desc_sayHello | template:loginUser }}</a></li>
		……

## 如何使用mock数据进行测试

在mock.js中增加拦截规则并添加相应的mock数据

增加拦截规则：  

	$httpBackend.whenGET('/p4p_mvo_backend/message/getNewMsgOverviewList').respond(Mock.getNewMsgOverviewList);

添加mock数据：  

	var Mock = {  
	    getNewMsgOverviewList: {  
	        error: false,  
	        result: [{type:"product", total:10}, {type:"account", total:5}, {type:"system", total:102}]
	    }
	    ……
	};
 
	
		
　　  