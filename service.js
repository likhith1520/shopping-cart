(function(){
    var empty="";
    angular.module("ng-app",[])
    .controller("availableitems",availableitems)
    .controller("boughtitems",boughtitems)
    .service("managedata",managedata)
    availableitems.$inject=['managedata'];
    boughtitems.$inject=['managedata'];
    function availableitems(managedata){
        var available=this;
       
        //list of all items
        available.listofitems=managedata.tobuyitems();
        available.buynow=function(index){
            
            managedata.boughtitem(index);
            
        }

    }
    function boughtitems(managedata){

        var done=this;
        done.itemslist=managedata.buylist();

        done.removecart=function(index){
            //for removing item in cart with index 
            managedata.delete(index);
        }
        done.totalamount=function(){ 
            //calculating total amount already in the cart
            var amount=0;
            for(var i=0;i<done.itemslist.length;i++)
            {
                amount=amount+done.itemslist[i].price*done.itemslist[i].quantity;
            }
            return amount;

        }
      
        
       

    }

    //service provider
    function managedata(){
        var service=this;
       
        var items=[
        {name:"Apple",quantity:6,m:"",price:20,index:0},
        {name:"Banana",quantity:15,m:"",price:12,index:1},
        {name:"Orange",quantity:7,m:"",price:20,index:2},
        {name:"Sapota",quantity:6,m:"",price:12,index:3},
        {name:"Carrots",quantity:6,m:"",price:14.50,index:4},
        {name:"Onions",quantity:5,m:"",price:25,index:5},
        {name:"Potato",quantity:7,m:"",price:17,index:6}
                          ];
        var itemscompleted=[];
        service.tobuyitems=function(){
            return items;
        }

        service.boughtitem=function(index){
            var x=items[index].name;
            var p=items[index].price;
            var ind=items[index].index;
            var count=0;
            for(var i=0;i<itemscompleted.length;i++){
                if(x==itemscompleted[i].name)
                {
                    if(items[index].quantity>0){
                        //if item in cart already and item is avaialble in the list
                           itemscompleted[i].quantity=itemscompleted[i].quantity+1;
                           items[index].quantity=items[index].quantity-1;
                           count=1;
                    }
                    else{
                         //if item is out of stock
                           count=1;
                           items[index].m="out of stock";
                          }

                } 
            }
            if(count==0){
                //if item is new that is not available in the list

            var my={name:x,quantity:1,price:p,index:ind};
            itemscompleted.push(my);
            items[index].quantity=items[index].quantity-1;
            }
        }
        service.buylist=function(){
            //returns cart items list 
            return itemscompleted;
        }
        service.delete=function(index){
          var names=itemscompleted[index].name;
          for(var i=0;i<items.length;i++)
          {
              if(names==items[i].name)
              {   items[i].m="";

                  if(itemscompleted[index].quantity==1){ //only one item is left it will delete it 
                  itemscompleted.splice(index,1);
                  items[i].quantity=items[i].quantity+1;
                  }
                  else{
         // more than one item in cart 
                  itemscompleted[index].quantity=itemscompleted[index].quantity-1;
                  items[i].quantity=items[i].quantity+1;
                  }
              }
          }
                     
        }
      

    }

})();