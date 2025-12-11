
package dashboarddeliverysystem;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DecimalFormat;
import java.time.format.DateTimeFormatter;
import javax.swing.JOptionPane;
import javax.swing.SwingConstants;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.labels.StandardPieSectionLabelGenerator;
import org.jfree.chart.plot.PiePlot;
import org.jfree.data.general.DefaultPieDataset;


public class Form1Menu extends javax.swing.JPanel {
public static Form1Menu instance;



    public Form1Menu() {
        initComponents();
        connect();
        refreshDashboard();
         instance = this;
         
       updatePieChart(); 
         
          loadLogsTable();
         
         
         
         
         
         
         
         // Row height
jTableLogs.setRowHeight(28);

// Remove grid lines
jTableLogs.setShowGrid(false);
jTableLogs.setIntercellSpacing(new Dimension(0, 0));

// Make it non-editable
jTableLogs.setDefaultEditor(Object.class, null);

// Center-align the Value column
DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
centerRenderer.setHorizontalAlignment(SwingConstants.CENTER);
jTableLogs.getColumnModel().getColumn(1).setCellRenderer(centerRenderer);

// Bold for the left column
DefaultTableCellRenderer boldRenderer = new DefaultTableCellRenderer();
boldRenderer.setFont(new Font("Segoe UI", Font.BOLD, 14));
jTableLogs.getColumnModel().getColumn(0).setCellRenderer(boldRenderer);

// Table colors
jTableLogs.setBackground(Color.WHITE);
jTableLogs.setForeground(Color.DARK_GRAY);

jTableLogs.setSelectionBackground(new Color(225, 225, 225));
jTableLogs.setSelectionForeground(Color.BLACK);

// Disable column reordering
jTableLogs.getTableHeader().setReorderingAllowed(false);

// Make header look clean
jTableLogs.getTableHeader().setOpaque(false);
jTableLogs.getTableHeader().setBackground(new Color(240, 240, 240));
jTableLogs.getTableHeader().setFont(new Font("Segoe UI", Font.BOLD, 14));

         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         

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
























public void refreshDashboard() {
    if (con == null) {
       
        System.out.println("refreshDashboard: no DB connection available.");
        return;
    }

    try {
     
        String sqlTotal = "SELECT COUNT(*) FROM deliveries";
        try (PreparedStatement pst1 = con.prepareStatement(sqlTotal);
             ResultSet rs1 = pst1.executeQuery()) {
            if (rs1.next()) {
                lblTotal.setText(String.valueOf(rs1.getInt(1)));
            } else {
                lblTotal.setText("0");
            }
        }

      
        String sqlCompleted = "SELECT COUNT(*) FROM deliveries WHERE TRIM(LOWER(status)) = 'complete' OR TRIM(LOWER(status)) = 'completed'";
        try (PreparedStatement pst2 = con.prepareStatement(sqlCompleted);
             ResultSet rs2 = pst2.executeQuery()) {
            if (rs2.next()) {
                lblCompleted.setText(String.valueOf(rs2.getInt(1)));
            } else {
                lblCompleted.setText("0");
            }
        }

      
       String sqlPending =
    "SELECT COUNT(*) FROM deliveries " +
    "WHERE LOWER(status) LIKE 'pending%'";



      try (PreparedStatement pst3 = con.prepareStatement(sqlPending);
     ResultSet rs3 = pst3.executeQuery()) {

    if (rs3.next()) {
        lblPending.setText(String.valueOf(rs3.getInt(1)));
    } else {
        lblPending.setText("0");
    }
}

        
        
        
        
        
        String debugSQL = "SELECT DISTINCT status FROM deliveries";
PreparedStatement pst = con.prepareStatement(debugSQL);
ResultSet rs = pst.executeQuery();

while (rs.next()) {
    System.out.println("[" + rs.getString(1) + "]");
}

        
   


        String sqlFailed = "SELECT COUNT(*) FROM deliveries WHERE TRIM(LOWER(status)) = 'failed'";
try (PreparedStatement pst5 = con.prepareStatement(sqlFailed);
     ResultSet rs5 = pst5.executeQuery()) {

    if (rs5.next()) {
        lblFailed.setText(String.valueOf(rs5.getInt(1)));
    } else {
        lblFailed.setText("0");
    }
}







    } catch (Exception e) {
        e.printStackTrace();
        System.out.println("Dashboard refresh error: " + e.getMessage());
    }
}












public void updatePieChart() {

    int pending = 0;
    int completed = 0;
    int failed = 0;


 String sql =
    "SELECT REPLACE(LOWER(status), ' ', '') AS status_clean, COUNT(*) AS total " +
    "FROM deliveries GROUP BY status_clean";


    try (Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/DashboardSystem?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
            "skyGarden",
            "@Asterisk2444"
        );

        PreparedStatement pst = conn.prepareStatement(sql);
        ResultSet rs = pst.executeQuery()) {

        while (rs.next()) {
           String s = rs.getString("status_clean").trim();

           System.out.println("Updating Pending Label: " + lblPending);

            int count = rs.getInt("total");
System.out.println("RAW STATUS → [" + rs.getString("status_clean") + "]");

          switch (s) {
    case "pending":
        pending = count;
        break;
    case "completed":
    case "complete":
        completed = count;
        break;
    case "failed":
        failed = count;
        break;
        
        
}

        }

    } catch (Exception e) {
        e.printStackTrace();
    }

    // Prepare dataset
    DefaultPieDataset dataset = new DefaultPieDataset();
    dataset.setValue("Pending", pending);
    dataset.setValue("Completed", completed);
    dataset.setValue("Failed", failed);

    // Create Chart
    JFreeChart chart = ChartFactory.createPieChart(
            "Delivery Status Overview",
            dataset,
            true, true, false
    );

    // Pie settings
    PiePlot plot = (PiePlot) chart.getPlot();

    // Colors for sections
    plot.setSectionPaint("Pending", new Color(255, 235, 156));   // yellow
    plot.setSectionPaint("Completed", new Color(198, 239, 206)); // green
    plot.setSectionPaint("Failed", new Color(255, 199, 206));    // red

    plot.setSimpleLabels(true);
    plot.setShadowPaint(null);

    // VALUE + PERCENTAGE (ROUNDED)
    plot.setLabelGenerator(new StandardPieSectionLabelGenerator(
            "{0}: {1} ({2})",          // Label format
            new DecimalFormat("0"),     // Rounded whole values
            new DecimalFormat("0%")     // Rounded percentages
    ));

    // Aesthetic settings
    plot.setBackgroundPaint(Color.WHITE);
    plot.setOutlineVisible(false);
    plot.setLabelBackgroundPaint(Color.WHITE);
    plot.setLabelOutlinePaint(Color.GRAY);

    // Add to panel
    ChartPanel panel = new ChartPanel(chart);
    panel.setPreferredSize(new Dimension(400, 300));

    PiePanel.removeAll();
    PiePanel.setLayout(new BorderLayout());
    PiePanel.add(panel, BorderLayout.CENTER);
    PiePanel.revalidate();
    PiePanel.repaint();
}










public void loadLogsTable() {

    DefaultTableModel model = (DefaultTableModel) jTableLogs.getModel();
    model.setRowCount(0);

    String sql = "SELECT timestamp, description FROM logs ORDER BY timestamp DESC";

    try (Connection con = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/DashboardSystem?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
            "skyGarden",
            "@Asterisk2444"
        );
         PreparedStatement pst = con.prepareStatement(sql);
         ResultSet rs = pst.executeQuery()) {

        while (rs.next()) {

            // Format timestamp
            String time = rs.getTimestamp("timestamp").toLocalDateTime()
                            .format(DateTimeFormatter.ofPattern("hh:mm a"));

            String action = rs.getString("description");

            model.addRow(new Object[]{ time, action });
        }

    } catch (Exception e) {
        e.printStackTrace();
    }
}














  

    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();
        jTableLogs = new javax.swing.JTable();
        jPanel1 = new javax.swing.JPanel();
        jLabel2 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        lblPending = new javax.swing.JLabel();
        jPanel2 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        lblTotal = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        jPanel4 = new javax.swing.JPanel();
        lblCompleted = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jLabel10 = new javax.swing.JLabel();
        jPanel5 = new javax.swing.JPanel();
        lblFailed = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        jLabel9 = new javax.swing.JLabel();
        PiePanel = new javax.swing.JPanel();

        setBackground(new java.awt.Color(255, 255, 255));
        setPreferredSize(new java.awt.Dimension(959, 570));

        jTableLogs.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED));
        jTableLogs.setFont(new java.awt.Font("Segoe UI Light", 1, 14)); // NOI18N
        jTableLogs.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null},
                {null, null},
                {null, null},
                {null, null},
                {null, null},
                {null, null},
                {null, null},
                {null, null},
                {null, null},
                {null, null}
            },
            new String [] {
                "Time", "Action"
            }
        ));
        jTableLogs.setShowGrid(true);
        jTableLogs.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                jTableLogsMouseClicked(evt);
            }
        });
        jScrollPane1.setViewportView(jTableLogs);

        jPanel1.setPreferredSize(new java.awt.Dimension(257, 103));

        jLabel2.setBackground(new java.awt.Color(255, 255, 255));
        jLabel2.setFont(new java.awt.Font("Segoe UI Semilight", 0, 18)); // NOI18N
        jLabel2.setForeground(new java.awt.Color(0, 0, 0));
        jLabel2.setText("Pending Deliveries");

        jLabel5.setBackground(new java.awt.Color(255, 255, 255));
        jLabel5.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        jLabel5.setForeground(new java.awt.Color(0, 0, 0));
        jLabel5.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-pending-50.png"))); // NOI18N

        lblPending.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        lblPending.setForeground(new java.awt.Color(0, 0, 0));
        lblPending.setText("0");

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(jLabel5)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(lblPending))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(24, 24, 24)
                        .addComponent(jLabel2)))
                .addContainerGap(87, Short.MAX_VALUE))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addContainerGap(16, Short.MAX_VALUE)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel5)
                    .addComponent(lblPending))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jLabel2))
        );

        jLabel1.setFont(new java.awt.Font("Segoe UI Semilight", 0, 18)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(0, 0, 0));
        jLabel1.setText("Total Deliveries");

        lblTotal.setBackground(new java.awt.Color(0, 0, 0));
        lblTotal.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        lblTotal.setForeground(new java.awt.Color(0, 0, 0));
        lblTotal.setText("0");

        jLabel7.setBackground(new java.awt.Color(255, 255, 255));
        jLabel7.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        jLabel7.setForeground(new java.awt.Color(0, 0, 0));
        jLabel7.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-total-sales-50.png"))); // NOI18N

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(jLabel7)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(lblTotal))
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGap(30, 30, 30)
                        .addComponent(jLabel1)))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                .addContainerGap(16, Short.MAX_VALUE)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel7)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGap(6, 6, 6)
                        .addComponent(lblTotal)))
                .addGap(13, 13, 13)
                .addComponent(jLabel1))
        );

        lblCompleted.setBackground(new java.awt.Color(0, 0, 0));
        lblCompleted.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        lblCompleted.setForeground(new java.awt.Color(0, 0, 0));
        lblCompleted.setText("0");

        jLabel3.setFont(new java.awt.Font("Segoe UI Semilight", 0, 18)); // NOI18N
        jLabel3.setForeground(new java.awt.Color(0, 0, 0));
        jLabel3.setText("Completed Deliveries");

        jLabel10.setBackground(new java.awt.Color(255, 255, 255));
        jLabel10.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        jLabel10.setForeground(new java.awt.Color(0, 0, 0));
        jLabel10.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-task-completed-50.png"))); // NOI18N

        javax.swing.GroupLayout jPanel4Layout = new javax.swing.GroupLayout(jPanel4);
        jPanel4.setLayout(jPanel4Layout);
        jPanel4Layout.setHorizontalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(jLabel10)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(lblCompleted))
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addGap(26, 26, 26)
                        .addComponent(jLabel3)))
                .addContainerGap(60, Short.MAX_VALUE))
        );
        jPanel4Layout.setVerticalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel10)
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addGap(8, 8, 8)
                        .addComponent(lblCompleted)))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jLabel3)
                .addContainerGap())
        );

        lblFailed.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        lblFailed.setForeground(new java.awt.Color(0, 0, 0));
        lblFailed.setText("0");

        jLabel6.setFont(new java.awt.Font("Segoe UI Semilight", 0, 18)); // NOI18N
        jLabel6.setForeground(new java.awt.Color(0, 0, 0));
        jLabel6.setText("Failed Deliveries");

        jLabel9.setBackground(new java.awt.Color(255, 255, 255));
        jLabel9.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        jLabel9.setForeground(new java.awt.Color(0, 0, 0));
        jLabel9.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-failed-50.png"))); // NOI18N

        javax.swing.GroupLayout jPanel5Layout = new javax.swing.GroupLayout(jPanel5);
        jPanel5.setLayout(jPanel5Layout);
        jPanel5Layout.setHorizontalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel5Layout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(jLabel9)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(lblFailed))
                    .addGroup(jPanel5Layout.createSequentialGroup()
                        .addGap(29, 29, 29)
                        .addComponent(jLabel6)))
                .addContainerGap(98, Short.MAX_VALUE))
        );
        jPanel5Layout.setVerticalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addContainerGap(16, Short.MAX_VALUE)
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel9)
                    .addComponent(lblFailed))
                .addGap(12, 12, 12)
                .addComponent(jLabel6))
        );

        javax.swing.GroupLayout PiePanelLayout = new javax.swing.GroupLayout(PiePanel);
        PiePanel.setLayout(PiePanelLayout);
        PiePanelLayout.setHorizontalGroup(
            PiePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 484, Short.MAX_VALUE)
        );
        PiePanelLayout.setVerticalGroup(
            PiePanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 270, Short.MAX_VALUE)
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane1)
                .addContainerGap())
            .addGroup(layout.createSequentialGroup()
                .addGap(31, 31, 31)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addGap(33, 33, 33)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jPanel5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 122, Short.MAX_VALUE)
                .addComponent(PiePanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(106, 106, 106))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(55, 55, 55)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addComponent(jPanel5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jPanel4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                    .addComponent(PiePanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 39, Short.MAX_VALUE)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 185, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(21, 21, 21))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void jTableLogsMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_jTableLogsMouseClicked
        // TODO add your handling code here:
    }//GEN-LAST:event_jTableLogsMouseClicked


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JPanel PiePanel;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel4;
    private javax.swing.JPanel jPanel5;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTable jTableLogs;
    private javax.swing.JLabel lblCompleted;
    private javax.swing.JLabel lblFailed;
    private javax.swing.JLabel lblPending;
    private javax.swing.JLabel lblTotal;
    // End of variables declaration//GEN-END:variables
}
