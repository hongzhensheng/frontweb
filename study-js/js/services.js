angular.module('starter.services',[])
    .factory("goodService", ['$http', '$q', 'httpUrl', function ($http,$q,httpUrl) {
        return{
            //商品列表
            getGoods:function(pageNo,pageSize){
                var deferred = $q.defer();
                var method = 'RefreshProduct';
                $http.jsonp(httpUrl + '&method=' + method + '&pageNo=' + pageNo +'&pageSize=' +pageSize).
                    success(function (data) {
                        deferred.resolve(data);
                    }).
                    error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },
            //单个商品
            getGood:function(id){
                var deferred = $q.defer();
                var method = 'GetProductById';
                $http.jsonp(httpUrl + '&method=' + method + '&id=' + id ).
                    success(function (data) {
                        deferred.resolve(data);
                    }).
                    error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },
          //获取单个商品的轮播图
          getGoodPic:function(id){
            var deferred= $q.defer();
            var method = 'GetProductImages';
            $http.jsonp(httpUrl + '&method=' + method + '&guid=' + id ).
            success(function (data) {
              deferred.resolve(data);
            }).
            error(function (data) {
              deferred.reject(data);
            });
            return deferred.promise;
        }
        }
    }])
  .factory("categoryService", ['$http', '$q', 'httpUrl', function ($http,$q,httpUrl) {
    return {
      //获取产品分类
      getCategory:function(){
        var deferred = $q.defer();
        var method = 'GetCategories';
        $http.jsonp(httpUrl + '&method=' + method ).
        success(function (data) {
          deferred.resolve(data);
        }).
        error(function (data) {
          deferred.reject(data);
        });
        return deferred.promise;
      },
      //获取单个分类列表
      getCateList:function(id,pageNo,pageSize){
        var deferred = $q.defer();
        var method = 'SearchProduct';
        $http.jsonp(httpUrl + '&method=' + method  + '&category=' + id + '&pageNo=' + pageNo + '&pageSize=' + pageSize).
        success(function (data) {
          deferred.resolve(data);
        }).
        error(function (data) {
          deferred.reject(data);
        });
        return deferred.promise;
      },
      //获取搜索列表
      getSearchList:function(pageNo,pageSize,sort){

        console.log(1);

        var deferred = $q.defer();
        var method = 'SearchProduct';
        $http.jsonp(httpUrl + '&method=' + method  + '&pageNo=' + pageNo + '&pageSize=' + pageSize+'&price=' + sort).
        success(function (data) {
          deferred.resolve(data);
        }).
        error(function (data) {
          deferred.reject(data);
        });
        return deferred.promise;
      }
    }
  }])


    .factory("commentService", ['$http', '$q', 'httpUrl', function ($http,$q,httpUrl) {
        return{
            //添加商品评论
        addComment:function(strContext,proGuid,strMemLoginId,orderNumber,title,name){
                var deferred = $q.defer();
                var method = 'InsertComment';
                $http.jsonp(httpUrl + '&method=' + method + '&content=' + strContext + '&Guid=' + proGuid +'&u=' +strMemLoginId+ '&orderNumber=' + orderNumber + '&title=' + title +'&name=' +name).
                    success(function (data) {
                        deferred.resolve(data);
                    }).
                    error(function (data) {
                        console.log(data);
                        deferred.reject(data);
                    });

                return deferred.promise;
            },
            //获取商品评论
            getGoodComments:function(id,pageNo,pageSize){
                var deferred = $q.defer();
                var method = 'GetComment';
                $http.jsonp(httpUrl + '&method=' + method + '&guid=' + id + '&pageNo=' + pageNo +'&pageSize=' +pageSize).
                    success(function (data) {
                        deferred.resolve(data);
                    }).
                    error(function (data) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            }
        }
    }])
    .factory("cartService", ['$http', '$q', 'httpUrl',function ($http,$q,httpUrl) {
        return{
            //添加购物车
            addCart:function(Guid,detail,buyNumber,memberName){
                var deferred = $q.defer();
                var method = 'AddCart';
                $http.jsonp(httpUrl + '&method=' + method + '&guid=' + Guid + '&detail=' + detail +'&buyNumber=' +buyNumber+'&memberName=' +memberName).
                    success(function (data) {
                        deferred.resolve(data);
                    }).
                    error(function (data) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            },
            //获取购物车列表
            getCartInfo:function(MemberName){
                var deferred = $q.defer();
                var method = 'GetCartInfo';
                $http.jsonp(httpUrl + '&method=' + method + '&MemberName=' + MemberName).
                    success(function (data) {
                        deferred.resolve(data);
                    })
                return deferred.promise;
            },
            //删除购物车产品
            DeleteCart:function(memberName,ids){
                var deferred = $q.defer();
                var method = 'DeleteCart';
                $http.jsonp(httpUrl + '&method=' + method + '&MemberName=' + memberName+'&guid=' + ids).
                    success(function (data) {
                        deferred.resolve(data);
                    })
                return deferred.promise;
            }
        }
    }])
.factory("payService", ['$http', '$q', 'httpUrl',function ($http,$q,httpUrl) {
        return{
            //添加购物车
            pay:function(orderid,channel,memberName,subject,body){
                var deferred = $q.defer();
                var method = 'Pay';
                $http.jsonp(httpUrl + '&method=' + method + '&orderNumber=' + orderid + '&channel=' + channel + '&m=' + memberName +'&subject=' +subject+'&body=' +body).
                    success(function (data) {
                        deferred.resolve(data);
                    }).
                    error(function (data) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            }

        }
    }])



    .factory('userService',['$http','$q','httpUrl',function($http,$q,httpUrl){
        return {
            //用户注册
            userRegister:function(MemberName,Mobile,Pwd,password){
                var deferred=$q.defer();
                var method='MemberRegistration';
                $http.jsonp(httpUrl+"&method="+method+"&MemberName="+MemberName+"&Mobile="+Mobile+"&Pwd="+Pwd+"&password="+password)
                    .success(function(data){
                    deferred.resolve(data);
                })
                return deferred.promise;
            },
            //用户登录
            userLogin:function(MemLoginID,Pwd,password){
                var deferred=$q.defer();
                var method='DistributorLogin';
                $http.jsonp(httpUrl+"&method="+method+"&MemLoginID="+MemLoginID+"&Pwd="+Pwd+"&password="+password)
                    .success(function(data,status,headers,config){
                        deferred.resolve(data);
                    })
                return deferred.promise;
            },
            //用户修改信息
            userUpdate:function(MemberName,phone,oldpwd,Pwd,RePwd){
                var deferred=$q.defer();
                var method='UpdateMemberInfo';
                $http.jsonp(httpUrl+"&method="+method+"&MemberName="+MemberName+"&Mobile="+phone+"&oldpwd="+oldpwd+"&Pwd="+Pwd+"&RePwd="+RePwd)
                    .success(function(data,status,headers,config){
                        deferred.resolve(data);
                    })
                return deferred.promise;
            },
            //发送验证码
           getCode:function(phone){
                var deferred=$q.defer();
                var method='ValidateCode';
                $http.jsonp(httpUrl+"&method="+method+"&p="+phone)
                    .success(function(data,status,headers,config){
                        deferred.resolve(data);
                    })
                return deferred.promise;
            },

        }
    }])

    .factory("orderService", ['$http', '$q', 'httpUrl',function ($http,$q,httpUrl) {
        return {
            //创建订单
            GoOrder: function (parms) {
                var deferred = $q.defer();
                var method = 'CreateOrder';
                $http.jsonp(httpUrl + '&method=' + method + '&SubmitMethod=Post&parms=' + parms).
                    success(function (data) {
                        deferred.resolve(data);
                    })
                return deferred.promise;
            },
            //获取订单列表
            getOrders: function (MemLoginID, PageNo, PageSize) {
                var deferred = $q.defer();
                var method = 'GetOrderInfo';
                $http.jsonp(httpUrl + '&method=' + method + '&MemLoginID=' + MemLoginID + '&PageNo=' + PageNo + '&PageSize=' + PageSize).
                    success(function (data) {
                        deferred.resolve(data);

                    })
                return deferred.promise;
            },
            //取消订单
            cancelOrder: function (MemLoginID, orderNumber) {
                var deferred = $q.defer();
                var method = 'CancelOrder';
                $http.jsonp(httpUrl + '&method=' + method + '&MemLoginID=' + MemLoginID + '&orderNumber=' + orderNumber).
                    success(function (data) {
                        deferred.resolve(data);

                    })
                return deferred.promise;
            },
            //退款
            drawback:function(m,orderNumber){

            var deferred = $q.defer();
            var method = 'Drawback';
            $http.jsonp(httpUrl + '&method=' + method + '&m=' + m + '&orderNumber=' + orderNumber).
                success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },

            //退货
            returnGoods:function(m,orderNumber){
            var deferred = $q.defer();
            var method = 'ReturnGoods';
            $http.jsonp(httpUrl + '&method=' + method + '&m=' + m + '&orderNumber=' + orderNumber).
                success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
            //确认收货
            CinfirmReceipt:function(m,orderNumber,isReturn){
                var deferred = $q.defer();
                var method = 'CinfirmReceipt';
                $http.jsonp(httpUrl + '&method=' + method + '&m=' + m + '&orderNumber=' + orderNumber+ '&isReturn=' +isReturn ).
                    success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            //用户支付成功更改订单的状态
            uodateOrderState:function(m,orderNumber){
                var deferred = $q.defer();
                var method = 'PaidUpdateOrderStatus';
                $http.jsonp(httpUrl + '&method=' + method + '&m=' + m + '&orderNumber=' + orderNumber+ '&paymentStatus=2' ).
                    success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }


    }

    }])

    .factory('addressService',[function(){
        return{
            //添加地址
            addAddress:function(address){
                var chaddress=address;
                    delete chaddress.isdefault;
                    delete chaddress.isuse;
                var addressinfo=eval('('+localStorage.getItem('addressinfo') +')');
                if(addressinfo==null){
                    addressinfo=[];
                }
                var chaddressinfo=addressinfo;
                angular.forEach(chaddressinfo,function(item,key){
                  delete item['isdefault'];
                  delete item['isuse'];
                })

                //对象是否重复
                var  isObjectValueEqual=function(a, b) {
                    var aProps = Object.getOwnPropertyNames(a);
                    var bProps = Object.getOwnPropertyNames(b);
                    if (aProps.length != bProps.length) {
                        return false;
                    }

                    for (var i = 0; i < aProps.length; i++) {
                        var propName = aProps[i];
                        if (a[propName] !== b[propName]) {
                            return false;
                        }
                    }
                    return true;
                }
                //添加成功，最新值默认使用，本地存储的地址信息不使用
                var setIsUse=function(addressinfo){
                    angular.forEach(addressinfo,function(item,key){
                        item['isuse']=0;
                    })
                }
                //添加成功，选择设为默认值，本地存储的所有默认信息设为false;
                var setIsDefault=function(isdefault,addressinfo){
                    if(isdefault){
                        angular.forEach(addressinfo,function(item,key){
                            item['isdefault']=false;
                        })
                    }
                }
              var isEqual =function (chaddress,chaddressinfo){

                  var isequal=false;
                  angular.forEach(chaddressinfo,function(item){
                      if(isObjectValueEqual(chaddress, item)){
                          alert('已经添加过了');
                          isequal=true;
                          return;
                      }
                  })
                  return isequal;
                }

                if(!isEqual(address,addressinfo)){
                    //不重复
                    setIsUse(addressinfo);
                    setIsDefault(address.isdefault,addressinfo);
                    addressinfo.push(address);
                    localStorage.setItem('addressinfo',JSON.stringify(addressinfo));
                    return true;
                }else{
                    return false;
                }
            },

            //获取地址列表
            getAddressInfo:function(){
                var addressinfo=eval('('+localStorage.getItem('addressinfo') +')');
                //更新具体的地址信息
                angular.forEach(addressinfo,function(item,key){
                    addressinfo[key]['address']=item['provcityarea']+item['street'];
                })
                return addressinfo;
            },

            //用户点击选择地址
            selUseAddress:function(id){
                var addressinfo=eval('('+localStorage.getItem('addressinfo') +')');
                //更新具体的地址信息
                angular.forEach(addressinfo,function(item,key){
                   if(id==key){
                       item['isuse']=1;
                   }else{
                       item['isuse']=0;
                   }
                })
                localStorage.setItem('addressinfo',JSON.stringify(addressinfo));
                return true;
            },


            //获取单个地址
            getAddress:function(id){
                var address=[];
                var addressinfo=eval('('+localStorage.getItem('addressinfo') +')');
                angular.forEach(addressinfo,function(item,key){
                    if(id==key){
                        address.push(item);
                    }
                })
                return address;
            },
            //修改地址
            updateAddress:function(id,address){
                var flag=false;
                var addressinfo=eval('('+localStorage.getItem('addressinfo') +')');

                //添加成功，选择设为默认值，本地存储的所有默认信息设为false;
                var setIsDefault=function(isdefault,addressinfo){
                    if(isdefault){
                        angular.forEach(addressinfo,function(item,key){
                            item['isdefault']=false;
                        })
                    }
                }
                var setIsUse=function(addressinfo){
                    angular.forEach(addressinfo,function(item,key){
                        item['isuse']=0;
                    })
                }
                var  isObjectValueEqual=function(a, b) {
                    var aProps = Object.getOwnPropertyNames(a);
                    var bProps = Object.getOwnPropertyNames(b);
                    if (aProps.length != bProps.length) {
                        return false;
                    }

                    for (var i = 0; i < aProps.length; i++) {
                        var propName = aProps[i];

                        if (a[propName] !== b[propName]) {
                            return false;
                        }
                    }
                    return true;
                }
                var isEqual =function (address,addressinfo){
                    var isequal=false;
                    angular.forEach(addressinfo,function(item){
                        if(isObjectValueEqual(address, item)){
                            alert('已经添加过了');
                            isequal=true;
                            return;
                        }
                    })
                    return isequal;
                }
                //不能重复；
                if(!isEqual(address,addressinfo)) {
                    setIsUse(addressinfo);
                    setIsDefault(address.isdefault,addressinfo);
                    angular.forEach(addressinfo, function (item, key) {
                        if (id == key) {
                            addressinfo.splice(key, 1, address);
                            flag = true;
                            return;
                        }
                    })
                    localStorage.removeItem('addressinfo');
                    localStorage.setItem('addressinfo', JSON.stringify(addressinfo));
                    return flag;
                }
            },
            //获取正在使用中的地址;
            getUseAddress:function(){
                var useAddress=[];
                var addressinfo=eval('('+localStorage.getItem('addressinfo') +')');
                angular.forEach(addressinfo,function(item,key){
                    if(item['isuse']==1){
                        useAddress.push(item);
                    }
                })
                return useAddress;
            },
            //删除地址
            DelUseAdess:function(id){
                var flag=false;
                var useAddress=[];
                var addressinfo=eval('('+localStorage.getItem('addressinfo') +')');
                angular.forEach(addressinfo,function(item,key){
                    if(id==key){
                        addressinfo.splice(key,1);
                        flag = true;
                        return;
                    }
                })
                localStorage.removeItem('addressinfo');
                localStorage.setItem('addressinfo', JSON.stringify(addressinfo));
                return flag;
            },
            //设置默认
            setDefaultAddress:function(id){
                var flag=false;
                var addressinfo=eval('('+localStorage.getItem('addressinfo') +')');
                angular.forEach(addressinfo,function(item,key){
                        if(id==key){
                            item['isdefault']=true;
                        }else{
                            item['isdefault']=false;
                        }
                })
                localStorage.removeItem('addressinfo');
                localStorage.setItem('addressinfo', JSON.stringify(addressinfo));
                return flag;
             }
            }
    }])
    .factory("expressService", ['$http', '$q', 'httpUrl',function ($http,$q,httpUrl) {
        return{
            getExpressList:function(address){
                var deferred = $q.defer();
                var method = 'GetDispatchWithPrice';
                $http.jsonp(httpUrl + '&method=' + method + '&address=' + address).
                    success(function (data) {
                        deferred.resolve(data);
                    })
                return deferred.promise;
            },
        }
    }])

    .factory("memberService", ['$http', '$q', 'httpUrl',function ($http,$q,httpUrl) {
        return{
            //获取charge支付对象
            getTeamlist:function(MemLoginID){
                var deferred = $q.defer();
                var method = 'GetTeamList';
                $http.jsonp(httpUrl + '&method=' + method + '&MemLoginID=' + MemLoginID)
                    .success(function (data) {
                        deferred.resolve(data);
                    }).
                    error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },
        }
    }])




















