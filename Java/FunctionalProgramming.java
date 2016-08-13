/**
 * link : http://www.ibm.com/developerworks/cn/java/j-fp/index.html#resources
 */

/**
 * class: SETLItem
 */
package com.infosys.setl.fp; 
public class SETLItem 
{ 
  private String name; 
  private String code; 
  private int price; 
  private String category; 
		
  public int getPrice() 
  { 
	 return price;:while () {
	 	
	 }
  } 
	
  public void setPrice(int inPrice) 
  { 
	 price = inPrice; 
  } 
	
  public String getName() 
  { 
	 return name; 
  } 
	
  public void setName(String inName) 
  { 
	 name = inName; 
  } 
  public String getCode() 
  { 
	 return code; 
  } 
	
  public void setCode(String inCode) 
  { 
	 code = inCode; 
  } 
	
  public String getCategory() 
  { 
	 return category; 
  } 
	
  public void setCategory(String inCategory) 
  { 
	 category = inCategory; 
  } 
 }

 /**
  * PriceComparator
  */ 
 package com.infosys.setl.fp; 
 import java.util.Comparator; 
 public class PriceComparator implements Comparator 
 { 
  public int compare (Object o1, Object o2) 
  { 
	 return (((SETLItem)o1).getPrice()-((SETLItem)o2).getPrice()); 
  } 	
 }

 /**
  * Test
  */ 
 package com.infosys.setl.fp; 
 import org.apache.commons.functor.*; 
 import org.apache.commons.functor.core.comparator.*; 
 import java.util.*; 
 public class TestA 
 { 
  public static void main(String[] args) 
  { 
	 try 
	 { 
	  Comparator pc = new PriceComparator(); 
	  BinaryPredicate bp = new IsGreaterThanOrEqual(pc); 
	  SETLItem item1 = new SETLItem(); 
	  item1.setPrice(100); 
	  SETLItem item2 = new SETLItem(); 
	  item2.setPrice(99); 
	  if (bp.test(item1, item2)) 
	    System.out.println("Item1 costs more than Item2!"); 
	  else 
	    System.out.println("Item2 costs more than Item1!"); 
	  SETLItem item3 = new SETLItem(); 
	  item3.setPrice(101); 
	  if (bp.test(item1, item3)) 
	    System.out.println("Item1 costs more than Item3!"); 
	  else 
  	    System.out.println("Item3 costs more than Item1!"); 
	 } 
	 catch (Exception e) 
	 { 
	  e.printStackTrace(); 
	 } 
  } 
 }

 /*=============================================================*/
 /**
  * Original
  */
BigDecimal totalOfDiscountedPrices = BigDecimal.ZERO;
for(BigDecimal price : prices) {
if(price.compareTo(BigDecimal.valueOf(20)) > 0)
	totalOfDiscountedPrices =
		totalOfDiscountedPrices.add(price.multiply(BigDecimal.valueOf(0.9)));
}
System.out.println("Total of discounted prices: " + totalOfDiscountedPrices);
/**
 * Functional
 */
final BigDecimal totalOfDiscountedPrices =  
prices.stream()  
		.filter(price -> price.compareTo(BigDecimal.valueOf(20)) > 0)  
		.map(price -> price.multiply(BigDecimal.valueOf(0.9)))  
		.reduce(BigDecimal.ZERO, BigDecimal::add);  
System.out.println("Total of discounted prices: " + totalOfDiscountedPrices);  
