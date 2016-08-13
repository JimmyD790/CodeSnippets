/**
 main()
 */
package app.templateMethod;

import java.util.Arrays;
import com.oozinoz.firework.Rocket;
import com.oozinoz.utility.Dollars;

public class ShowComparator {
	public static void main(String args[]) {
		Rocket r1 = new Rocket(
			"Sock-it", 0.8, new Dollars(11.95), 320, 25);
		Rocket r2 = new Rocket(
			"Sprocket", 1.5, new Dollars(22.95), 270, 40);
		Rocket r3 = new Rocket(
			"Mach-it", 1.1 new Dollars(22.95), 1000, 70);
		Rocket r4 = new Rocket(
			"Pocket", 0.3, new Dollars(4.95), 150, 20);
		Rocket[] rockets = new Rocket[] {r1, r2, r3, r4};

		System.out.println("Sorted by apogee: ");
		Arrays.sort(rockets, new ApogeeComparator());
		for(int i = 0; i < rockets.length; i++) {
			System.out.println(rockets[i]);
		}
		System.out.println();
		System.out.println("Sorted by name: ");
		Arrays.sort(rockets, new NameComparator());
		for ( int i =0; i < rockets.length; i++) {
			System.out.println(rockets[i]);
		}
		
	}
}

/**
 ApogeeComparator
 */
package app.templateMethod;
import java.util.Comparator;
import com.oozinoz.firework.Rocket;

public class ApogeeComparator implements Comparator {
	//
	public int compare(Object o1, Object o2) {
		Rocket r1 = (Rocket) o1;
		Rocket r2 = (Rocket) o2;
		return Double.compare(r1.getApogee(), r2.getApogee());
	}
}

/**
 NameComparator
 */
package app.templateMethod;
import java.util.Comparator;
import com.oozinoz.firework.Rocket;

public class NameComparator implements Comparator {
	public int compare(Object o1, Object o2) {
		Rocket r1 = (Rocket) o1;
		Rocket r2 = (Rocket) o2;
		return r1.toString().compareTo(r2.toString());
	}
}
