angular.module('starter.controllers', [])
  .controller('listCtrl', ['$scope', 'goodService', '$state',function ($scope, goodService,$state) {
    var pageNo = 1;
    var pageSize = 20;
    var ismoredata = true;
    $scope.doRefresh = function () {
      pageNo++;
      goodService.getGoods(pageNo, pageSize).then(function (data) {
        if (!data.length) {
          ismoredata = false;
        } else {
          $scope.goods = $scope.goods.concat(data[0]['rows']);

        }
      })
      $scope.$broadcast("scroll.infiniteScrollComplete");
    }
    $scope.ismoredata = function () {
      return ismoredata;
    }

    //页面加载获取产品列表
    goodService.getGoods(pageNo, pageSize).then(function (data) {
      $scope.goods = data[0]['rows'];
    })
    $scope.goDetail=function(id){
      window.location.href="#/detail/"+id;
    }
    $scope.goCategory=function(){
      $state.go('category');
    }
    $scope.goSearch=function(){
      $state.go('search');
    }
    $scope.goArticle=function(){
      $state.go('article');
    }
    $scope.goAboutUs=function(){
      $state.go('aboutUs');
    }
  }])
  .controller('categoryCtrl',['$scope','$ionicHistory', '$state','categoryService',function($scope,$ionicHistory,$state,categoryService){
    categoryService.getCategory().then(function(data){
      console.log(data[0]);
      $scope.category=data[0];
    })
    $scope.goCateList=function(cateid){
       window.location.href="#/catelist/"+cateid;
    }
    $scope.goBack=function(){
      $ionicHistory.goBack();
    }
  }])
  .controller('catelistCtrl',['$scope','$ionicHistory', '$state','$stateParams','categoryService',function($scope,$ionicHistory,$state,$stateParams,categoryService){
    var cates=$stateParams['id'].split(':');
    console.log(cates);
    var cateid=cates[0];
    var catename=cates[1];
    var pageNo=1;
    var pageSize=10;
    var ismoredata = true;



    $scope.doRefresh = function () {
      pageNo++;
      categoryService.getCateList(cateid,pageNo,pageSize).then(function (data) {
        if (!data.length) {
          ismoredata = false;
        } else {
          $scope.catelist= $scope.catelist.concat(data[0]);
        }
      })
      $scope.$broadcast('scroll.refreshComplete');
    }
    $scope.ismoredata = function () {
      return ismoredata;
    }

    //页面加载获取产品列表
    categoryService.getCateList(cateid,pageNo,pageSize).then(function(data){
      $scope.catelist=data[0];

    })


    $scope.title=catename;
    $scope.goBack=function(){
      $ionicHistory.goBack();
    }
    $scope.goDetail=function(id){
      window.location.href="#/detail/"+id;
    }

  }])
  .controller('searchCtrl',['$scope','$ionicHistory', '$state','categoryService',function($scope,$ionicHistory,$state,categoryService){

    $scope.$on('$ionicView.afterEnter',function(){
      var pageNo=1;
      var pageSize=10;
      var ismoredata = true;
      $scope.sort="";


      $scope.doRefresh = function () {
        pageNo++;
        categoryService.getSearchList(pageNo,pageSize,$scope.sort).then(function (data) {
          if (!data.length) {
            ismoredata = false;
          } else {
            $scope.catelist= $scope.catelist.concat(data[0]);
          }
        })
        $scope.$broadcast('scroll.refreshComplete');
      }
      $scope.ismoredata = function () {
        return ismoredata;
      }

      //页面加载获取产品列表
      getsearchlist();

      function getsearchlist(){
        categoryService.getSearchList(pageNo,pageSize,$scope.sort).then(function(data){
          $scope.catelist=data[0];
          console.log(data[0]);
        })
      }


      //点击价格更新搜索列表
      $scope.addSort=function(event,sort){
        $('.general').find('i').removeClass('balanced');
        pageNo=1;
        var nexti= $(event.target).next('i');
        if(sort==""){
          nexti.addClass('balanced');
          if(nexti.hasClass('ion-arrow-up-b')){
            $scope.sort="asc"; //降序
          }else{
            $scope.sort="desc";  //正序
          }
        }else if(sort=="asc"){
          $scope.sort="desc";
          nexti.removeClass('ion-arrow-up-b').addClass(' ion-arrow-down-b');

        }else{
          $scope.sort="asc";
          nexti.removeClass('ion-arrow-down-b').addClass(' ion-arrow-up-b');
        }
        getsearchlist();
      }

      //点击综合的时候
      $scope.gengral=function(){
        $('.general').find('i').addClass('balanced');
        $('.price').find('i').removeClass('balanced');
        $scope.sort="";
        getsearchlist();
      }

      $scope.clearSearch=function(){
        $scope.query="";
      }

      $scope.goBack=function(){
        $ionicHistory.goBack();
      }
      $scope.goDetail=function(id){
        window.location.href="#/detail/"+id;
      }
    },false)




  }])


  .controller('articleCtrl',['$scope','$ionicHistory', '$state',function($scope,$ionicHistory,$state){
    $scope.goBack=function(){
      $ionicHistory.goBack();
    }
  }])

  .controller('aboutCtrl',['$scope','$ionicHistory', '$state',function($scope,$ionicHistory,$state){
    $scope.goBack=function(){
      $ionicHistory.goBack();
    }
  }])


  .controller('detailCtrl', ['goodService', 'commentService', 'cartService', '$scope', '$stateParams', '$templateCache', '$ionicModal', '$ionicHistory', '$state','$ionicSlideBoxDelegate', function (goodService, commentService, cartService, $scope, $stateParams, $templateCache, $ionicModal, $ionicHistory, $state,$ionicSlideBoxDelegate) {
    var id = $stateParams.id;
    $scope.imgs={};
    goodService.getGoodPic(id).then(function(data){
        $scope.imgs=data;
        $ionicSlideBoxDelegate.update();
    })

    goodService.getGood(id).then(function (data) {










    $scope.mobileDetail=data[0]['MobileDetail'];

      $scope.name = data[0]['Name']; //名称,规格
      $scope.spec = data[0]['Specifications']['Spec'];
      $scope.InventoryPrice = data[0]['Specifications']['InventoryPrice']; //尺码信息，库存，价格的数组集合

      var getgood0info = function () {
        //商品默认第一个code值,规格名称，所选规格的值
        var sel0ids = [];
        var names = [];
        var sel0values = [];

        angular.forEach($scope.spec, function (item) {
          sel0ids.push(item['Value'][0]['OperateCode']);
          names.push(item['Value'][0]['_name']);
          sel0values.push(item['Value'][0]['_value']);
        })

        $scope.sel0ids = sel0ids;
        $scope.names = names;
        $scope.sel0values = sel0values;

        var speckey = getspeckey(sel0ids);
        var storkinfo = getstorkinfo(speckey);

        $scope.specdetail = storkinfo[0]['First'];
        $scope.stork = storkinfo[0]['Second'];
        $scope.shopprice = storkinfo[0]['Third'];
        $scope.num = 1;
      }


      //根据规格的id值进行与运算，计算出规格key;
      var getspeckey = function (ids) {
        var speckey = 0;
        angular.forEach(ids, function (item) {
          speckey = speckey | item;
        })
        return speckey;
      }

      //根据规格key得到尺码信息，库存，价格
      var getstorkinfo = function (speckey) {
        var storkinfo = [];
        angular.forEach($scope.InventoryPrice, function (item, key) {
          if (item['Key'] == speckey) {
            storkinfo.push(item['Value']);
          }
        })
        return storkinfo;
      }

      //默认为第一个产品的信息
      getgood0info();

      //点击加样式，重新计算库存信息
      $scope.addActive = function (event) {
        if (!$(event.target).hasClass('active')) {
          $(event.target).addClass('active').siblings().removeClass('active');

          //点击索引获取规格code;
          var specindex = $(event.target).parents('.clearfix').index();
          var specOperateCode = parseInt($(event.target).attr('OperateCode'));
          $scope.sel0ids[specindex] = specOperateCode;
          //根据规格code重新计算库存信息
          var storkinfo = getstorkinfo(getspeckey($scope.sel0ids));
          $scope.specdetail = storkinfo[0]['First'];
          $scope.stork = storkinfo[0]['Second'];
          $scope.shopprice = storkinfo[0]['Third'];
        }
      }
      //加号
      $scope.add = function () {
        $scope.num++;
        $scope.num = ($scope.num > $scope.stork) ? $scope.stork : $scope.num;
      }
      //减号
      $scope.minus = function () {
        $scope.num--;
        $scope.num = ($scope.num < 1) ? 1 : $scope.num;
      }
      $scope.storkmaxlen = $scope.stork.toString().length;
    })


    //点击规格模态框
    $ionicModal.fromTemplateUrl("my-modal.html", {
      scope: $scope,
      animation: "slide-in-up"
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
      $scope.isshow = true;
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
      $scope.isshow = false;
    };


    // 加入购物车
    $scope.addCart = function () {
      if ($scope.isshow) {
        $scope.modal.hide();
      }
      var userdata = eval('(' + localStorage.getItem('userdata') + ')');
      if (userdata != null && userdata['MemLoginID']) {
        cartService.addCart(id, $scope.specdetail, $scope.num, userdata['MemLoginID']).then(function (data) {
          if (data[0]['Stater'] == 1) {
            alert('加入购物车成功');
            var noselgoods = eval('(' + localStorage.getItem('noselgoods') + ')');
            var selgoods = eval('(' + localStorage.getItem('selgoods') + ')');

            var setSelectBool = function (issel, data1, data) {
              angular.forEach(data, function (item, key) {
                angular.forEach(data1, function (value, index) {
                  if (value['ProductGuid'] == item['ProductGuid']) {
                    if (issel) {
                      item['IsSelected'] = 1;
                      item['selected'] = true;
                    } else {
                      item['IsSelected'] = 0;
                      item['selected'] = false;
                    }
                  }
                })
              })
            }

            var setLocalCartSel = function (localcart, data) {
              angular.forEach(data, function (item) {
                angular.forEach(localcart, function (value) {
                  if (value['ProductGuid'] == item['ProductGuid']) {
                    if (value['IsSelected'] == 1) {
                      item['IsSelected'] = 1;
                      item['selected'] = true;
                    }
                  }
                })
              })
            }

            cartService.getCartInfo(userdata['MemLoginID']).then(function (data) {
              if (data[0].length) {
                //处理返回数据，按照创建时间排序
                angular.forEach(data[0],function(item,key){
                  if(item['CreateTime']){
                    item['CreateTime']=item['CreateTime'].substr(6).substr(0,13);
                  }
                })
                var cartinfo = eval('(' + localStorage.getItem('cartinfo') + ')');
                if (noselgoods == null && selgoods == null && cartinfo != null && cartinfo.length) { //用户未提交订单
                  setLocalCartSel(cartinfo, data[0]);
                }
                else if (noselgoods != null && selgoods == null) { //用户提交过订单
                  setLocalCartSel(cartinfo, data[0]);

                } else if (noselgoods != null && selgoods != null) { //用户提交过订单
                  setSelectBool(1, selgoods, data[0]);
                }

                localStorage.removeItem('cartinfo');
                var cartinfo = JSON.stringify(data[0]);
                localStorage.setItem('cartinfo', cartinfo);
              }

              $state.go('tab.cart');
            })
          }
        })
      } else {
        alert('请先登录!');
        $state.go('login');
      }
    }

    //获取产品评论
    var pageNo = 1;
    var pageSize = 1;
    var ismoredata = true;
    $scope.doRefresh = function () {
      pageNo++;
      commentService.getGoodComments(id, pageNo, pageSize).then(function (data) {
        if (!data[0].length) {
          ismoredata = false;
          alert('没有更多的数据了');
        } else {
          $scope.GoodComments = $scope.GoodComments.concat(upimgdata(data[0]));
        }
      })
      $scope.$broadcast("scroll.infiniteScrollComplete");
    }
    $scope.ismoredata = function () {
      return ismoredata;
    }
    //页面加载获取产品列表
    commentService.getGoodComments(id, pageNo, pageSize).then(function (data) {
      if (data[0].length) {
        $scope.GoodComments = upimgdata(data[0]);
      }
    })

    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    var upimgdata = function (data) {
      angular.forEach(data, function (item, key) {
        if (item['Image']) {
          item['Image'] = item['Image'].split('|');
        }
      })
      return data;
    }
  }])
  .controller('cartCtrl', ['cartService', '$scope', '$ionicHistory', 'shopname', '$state', function (cartService, $scope, $ionicHistory, shopname, $state) {
    $scope.$on('$ionicView.afterEnter', function () {

      $scope.goDetail=function(id){
        window.location.href='#/detail/'+id;
      }

      //页面加载根据用户的信息获取购物车信息
      var userdata = eval('(' + localStorage.getItem('userdata') + ')');
      var noselgoods = eval('(' + localStorage.getItem('noselgoods') + ')');
      var selgoods = eval('(' + localStorage.getItem('selgoods') + ')');
      var cartinfo = eval('(' + localStorage.getItem('cartinfo') + ')');

      if (noselgoods != null && cartinfo == null) { //用户提交过订单
        $scope.cartinfo = noselgoods;
      } else {
        $scope.cartinfo = cartinfo;
      }

      $scope.shopname = shopname;

      //  计算总价
      var totalprice = function () {
        var totalprice = 0;
        angular.forEach($scope.cartinfo, function (item) {
          if (item['selected']) {
            totalprice += item['ShopPrice'] * item['BuyNumber'];
          }
        })
        return totalprice;
      }

      // 计算总数
      var totalnumber = function () {
        var totalnumber = 0;
        angular.forEach($scope.cartinfo, function (item) {
          if (item['selected']) {
            totalnumber += eval(item['BuyNumber']);
          }
        })
        return totalnumber;
      }
      //是否全选
      var ischecked = function () {
        var select_arr = [];
        if ($scope.cartinfo != null) {
          angular.forEach($scope.cartinfo, function (item) {
            if (item['selected'] == true) {
              select_arr.push(item['selected']);
              item['IsSelected'] = 1;
            } else {
              item['IsSelected'] = 0;
            }
          })
          $scope.ischecked = (select_arr.length == $scope.cartinfo.length) ? true : false;
        }
      }
      $scope.totalprice = totalprice();
      $scope.totalnumber = totalnumber();
      ischecked();

      //点击加号
      $scope.add = function (id) {
        var cartindex = findindex(id);
        var currow = $scope.cartinfo[cartindex];
        ++currow['BuyNumber'];
        currow['BuyNumber'] = (currow['BuyNumber'] > currow['RepertoryCount']) ? currow['RepertoryCount'] : currow['BuyNumber'];
        currow['IsSelected'] = 1;
        currow['selected'] = true;
        $scope.totalprice = totalprice();
        $scope.totalnumber = totalnumber();
        updatelocalinfo();
      }
      //点击减号
      $scope.minus = function (id) {
        var cartindex = findindex(id);
        var currow = $scope.cartinfo[cartindex];
        --currow['BuyNumber'];
        currow['BuyNumber'] = (currow['BuyNumber'] < 1) ? 1 : currow['BuyNumber'];
        currow['IsSelected'] = 1;
        currow['selected'] = true;
        $scope.totalprice = totalprice();
        $scope.totalnumber = totalnumber();
        updatelocalinfo();
      }

      //点击checkbox更新价格，更新数量
      $scope.checksingle = function () {
        $scope.totalprice = totalprice();
        $scope.totalnumber = totalnumber();
        ischecked();
        updatelocalinfo();
      }

      //点击全选按钮
      $scope.selectall = function () {
        angular.forEach($scope.cartinfo, function (item) {
          item['selected'] = $scope.ischecked;
          item['IsSelected'] = ($scope.ischecked == true) ? 1 : 0;
        })
        $scope.totalprice = totalprice();
        $scope.totalnumber = totalnumber();
        updatelocalinfo();
      }
      // 查找单个索引
      var findindex = function (id) {
        var index = -1;
        angular.forEach($scope.cartinfo, function (item, key) {
          if (item['Guid'] == id) {
            index = key;
            return;
          }
        })
        return index;
      }

      //查找数组索引
      var findids = function () {
        var ids = [];
        angular.forEach($scope.cartinfo, function (item) {
          if (item['selected'] == true) {
            ids.push(item['Guid']);
          }
        })
        return ids.join(',');
      }

      //删除购物车产品
      $scope.deleteCart = function () {
        var ids = findids();
        if (!ids) {
          alert("请选择商品！");
          return false;
        }
        cartService.DeleteCart(userdata['MemLoginID'], ids).then(function (data) {
          if (data[0]['Stater'] == 1) {
            if ($scope.ischecked) {
              $scope.cartinfo = [];
            } else {
              ids = ids.split(',');
              angular.forEach(ids, function (id) {
                angular.forEach($scope.cartinfo, function (item, key) {
                  if (id == item['Guid']) {
                    $scope.cartinfo.splice(key, 1);
                  }
                })
              })
            }
            $scope.ischecked = false;
            $scope.totalprice = totalprice();
            $scope.totalnumber = totalnumber();
            updatelocalinfo();
          }
        })
      }


      //购物车操作更新本地存储信息
      var updatelocalinfo = function () {
        localStorage.removeItem('cartinfo');
        var cartinfo = JSON.stringify($scope.cartinfo);
        localStorage.setItem('cartinfo', cartinfo);
        $scope.cartinfo = eval('(' + localStorage.getItem('cartinfo') + ')');
      }

      //组合参数信息 组合产品信息
      var getParmsInfo = function () {
        var subcartinfo = {};
        var selgoods = [];
        var noselgoods = [];
        subcartinfo.Selected = [];

        angular.forEach($scope.cartinfo, function (item) {
          if (item['selected'] == true) {
            subcartinfo.Selected.push({
              "Guid": item['Guid'],
              "BuyNumber": item['BuyNumber'],
              "IsJoinActivity": 0,
              "UsedScore": 0,
              "ArrivedWithMoney": 0
            });
            //生成对象数组
            selgoods.push(item);
          } else {
            noselgoods.push(item);
          }
        })

        var cartinfo = JSON.stringify($scope.cartinfo);
        localStorage.setItem('subcartinfo', JSON.stringify(subcartinfo));
        localStorage.setItem('selgoods', JSON.stringify(selgoods));
        localStorage.setItem('noselgoods', JSON.stringify(noselgoods));
      }


      //点击结算
      $scope.balance = function () {
        getParmsInfo(); //组合信息
        var subcartinfo = eval('(' + localStorage.getItem('subcartinfo') + ')');
        if (subcartinfo.Selected.length) {
          $state.go('order');
        } else {
          alert("请选择商品！");
          return false;
        }
      }
      //返回
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }, false)
  }])
  .controller('orderCtrl', ['$scope', '$ionicHistory', '$state', 'addressService', 'shopname', 'expressService', 'orderService','$ionicPopup',function ($scope, $ionicHistory, $state, addressService, shopname, expressService, orderService,$ionicPopup) {
    $scope.$on('$ionicView.afterEnter', function () {
      //获取正在使用中的地址;
      var useAddress = addressService.getUseAddress()[0];
      if (useAddress) {
        $scope.useAddress = useAddress;
        $scope.useAddress.address = $scope.useAddress['provcityarea'].replace(',', '') + $scope.useAddress['street'];
        expressService.getExpressList($scope.useAddress.address).then(function (data) {
          if (data) {
            $scope.expresslist = data[0];
            $scope.ret = {choice: $scope.expresslist[0]['Guid']};
            $scope.expenses = $scope.expresslist[0]['Price'];
            //计算快递费
            $scope.getExpenses = function (guid) {
              var index = findindex(guid);
              $scope.expenses = $scope.expresslist[index]['Price'];
            }
          }
        })
      }

      //跳转地址列表
      $scope.skipAddress = function () {
        $state.go('skip_address');
      }
      //查找索引
      var findindex = function (id) {
        var index = -1;
        angular.forEach($scope.expresslist, function (item, key) {
          if (id == item['Guid']) {
            index = key;
          }
        })
        return index;
      }


      var selgoods = eval('(' + localStorage.getItem('selgoods') + ')');
      $scope.selgoodinfo = selgoods;
      $scope.shopname = shopname;
      //合计总额
      $scope.totalprice = function () {
        var totalprice = 0;
        angular.forEach($scope.selgoodinfo, function (item) {
          totalprice += item["BuyPrice"] * item['BuyNumber'];
        })
        return totalprice;
      }

      //合计总数
      $scope.totalnumber = function () {
        var totalnumber = 0;
        angular.forEach($scope.selgoodinfo, function (item) {
          totalnumber += item['BuyNumber'];
        })
        return totalnumber;
      }
      //合计运费加商品总额
      $scope.totalAndExpenses = function () {
        return $scope.totalprice() + $scope.expenses;
      }

      //取消支付失败点击返回之后,点击提交订单

      var jumpMyorder=function(){
        $ionicPopup.alert({
        title: "重复提交订单",
        template: "订单已存在,点击确定去列表查看",
        okText:"确定",
        okType:'button-balanced'
      })
    .then(function(res) {
      if(res) {
        window.location.href="#/myorder";
      }
      });
      }




      //创建订单
      $scope.createOrder = function () {
        var userdata = eval('(' + localStorage.getItem('userdata') + ')');
        var memberinfo = {MemberName: userdata['MemLoginID']};
        var AddressInfo = {};
        AddressInfo.AddressInfo = $scope.useAddress;
        if ($scope.useAddress == undefined) {
          alert('请添加收货地址');
          return false;
        }
        //取消支付失败点击返回之后,点击提交订单

        if($scope.selgoodinfo==null){
            jumpMyorder();

        }

        var index = findindex($scope.ret.choice);
        $scope.experinfo = $scope.expresslist[index];
        delete $scope.experinfo['Name'];
        var experinfo = {};
        experinfo.DispatchModeGuid = $scope.experinfo.Guid;
        experinfo.DispatchPrice = $scope.experinfo.Price;
        var subcartinfo = eval('(' + localStorage.getItem('subcartinfo') + ')');
        var orderinfo = $.extend(true, experinfo, AddressInfo, memberinfo, subcartinfo);

        orderService.GoOrder(JSON.stringify(orderinfo)).then(function (data) {
          if (data[0]['Stater'] == 1) {
            //提交订单，提取选中商品的guid保存在本地，并且删除选中商品的信息
            localStorage.removeItem('cartinfo');
            localStorage.removeItem('subcartinfo');
            localStorage.removeItem('selgoods');
            var noselgoods = eval('(' + localStorage.getItem('noselgoods') + ')');
            localStorage.removeItem('noselgoods');
            localStorage.setItem('noselgoods', JSON.stringify(noselgoods));
            window.location.href = '#/pay/'+data[0]['result'];
          }
        })
      }
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }, false)

  }])
  .controller('payCtrl', ['$scope', '$http', '$stateParams', '$ionicHistory', 'payService','$state','orderService',function ($scope, $http, $stateParams, $ionicHistory,payService,$state,orderService) {
          $scope.$on('$ionicView.afterEnter', function () {
        var orderId=$stateParams['id'];
        var channel='wx';
        var subject="订单号:"+orderId;
        var body="描述";
        var userdata = eval('(' + localStorage.getItem('userdata') + ')');
        var MemberName=userdata['MemLoginID'];
        $scope.pay=function(){
          payService.pay(orderId,channel,MemberName,subject,body).then(function(data){
          try {
          pingpp.createPayment(data[0], function (result) {
            //支付成功更改订单状态
           orderService.uodateOrderState(MemberName,orderId).then(function(data){
              if(data[0].Starter==3){
              $state.go("myorder");
              }
           })
          }, function (result) {
            alert('支付未完成!');
             $state.go("myorder");
          });
        }
        catch (e) {
          alert("支付未完成！");
           $state.go("myorder");
        }
          })
        }

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
     }, false)
  }])
  .controller('userCtrl', ['$scope', 'httpUrl', '$ionicHistory', function ($scope, httpUrl, $ionicHistory) {
    $scope.title = 'userCtrl';
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  }])
  .controller('aboutUsCtrl', ['$scope', 'httpUrl', '$ionicHistory', function ($scope, httpUrl, $ionicHistory) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  }])


  .controller('myorderCtrl', ['$scope', 'orderService', '$ionicHistory', 'shopname','payService', function ($scope, orderService, $ionicHistory, shopname,payService) {
    $scope.$on('$ionicView.afterEnter', function () {
      var pageNo = 1;
      var pageSize = 30;
      var userdata = eval('(' + localStorage.getItem('userdata') + ')');
      var MemberName = userdata['MemLoginID'];
      var ismoredata = true;
      $scope.shopname = shopname;
      $scope.doRefresh = function () {
        pageNo++;
        orderService.getOrders(MemberName, pageNo, pageSize).then(function (data) {
          if (!data.length) {
            ismoredata = false;
          } else {
            $scope.orders = $scope.orders.concat(data[0]['rows']);
            updataorder();
          }
        })

        $scope.$broadcast("scroll.infiniteScrollComplete");
      }
      $scope.ismoredata = function () {
        return ismoredata;
      }

      orderService.getOrders(MemberName, pageNo, pageSize).then(function (data) {
        $scope.orders = data[0]['rows'];
        updataorder();
      })

      var updataorder = function () {
        $scope.orderdata0 = [];
        $scope.orderdata1 = [];
        $scope.orderdata2 = [];

        angular.forEach($scope.orders, function (item, key) {

          //没有退款的状态
          if (item['ProcessState'] == '') {
            if (item['OderStatus'] == 5) {
              $scope.orderdata2.push(item);
            } else if (item['PaymentStatus'] == 0) {
              $scope.orderdata0.push(item);
            } else if (item['PaymentStatus'] == 2) {
              $scope.orderdata1.push(item);
            }

          } else {
            if (item['ProcessState'] == 2) {
              $scope.orderdata1.push(item);
            } else {
              $scope.orderdata2.push(item);
            }
          }
        })
      }

      //点击付款
      $scope.payOrder=function(orderId){
        window.location.href="#/pay/"+orderId;
      }


      //取消订单
      $scope.cancelOrder = function (OrderNumber) {
        orderService.cancelOrder(MemberName, OrderNumber).then(function (data) {
          if (data[0]['Stater'] == -1) {
            var index = findindex(OrderNumber);
            $scope.orders.splice(index, 1);
            updataorder();
            alert('取消成功');
          }
        })
      }

      //查看物流
      $scope.lookpost = function (postname, ordernumber) {
       cordova.ThemeableBrowser.open('http://m.kuaidi100.com/index_all.html?type=京东快递&postid=18728278893&callbackurl=javascript:history.back()', '_blank', {
    statusbar: {
        color: '#ffffffff'
    },
    toolbar: {
        height: 44,
        color: '#33cd5f'
    },
    title: {
        color: '#ffffff',
        showPageTitle: true
    },
     backButton: {
        wwwImage: 'img/back.png',
        wwwImagePressed: 'img/back.png',
        wwwImageDensity: 2,
        align: 'left',
        event: 'backPressed'
    },

    closeButton: {
        wwwImage: 'img/close.png',
        wwwImagePressed: 'img/close.png',
        align: 'right',
        event: 'closePressed'
    },

    backButtonCanClose: true
})

}



      //退款
      $scope.drawback = function (ordernumber) {
        var userdata = eval('(' + localStorage.getItem('userdata') + ')');
        var m = userdata['MemLoginID'];
        orderService.drawback(m, ordernumber).then(function (data) {
          if (data[0]['Starter'] == 3) {
            alert(data[0]['Msg']);
            var index = findindex(ordernumber);
            if (index > -1) {
              //退款审核中
              $scope.orders[index]['ProcessState'] = 2;
            }
            updataorder();
          }
        })
      }

     //确认收货
      $scope.sureReceive = function (ordernumber, isreturn) {
        var userdata = eval('(' + localStorage.getItem('userdata') + ')');
        var m = userdata['MemLoginID'];
        orderService.CinfirmReceipt(m, ordernumber, isreturn).then(function (data) {
          if (data[0]['Starter'] == 3) {
            var index = findindex(ordernumber);
            if (index > -1) {
              $scope.orders[index]['OderStatus'] = 5;
            }
            updataorder();
          }
        })
      }

 //添加评论
      $scope.addComment = function (orderNumber, guid, name) {
        window.location.href = '#/add_comment/' + orderNumber + ":" + guid + ":" + name;
      }

      var findindex = function (orderid) {
        var index = -1;
        angular.forEach($scope.orders, function (item, key) {
          if (orderid == item['OrderNumber']) {
            index = key;
          }
        })
        return index;
      }
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }, false)


  }])
  .controller('addAddressCtrl', ['$scope', '$http', '$stateParams', '$ionicHistory', 'addressService', '$state', function ($scope, $http, $stateParams, $ionicHistory, addressService, $state) {
    var id = $stateParams['id'];
    if (id > -1) {
      $scope.data = {};
      $scope.data = addressService.getAddress(id)[0];
      var provcityarea = $scope.data['provcityarea'].split(',');
      $scope.data.selprov = provcityarea[0];
      $scope.data.selcity = provcityarea[1];
      $scope.data.selarea = provcityarea[2];
      $scope.title = "编辑地址";
    } else if (id == -1) {
      $scope.data = {};
      $scope.title = "新增地址";
    }

    $http.post('data/areas.json').success(function (data) {
      $scope.provcode = '';
      var getprovince = function () {
        var provinces = [];
        angular.forEach(data, function (item) {
          if (item['level'] == "1") {
            provinces.push([item['code'], item['name']]);
          }
        })
        $scope.provinces = provinces;
      }
      getprovince();
      $scope.getcity = function (code) {
        var citys = [];
        angular.forEach(data, function (item) {
          if (item['parentCode'] == code) {
            citys.push([item['code'], item['name']]);
          }
        })
        $scope.citys = citys;
      }
      $scope.getarea = function (code) {
        var areas = [];
        angular.forEach(data, function (item) {
          if (item['parentCode'] == code) {
            areas.push([item['code'], item['name']]);
          }
        })
        $scope.areas = areas;
      }
      $scope.getarealatlng = function (code) {
        angular.forEach(data, function (item) {
          if (item['code'] == code) {
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(item['longitude'], item['latitude']);
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
              var addComp = rs.addressComponents;
              $scope.data.provcityarea = addComp.province + ", " + addComp.city + ", " + addComp.district;

            });
          }
        })
      }
    })
    $scope.saveAddress = function (vaild) {
      if (vaild) {
        //修改
        if (id > -1) {
          $scope.data.isuse = 1;
          if (addressService.updateAddress(id, $scope.data)) {
            alert('修改成功');
            $ionicHistory.goBack();
          }
        } else if (id == -1) {
          $scope.data.isuse = 1;
          if (addressService.addAddress($scope.data)) {
            alert('保存成功');
            $ionicHistory.goBack();
          }
        }
      } else {
        alert('表单没有通过');
      }
    }

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

  }])
  .controller('skipAddressCtrl', ['addressService', '$ionicHistory', '$scope', '$state', function (addressService, $ionicHistory, $scope, $state) {
    $scope.$on('$ionicView.afterEnter', function () {
      //获取地址列表信息
      $scope.addressdata = addressService.getAddressInfo();
      //点击更改用户当前使用的信息
      $scope.selUseAddress = function (id) {
        if (addressService.selUseAddress(id)) {
          $ionicHistory.goBack();
        }
      }

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }, false)
  }])
  .controller('addressCtrl', ['$scope', '$http', 'httpUrl', '$ionicHistory', 'addressService', function ($scope, $http, httpUrl, $ionicHistory, addressService) {
    $scope.$on('$ionicView.afterEnter', function () {
      //获取地址列表信息
      $scope.addressdata = addressService.getAddressInfo();

      //设为默认
      $scope.setDefault = function (addressid) {
        var isdefault = $scope.addressdata[addressid]['isdefault'];
        if (isdefault) {
          addressService.setDefaultAddress(addressid);
        } else {
          localStorage.removeItem('addressinfo');
          localStorage.setItem('addressinfo', JSON.stringify($scope.addressdata));
        }
        $scope.addressdata = addressService.getAddressInfo();
      }

      //删除地址
      $scope.delAddress = function (addressid) {
        if (addressService.DelUseAdess(addressid)) {
          $scope.addressdata = addressService.getAddressInfo();
        }
      }

      $scope.editAddress = function (id) {
        window.location.href = '#/add_address/' + id;
      }
      var findindex = function (addressid) {
        var index = -1;
        angular.forEach(data, function (item, key) {
          if (addressid == item['id']) {
            index = key;
          }
        })
        return index;
      }
      $scope.goBack = function () {
        $ionicHistory.goBack();
      }
    }, false)

  }])
  .controller('memberCtrl', ['$scope', '$http', 'httpUrl', '$ionicHistory', 'memberService', function ($scope, $http, httpUrl, $ionicHistory, memberService) {
    $scope.$on('$ionicView.afterEnter', function () {
      //获取会员列表信息
      var userdata = eval('(' + localStorage.getItem('userdata') + ')');
      var memloginid = userdata['MemLoginID'];
      memberService.getTeamlist(memloginid).then(function (data) {
        var rootdata = data[0];
        $scope.memberdata = data[0];

        $scope.getLowMembers = function (memberid) {
          angular.forEach($scope.memberdata, function (item) {
            if (memberid == item['memloginid']) {
              if (typeof(item['children']) == 'object') {
                $scope.highernickname = item['nickname'];
                $scope.higherimg = item['headimgurl'];
                $scope.memberdata = item['children'];
                $scope.parentid = item['fatherLoginId'];
              }
            }
          })
        }

        $scope.getHighMembers = function (parentid) {
          if (parentid == memloginid) {
            $scope.memberdata = rootdata;
            $scope.highernickname = null;
          } else {
            angular.forEach(rootdata, function (item) {
              if (parentid == item['memloginid']) {
                if (typeof(item['children']) == 'object') {
                  $scope.highernickname = item['nickname'];
                  $scope.higherimg = item['headimgurl'];
                  $scope.memberdata = item['children'];
                  $scope.parentid = item['fatherLoginId'];
                }
              }
            })
          }
        }
      });

      $scope.goBack = function () {
        $ionicHistory.goBack();
      }

    }, false)
  }])


  .controller('addCommentCtrl', ['$scope', 'commentService', '$cordovaImagePicker', '$stateParams', '$ionicHistory', '$http',function ($scope, commentService, $cordovaImagePicker, $stateParams, $ionicHistory,$http) {

    var strparamsArr = $stateParams['id'].split(':');
    var orderNumber = strparamsArr[0];
    var proGuid = strparamsArr[1];
    var name = strparamsArr[2];
    var title = '';
    var userdata = eval('(' + localStorage.getItem('userdata') + ')');
    var strMemLoginId = userdata['MemLoginID'];
    $scope.strContext = '';
  //   $scope.photo;
  //   $scope.file_changed = function(element) {
  //        $scope.photo=element.files[0];
  //        if(!/image\/\w+/.test($scope.photo.type)){S
  //               alert("这个需要图片！");
  //               return false;
  //           }
  //        var reader = new FileReader();
  //         reader.readAsDataURL($scope.photo);
  //         reader.onload = function(e) {
  //           $('.imgbox').append(' <img src="'+this.result+'" alt="" id="showImg" class="full-image">');
  //          $('.u-upload').remove();
  //        };
  // };


    $scope.left = function () {
      return 100 - $scope.strContext.length;
    }

    $scope.saveComment = function (vaild) {
      if(vaild){
          commentService.addComment($scope.strContext,proGuid,strMemLoginId,orderNumber,name,title).then(function(data){
              if(data[0]['Stater']==1){
                alert('添加成功,请耐心等待管理员审核！');
                $ionicHistory.goBack();
              }
              if(data[0]['Stater']==-1){
                  alert(data[0]['Msg']);
              }
          })
      }

          }
        $scope.goBack = function () {
          $ionicHistory.goBack();
        }
  }])

  .controller('registerCtrl', ['$scope', '$interval', '$ionicHistory', 'userService', '$state', function ($scope, $interval, $ionicHistory, userService, $state) {
    $scope.number = "发送验证码";
    //测试默认值为123456
    $scope.code=123456;
    $scope.sendcode = function (event) {
      if($scope.data==undefined){
        alert("请填写注册信息");
        return false;
      }
       if($scope.data && $scope.data.phone==undefined){
        alert("请填写正确的手机号码");
        return false;
      }
       if($scope.data.phone && /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test($scope.data.phone)){
            var number = 10;
            var count = 0;
            var interval = $interval(function () {
              if (count >= number) {
                $scope.number = "发送验证码";
                $interval.cancel(interval);
                $(event.target).removeClass('disabled');
              } else {
                $(event.target).addClass('disabled');
                 $scope.number = "剩余"+(number-count)+"秒";
              }
           count++;
           }, 1000);

         //    userService.getCode($scope.data.phone).then(function(data){
         //    if(data[0].Starter==3){
         //        $scope.code=data[0].Code;
         //        alert(data[0].Result);
         //    }
         //    if(data[0].Starter==-1){
         //        alert(data[0].Result);
         //        return false;
         //    }
         // })
            $scope.code=123456;
      }
    }

    $scope.userRegister = function (vaild) {
      if (vaild) {
        if($scope.code!=$scope.data.checkcode){
          alert('验证码输入有误!');
          return false;
        }
        var password = hex_md5($scope.data.password);
        var promise = userService.userRegister($scope.data.username, $scope.data.phone, password, password);
        promise.then(function (data) {
          alert('用户注册成功,');
          $state.go('login');
        })
      } else {
        alert('表单没有通过');
      }
    }

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  }])
  .controller('updateUserCtrl', ['$http', '$scope', '$ionicHistory', 'userService', function ($http, $scope, $ionicHistory, userService) {
    $scope.userUpdate = function (valid) {
      if (valid) {
        var userdata = eval('(' + localStorage.getItem('userdata') + ')');
        $scope.data.username = userdata['MemLoginID'];
        $scope.data.password = hex_md5($scope.data.password.toString());
        $scope.data.oldpassword = hex_md5($scope.data.oldpassword.toString());
        var promise = userService.userUpdate($scope.data.username, $scope.data.phone, $scope.data.oldpassword, $scope.data.password, $scope.data.password);
        promise.then(function (data) {
          if (data) {
            alert('修改成功');
            $ionicHistory.goBack();
          }

        }, function (data) {
          alert({error: '获取数据信息失败'});
        })
      } else {
        alert('表单没有通过');
      }
    }
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  }])
  .controller('loginCtrl', ['$http', '$scope', '$ionicHistory', 'userService', '$state', function ($http, $scope, $ionicHistory, userService, $state) {
    $scope.userLogin = function (vaild) {
      if (vaild) {
        var password = hex_md5($scope.data.password.toString());
        var promise = userService.userLogin($scope.data.username, password, password);
        promise.then(function (data) {
          if (data[0]['User']) {
            alert('登录成功！');
            $state.go('tab.list');
            localStorage.setItem("userdata", JSON.stringify(data[0]['User']));
          } else {
            alert('登录信息有误!');
          }
        })
      } else {
        alert('表单没有通过');
      }
    }
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  }])










