/**
 当用户访问该公司时，都会建议客户购买烟火产品；Oozinoz公司使用两款商业推荐引擎，
 帮助选择正确的广告，然后推荐给客户。
 Customer类负责选择与使用其中一款引擎，来决定给客户推荐哪一种烟火
 如果注册了，则使用Re18；如果未注册则使用LikeMyStuff（根据用户最近的购买记录）
 */
public class Customer {

	public Firework getRecommended(){
		try {
			Properties p = new Properties();
			p.load(ClassLoader.getSystemResourceAsStream(
				"conifg/strategt.dat"));
			String promotedName = p.getProperty("promote");

			if (promotedName != null) {
				Firework f = Firework.lookup(promotedName);
				if (f != null) return f;
			}
		} catch (Exception ignored) {

		}

		if (isRegistered()) {
			return (Firework) Re18.advise(this); //传入Customer的实例（自己）
		}

		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.Year, -1);
		if (spendingSince(cal.getTime()) > 1000){
			return (Firework) LikeMyStuff.suggest(this);
		}

		return Firework.getRandom();
	}
}

/**
 转化为策略模式:
 1. 创建一个接口来定义策略操作
 2. 分别用不同的类实现该策略接口
 3. 重构代码，选择使用正确的策略类
 */
public interface Advisor{
	public Firework recommend(Customer c);
}

public class GroupAdvisor implements Advisor{
	//...
	public Firework recommend(Customer c) {
		return (Firework) Re18.advise(c);
	}
}

/*
 * 增加的getAdvisor方法
 */
public class Customer{
	//...
	private Advisor getAdvisor() {
		if (advisor == null) {
			if (advisor == null) {
				if (promotionAdvisor.hasItem()){
					advisor = promotionAdvisor;
				} else if (isRegistered()) {
					advisor = groupAdvisor;
				} else if (isBigSpender()) {
					advisor = itemAdvisor;
				} else {
					advisor = randomAdvisor;
				}
			}
		}
		return advisor;
		}
	};

	// 重构的getRecommend方法
	public Firework getRecommended() {
		return getAdvisor().recommend(this);
	}
}
