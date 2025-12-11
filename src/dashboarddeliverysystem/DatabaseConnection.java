package dashboarddeliverysystem;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    private static Connection con;

    private static final String URL = "jdbc:mysql://localhost:3306/DashboardSystem";
    private static final String USER = "skyGarden";
    private static final String PASS = "your_password_here"; 

    public static Connection getConnection() {
        if (con == null) {
            try {
                con = DriverManager.getConnection(URL, USER, PASS);
                System.out.println("Connected to MySQL!");
            } catch (SQLException e) {
                System.out.println("Connection to MySQL failed!");
                e.printStackTrace();
            }
        }
        return con;
    }
}
