
package dashboarddeliverysystem;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.swing.table.DefaultTableModel;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.data.category.DefaultCategoryDataset;
import java.sql.DriverManager;
import javax.swing.DefaultComboBoxModel;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.renderer.category.BarRenderer;

public class Form3Menu extends javax.swing.JPanel {

    public Form3Menu() {
        initComponents();
      


        
        
        
        
        
       JScrollPane scroll = new JScrollPane(BarPanel);
scroll.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
scroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_NEVER);


        
        
        
    cmbTblReport.setModel(new DefaultComboBoxModel<>(new String[] {
    "All Deliveries",
    "Today",
    "This Month",
    "This Year",
    "Pick a Date",
    "Pick a Month"
}));

    
      cmbTblReport.addActionListener(e -> applyFilter());
        cmbTblReport.setSelectedIndex(0);
        applyFilter(); 

        
        
        
    }
    
    
    
    
Connection con;
PreparedStatement pst;
ResultSet rs;
    
    
    
    
    public void connect() {
    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        con = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/DashboardSystem?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
    "skyGarden",
    "@Asterisk2444"
);


        System.out.println("Connected to DashboardSystem!");
    } catch (Exception ex) {
        JOptionPane.showMessageDialog(this, "Connection Error: " + ex.getMessage());
        ex.printStackTrace();
    }
}
    
    
    
    
    
    
    
    
    
    
    
    
 
    
    
    
    public void updateBarGraph(String filter, String date, String month, String year) {
    DefaultCategoryDataset dataset = new DefaultCategoryDataset();

    String sql = "";

    switch (filter) {
        case "All Deliveries":
            sql = "SELECT delivery_date, COUNT(*) AS total FROM deliveries "
                + "GROUP BY delivery_date ORDER BY delivery_date";
            break;

        case "Today":
            sql = "SELECT delivery_date, COUNT(*) AS total FROM deliveries "
                + "WHERE delivery_date = CURDATE() GROUP BY delivery_date";
            break;

        case "This Month":
            sql = "SELECT delivery_date, COUNT(*) AS total FROM deliveries "
                + "WHERE MONTH(delivery_date)=MONTH(CURDATE()) AND YEAR(delivery_date)=YEAR(CURDATE()) "
                + "GROUP BY delivery_date ORDER BY delivery_date";
            break;

      
        case "This Year":
            sql = "SELECT MONTH(delivery_date) AS month, COUNT(*) AS total "
                + "FROM deliveries "
                + "WHERE YEAR(delivery_date)=YEAR(CURDATE()) "
                + "GROUP BY MONTH(delivery_date) ORDER BY MONTH(delivery_date)";
            break;

        case "Pick a Date":
            sql = "SELECT delivery_date, COUNT(*) AS total FROM deliveries "
                + "WHERE delivery_date = ? GROUP BY delivery_date";
            break;

        case "Pick a Month":
            sql = "SELECT delivery_date, COUNT(*) AS total FROM deliveries "
                + "WHERE MONTH(delivery_date)=? AND YEAR(delivery_date)=? GROUP BY delivery_date";
            break;
    }

    try (Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/dashboardsystem", "skyGarden", "@Asterisk2444");
         PreparedStatement pst = conn.prepareStatement(sql)) {

        if (filter.equals("Pick a Date")) {
            pst.setString(1, date);
        }

        if (filter.equals("Pick a Month")) {
            pst.setInt(1, Integer.parseInt(month));
            pst.setInt(2, Integer.parseInt(year));
        }

        ResultSet rs = pst.executeQuery();

        while (rs.next()) {

            if (filter.equals("This Year")) {
            
                String monthName = new java.text.DateFormatSymbols()
                                      .getMonths()[rs.getInt("month") - 1];

                dataset.addValue(
                    rs.getInt("total"),
                    "Deliveries",
                    monthName 
                );

            } else {
                dataset.addValue(
                    rs.getInt("total"),
                    "Deliveries",
                    rs.getString("delivery_date")
                );
            }
        }

    } catch (Exception e) {
        e.printStackTrace();
    }

    JFreeChart chart = ChartFactory.createBarChart(
            "Delivery Count",
            (filter.equals("This Year") ? "Month" : "Date"),
            "Total Deliveries",
            dataset
    );


    CategoryPlot plot = chart.getCategoryPlot();
    BarRenderer renderer = (BarRenderer) plot.getRenderer();
    renderer.setMaximumBarWidth(0.10);

    ChartPanel panel = new ChartPanel(chart);
    panel.setPreferredSize(new Dimension(900, 300));

    BarPanel.removeAll();
    BarPanel.setLayout(new BorderLayout());
    BarPanel.add(panel, BorderLayout.CENTER);
    BarPanel.revalidate();
    BarPanel.repaint();
}


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    private void applyFilter() {
    String filter = cmbTblReport.getSelectedItem().toString();

    String specificDate = null;
    String month = null;
    String year = null;

    if (filter.equals("Pick a Date")) {
        specificDate = JOptionPane.showInputDialog(this, "Enter date (YYYY-MM-DD):");
        if (specificDate == null || specificDate.trim().isEmpty()) {
            return;
        }
    }


    if (filter.equals("Pick a Month")) {

  
        String[] months = {
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        };

        JComboBox<String> monthBox = new JComboBox<>(months);


        JComboBox<String> yearBox = new JComboBox<>();
        int currentYear = java.time.LocalDate.now().getYear();
        for (int i = 0; i < 10; i++) {
            yearBox.addItem(String.valueOf(currentYear - i));
        }


        JPanel panel = new JPanel();
        panel.add(new JLabel("Month:"));
        panel.add(monthBox);
        panel.add(new JLabel("Year:"));
        panel.add(yearBox);

        int result = JOptionPane.showConfirmDialog(
                this,
                panel,
                "Select Month & Year",
                JOptionPane.OK_CANCEL_OPTION
        );

        if (result != JOptionPane.OK_OPTION) {
            return; 
        }


        month = String.valueOf(monthBox.getSelectedIndex() + 1);
        year = yearBox.getSelectedItem().toString();
    }

 
    loadReportTable(filter, specificDate, month, year);
    updateBarGraph(filter, specificDate, month, year);
}


    
    
    
    
    
    
    
    
    
    
    public void loadReportTable(String filter, String date, String month, String year) {
    DefaultTableModel model = (DefaultTableModel) tblReport.getModel();
    model.setRowCount(0);

    String sql = "";

    switch (filter) {
        case "All Deliveries":
            sql = "SELECT * FROM deliveries ORDER BY delivery_date DESC";
            break;

        case "Today":
            sql = "SELECT * FROM deliveries WHERE delivery_date = CURDATE() ORDER BY delivery_date DESC";
            break;

        case "This Month":
            sql = "SELECT * FROM deliveries WHERE MONTH(delivery_date)=MONTH(CURDATE()) "
                + "AND YEAR(delivery_date)=YEAR(CURDATE()) ORDER BY delivery_date DESC";
            break;

        case "This Year":
            sql = "SELECT * FROM deliveries WHERE YEAR(delivery_date)=YEAR(CURDATE()) ORDER BY delivery_date DESC";
            break;

        case "Pick a Date":
            sql = "SELECT * FROM deliveries WHERE delivery_date = ? ORDER BY delivery_date DESC";
            break;

        case "Pick a Month":
            sql = "SELECT * FROM deliveries WHERE MONTH(delivery_date)=? AND YEAR(delivery_date)=? ORDER BY delivery_date DESC";
            break;
    }

    try (Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/dashboardsystem", "skyGarden", "@Asterisk2444");
         PreparedStatement pst = conn.prepareStatement(sql)) {

   
        if (filter.equals("Pick a Date")) {
            pst.setString(1, date);
        }

        if (filter.equals("Pick a Month")) {
            pst.setInt(1, Integer.parseInt(month)); 
            pst.setInt(2, Integer.parseInt(year));
        }

        ResultSet rs = pst.executeQuery();

        while (rs.next()) {
            model.addRow(new Object[]{
                rs.getString("delivery_code"),
                rs.getString("customer_name"),
                rs.getString("address"),
                rs.getString("delivery_date"),
                rs.getString("status")
            });
        }

    } catch (Exception e) {
        e.printStackTrace();
    }
}

    
    
  
    
    
    
    
    

    
    
    
    
    
    
    
    
    

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel2 = new javax.swing.JPanel();
        BarPanel = new javax.swing.JPanel();
        cmbTblReport = new javax.swing.JComboBox<>();
        jScrollPane1 = new javax.swing.JScrollPane();
        tblReport = new javax.swing.JTable();

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 100, Short.MAX_VALUE)
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 100, Short.MAX_VALUE)
        );

        setBackground(new java.awt.Color(255, 255, 255));

        javax.swing.GroupLayout BarPanelLayout = new javax.swing.GroupLayout(BarPanel);
        BarPanel.setLayout(BarPanelLayout);
        BarPanelLayout.setHorizontalGroup(
            BarPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 0, Short.MAX_VALUE)
        );
        BarPanelLayout.setVerticalGroup(
            BarPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 206, Short.MAX_VALUE)
        );

        cmbTblReport.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Item 1", "Item 2", "Item 3", "Item 4" }));

        tblReport.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null}
            },
            new String [] {
                "Delivery ID", "Customer", "Address", "Date", "Status"
            }
        ));
        tblReport.setShowGrid(true);
        jScrollPane1.setViewportView(tblReport);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(cmbTblReport, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(61, 61, 61))
            .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 1293, Short.MAX_VALUE)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(BarPanel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(20, 20, 20)
                .addComponent(BarPanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(12, 12, 12)
                .addComponent(cmbTblReport, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 259, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(220, Short.MAX_VALUE))
        );
    }// </editor-fold>//GEN-END:initComponents


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JPanel BarPanel;
    private javax.swing.JComboBox<String> cmbTblReport;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTable tblReport;
    // End of variables declaration//GEN-END:variables
}
