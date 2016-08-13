/**
 #Code list 1: 抽象模版类的示意性源代码
 */

abstract public class AbstractClass{
	// 模版方法的声明和实现
	public void TemplateMethod()
	{
		// 调用基本方法（由子类实现）
		doOperation1();
		// 调用基本方法（由子类实现）
		doOperation2();
		// 调用基本方法（已经实现）
		doOperation3();
	}
	// 基本方法的声明(由子类实现)
	protected abstract void doOperation1();
	// 基本方法的声明(由子类实现)
	protected abstract void doOperation2();
	// 基本方法(已经实现)
	private final void doOperation3(){
		// do something
	}


}

/**
 #Code list 2: 具体模版类的示意性源代码
 */
public class ConcreteClass extends AbstractClass{

	// 基本方法的实现
	public void doOperation1(){
		System.out.println("doOperation1();");
	}
	// 基本方法的实现
	public void doOperation2(){
		System.out.println("doOperation2();");
	}
}

/**
 #Code list 8: 需要重构的源代码
 */
public void bigMethod(){
	//...
	// code block 1

	//...
	// code block 2

	//...
	// code block 3

	//...
	// code block 4

	//...
	// code block 5
}
/**
 #Code list 9: 初步重构后的源代码
 */
public void bigMethod(){
	step1();
	step2();
	if(/*...*/){
		step3();
	} else if (/*...*/){
		step4();
	} else {
		step5()
	}
}
private void step1(){

}
private void step2(){

}
private void step3(){

}
private void step4(){

}
private void step5(){

}
/**
 #Code list 10: 重构的最后结果
 用多态性取代条件转移
 */
public abstract class AbstractClass{
	public void bigMethod(){
		step1();
		step2();
		newMethod();
	}
	protected abstract void step1();
	protected abstract void step2();
	protected abstract void newMethod();
}

public class ConcreteClass1 extends AbstractClass{
	public void newMethod(){
		//原来的代码块3
	}
}
public class ConcreteClass2 extends AbstractClass{
	public void newMethod(){
		//原来的代码块4
	}
}
public class ConcreteClass3 extends AbstractClass{
	public void newMethod(){
		//原来的代码块5
	}
}