package com.javapatterns.proxy.reflect;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;
import java.lang.reflect.Method;
import java.util.Vector;
import java.util.List;

public class VectorProxy implements InvocationHandler {
	private Object proxyobj;

	// 构造
	public VectorProxy(Object obj){
		proxyobj = obj;
	}

	// 静态工厂方法
	public static Object factory(Object obj){
		Class cls = obj.getClass();
		return 
			cls.getClassLoader(),
			cls.getInterfaces(),
			new VectorProxy(obj);
	}

	// 调用某个方法
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable{
		System.out.println("before calling " + method);
		if ( args != null) {
			for ( int i = 0; i < args.length; i++){
				System.out.println(args[i] + "");
			}
		}
		Object o = method.invoke(proxyobj, args);
		System.out.println("after calling " + method);
		return o;
	}

	public static void main(String[] args){
		List v = null;
		v = (List) factory(new Vector(10));
		v.add("New");
		v.add("York");
	}

	/**
	Running result:
	before calling public abstract boolean		//#27
		java.util.List.add(java.lang.Object)	//#27
	New 										//#30
	after calling public abstract boolean		//#34
		java.util.List.add(java.lang.Object)	//#34
	before calling public abstract boolean
		java.util.List.add(java.lang.Object)
	York
	after calling public abstract boolean
		java.util.List.add(java.lang.Object)
	*/
}