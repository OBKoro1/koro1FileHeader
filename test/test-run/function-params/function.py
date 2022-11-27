def functionName (name = '默认值'):
    print('hi')

# 可写函数说明
'''
description: 
param {*} self
param {int} arg1
param {*} name22
param {array} vartuple
return {*}
'''
def printinfo( self, arg1: int, name = '默认值', *vartuple ):
   "打印任何传入的参数"
   print ("输出: ")
   print (arg1)
   print (vartuple) # 剩余参数 60 50
 
# 调用printinfo 函数
printinfo( 70, 60, 50 )


'''
description: 
param {*} arg1
param {object} vardict
return {*}
'''
def printinfo( arg1, **vardict ):
   "打印任何传入的参数"
   print ("输出: ")
   print (arg1)
   print (vardict) # {'a': 2, 'b': 3}
 
# 调用printinfo 函数
printinfo(1, a=2,b=3) 


class Kls(object):
    '''
    description: 
    param {*} self
    param {*} data
    return {*}
    '''    
    def __init__(self, data):
        self.data = data

    def printd(self):
        print(self.data)
