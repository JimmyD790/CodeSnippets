/**
 #Code list 8
 Creator
 */

public class Creator{
	/**
	 * 静态工厂方法
	 */
	public static Product factory(){
		return new ConcreteProduct(); //返回具体产品类
	}
}

public interface Product{

}

public class ConcreteProduct implements Product{
	public ConcreteProduct() {
		
	}
}